// app/api/favorite-teams/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { apiClient } from "@/lib/ApiClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ message: "Missing user_id parameter." }, { status: 400 });
  }

  try {
    const { data: favorites, error } = await supabase
      .from("favorite_teams")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ message: "Error fetching favorites", error }, { status: 500 });
    }

    if (!favorites || favorites.length === 0) {
      return NextResponse.json({ teams: [] });
    }

    const detailedTeams = await Promise.all(
      favorites.map(async (fav) => {
        try {
          const res = await apiClient.get(`/teams/${fav.team_id}`);
          return {
            ...fav,
            ...res.data,
            id: fav.team_id,
          };
        } catch (err) {
          console.error(`Failed to fetch team ${fav.team_id}`, err);
          return { ...fav, id: fav.team_id };
        }
      })
    );

    return NextResponse.json({ teams: detailedTeams });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ message: "Failed to fetch favorite teams", error: String(err) }, { status: 500 });
  }
}
