import { db } from "@/db";
import { teams } from "@/db/schema";
import { NextResponse } from "next/server";
import { apiClient } from "@/lib/ApiClient";

// Utility: normalize team name by removing common suffixes like "CF", "FC", etc.
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\b(cf|fc|ac|sc|afc|c\.f\.|f\.c\.|club de fútbol|club)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Calculate string similarity (Levenshtein distance ratio)
function stringSimilarity(str1: string, str2: string): number {
  // Calculate Levenshtein distance
  function levenshteinDistance(a: string, b: string): number {
    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
    
    for (let i = 0; i <= a.length; i++) {
      matrix[0][i] = i;
    }
    
    for (let j = 0; j <= b.length; j++) {
      matrix[j][0] = j;
    }
    
    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1, // deletion
          matrix[j - 1][i] + 1, // insertion
          matrix[j - 1][i - 1] + cost // substitution
        );
      }
    }
    
    return matrix[b.length][a.length];
  }
  
  // Convert distance to similarity ratio (higher is better)
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  return maxLength ? (maxLength - distance) / maxLength : 1;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");
  const searchRaw = (searchParams.get("search") || "").trim();
  const search = normalizeName(searchRaw);
  
  try {
    console.log(`Fetching teams - limit: ${limit}, offset: ${offset}, search: "${searchRaw}"`);
    
    // ✅ If no search term: call external API for paginated list
    if (!search) {
      try {
        const res = await apiClient.get('/teams', {
          params: { limit, offset },
        });
        return NextResponse.json({
          teams: res.data?.teams || [],
        });
      } catch (err) {
        console.error("Failed to fetch teams from external API:", err);
        return NextResponse.json({ teams: [] });
      }
    }
    
    // 🔍 If there's a search term: normalize and search locally
    const allTeams = await db.select().from(teams);
    const normalizedTeams = allTeams.map(team => ({
      ...team,
      normalized: normalizeName(team.name),
    }));
    
    // 🎯 Try exact normalized name match
    const exactMatch = normalizedTeams.find(team => team.normalized === search);
    if (exactMatch) {
      try {
        console.log(`Exact match found for team: ${exactMatch.name} (ID: ${exactMatch.id})`);
        const res = await apiClient.get(`/teams/${exactMatch.id}`);
        return NextResponse.json({
          teams: [
            {
              ...exactMatch,
              ...res.data,
              id: exactMatch.id,
            },
          ],
        });
      } catch (err) {
        console.error(`API fetch failed for team ${exactMatch.id}`, err);
        return NextResponse.json({ teams: [exactMatch] });
      }
    }
    
    // 🔄 Find closest match based on fuzzy search
    if (search.length >= 3) {
      // Calculate similarity scores for all teams
      const rankedTeams = normalizedTeams.map(team => ({
        ...team,
        // Check for substring match first (higher priority)
        hasSubstring: team.normalized.includes(search) || search.includes(team.normalized),
        // Calculate similarity score as backup
        similarity: stringSimilarity(team.normalized, search)
      }))
      // Sort by substring match first, then by similarity score
      .sort((a, b) => {
        if (a.hasSubstring && !b.hasSubstring) return -1;
        if (!a.hasSubstring && b.hasSubstring) return 1;
        return b.similarity - a.similarity;
      });
      
      // Get the best match (first team after sorting)
      const bestMatch = rankedTeams[0];
      
      // Only consider it a match if it has a decent similarity
      if (bestMatch && (bestMatch.hasSubstring || bestMatch.similarity > 0.4)) {
        try {
          console.log(`Best match found for "${search}": ${bestMatch.name} (ID: ${bestMatch.id})`);
          const res = await apiClient.get(`/teams/${bestMatch.id}`);
          return NextResponse.json({
            teams: [
              {
                ...bestMatch,
                ...res.data,
                id: bestMatch.id,
              },
            ],
          });
        } catch (err) {
          console.error(`API fetch failed for team ${bestMatch.id}`, err);
          return NextResponse.json({ teams: [bestMatch] });
        }
      }
    }
    
    // No good match found
    return NextResponse.json({
      message: "No match found.",
      teams: [],
    });
    
  } catch (error) {
    console.error("Error in teams API:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch teams",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}