"use client";

import { PlayerMatches } from "@/Components/player/PlayerMatches";
import { PlayerProfile } from "@/Components/player/PlayerProfile";
import usePlayer from "@/hooks/usePlayer";
import usePlayerMatches from "@/hooks/usePlayerMatches";
import PlayerProfileSkeleton from "@/Components/player/PlayerProfileSkeleton";
import PlayerMatchesSkeleton from "@/Components/player/PlayerMatchesSkeleton";
import React, { use } from "react";

export default function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: player, isLoading, error } = usePlayer(id);
  const {
    data: matches,
    isLoading: loadingMatches,
    error: Ematches,
  } = usePlayerMatches(id);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <PlayerProfileSkeleton />
        ) : error ? (
          <div className="text-red-500 font-semibold">
            Failed to load player data.
          </div>
        ) : player ? (
          <PlayerProfile player={player} />
        ) : (
          <div className="text-gray-500">No player data available.</div>
        )}

        <div className="mt-8">
          {loadingMatches ? (
            <PlayerMatchesSkeleton />
          ) : Ematches ? (
            <div className="text-red-500 font-semibold">
              Failed to load matches.
            </div>
          ) : matches?.matches && matches.matches.length > 0 ? (
            <PlayerMatches matches={matches.matches} />
          ) : (
            <div className="text-gray-500">No match data available.</div>
          )}
        </div>
      </div>
    </div>
  );
}
