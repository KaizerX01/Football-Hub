import React from "react";
import { Match, MatchCard } from "./MatchCard";

interface PlayerMatchesProps {
  matches: Match[];
}
export function PlayerMatches({ matches }: PlayerMatchesProps) {
  // In a real app, we might want to sort matches by date
  const sortedMatches = [...matches].sort(
    (a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime()
  );
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Matches</h2>
      {sortedMatches.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No recent matches found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}
