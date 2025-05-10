// lib/FavoriteTeam.ts

import { supabase } from "@/lib/supabase";

export async function addFavoriteTeam(userId: string, teamId: string) {
  // Fetch current favorite count
  const { count, error: countError } = await supabase
    .from("favorite_teams")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (countError) {
    console.error("Count error:", countError);
    return { success: false, message: "Could not verify favorite limit." };
  }

  if (count !== null && count >= 3) {
    return { success: false, message: "You can only have up to 3 favorite teams." };
  }

  // Check if team is already favorited
  const { data: existing, error: fetchError } = await supabase
    .from("favorite_teams")
    .select("id")
    .eq("user_id", userId)
    .eq("team_id", teamId)
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    console.error("Fetch error:", fetchError);
    return { success: false, message: "Error checking favorites." };
  }

  if (existing) {
    return { success: false, message: "Team already added to favorites." };
  }

  // Insert favorite
  const { error: insertError } = await supabase.from("favorite_teams").insert({
    user_id: userId,
    team_id: teamId,
  });

  if (insertError) {
    console.error("Insert error:", insertError);
    return { success: false, message: "Failed to add to favorites." };
  }

  return { success: true, message: "Added to favorites!" };
}


export async function removeFavoriteTeam(userId: string, teamId: string) {
  const { error } = await supabase
    .from("favorite_teams")
    .delete()
    .eq("user_id", userId)
    .eq("team_id", teamId);

  if (error) {
    console.error("Remove error:", error);
    return { success: false, message: "Failed to remove favorite." };
  }

  return { success: true, message: "Removed from favorites." };
}
