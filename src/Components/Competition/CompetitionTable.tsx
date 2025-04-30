import Link from "next/link";
import React from "react";

interface CompetitionTableProps {
  standings: any;
  isLoading: boolean;
  isError: boolean;
}

export function CompetitionTable({
  standings,
  isLoading,
  isError,
}: CompetitionTableProps) {
  if (isLoading) {
    return <div className="text-center py-12">Loading standings...</div>;
  }

  if (isError || !standings) {
    return (
      <div className="text-center text-red-500 py-12">
        Failed to load standings.
      </div>
    );
  }

  const table = standings.standings?.[0]?.table || [];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4">#</th>
            <th className="text-left py-3 px-4">Team</th>
            <th className="text-center py-3 px-4">MP</th>
            <th className="text-center py-3 px-4">W</th>
            <th className="text-center py-3 px-4">D</th>
            <th className="text-center py-3 px-4">L</th>
            <th className="text-center py-3 px-4">GF</th>
            <th className="text-center py-3 px-4">GA</th>
            <th className="text-center py-3 px-4">GD</th>
            <th className="text-center py-3 px-4">Pts</th>
          </tr>
        </thead>
        <tbody>
          {table.map((team: any) => (
            <tr
              key={team.team.id}
              className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <td className="py-3 px-4">{team.position}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  {team.team.crest && (
                    <img
                      src={team.team.crest}
                      alt={team.team.name}
                      className="w-6 h-6 object-contain rounded-full"
                    />
                  )}
                  <Link href={`/teams/${team.team.id}`}>
                    <span>{team.team.name}</span>
                  </Link>
                </div>
              </td>
              <td className="text-center py-3 px-4">{team.playedGames}</td>
              <td className="text-center py-3 px-4">{team.won}</td>
              <td className="text-center py-3 px-4">{team.draw}</td>
              <td className="text-center py-3 px-4">{team.lost}</td>
              <td className="text-center py-3 px-4">{team.goalsFor}</td>
              <td className="text-center py-3 px-4">{team.goalsAgainst}</td>
              <td className="text-center py-3 px-4">{team.goalDifference}</td>
              <td className="text-center py-3 px-4 font-bold">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
