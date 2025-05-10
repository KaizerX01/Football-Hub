"use client";
import React from "react";
import Link from "next/link";
import { useCompetitionStandings } from "@/hooks/useCompetitionStandings";

export function HeroSection() {
  const { data: standings, isLoading, isError } = useCompetitionStandings("PL");
  const table = standings?.standings?.[0]?.table?.slice(0, 10) || [];

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-xl p-6 backdrop-blur-md border border-slate-700/50 shadow-lg animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-52 bg-slate-700 rounded"></div>
          <div className="h-4 w-24 bg-slate-700 rounded"></div>
        </div>
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-slate-700 py-2"
            >
              <div className="w-6 h-4 bg-slate-700 rounded"></div>
              <div className="flex items-center gap-2 w-1/3">
                <div className="w-5 h-5 bg-slate-700 rounded-full"></div>
                <div className="w-32 h-4 bg-slate-700 rounded"></div>
              </div>
              <div className="w-10 h-4 bg-slate-700 rounded"></div>
              <div className="w-8 h-4 bg-slate-700 rounded"></div>
              <div className="w-8 h-4 bg-slate-700 rounded"></div>
              <div className="w-8 h-4 bg-slate-700 rounded"></div>
              <div className="w-8 h-4 bg-slate-700 rounded hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !table.length) {
    return (
      <div className="bg-gradient-to-r from-red-900/30 to-slate-900/30 p-6 rounded-xl border border-red-600/40 text-white text-center shadow-lg">
        <p className="text-lg font-semibold text-red-400">
          🚨 Failed to load Premier League standings.
        </p>
        <p className="text-sm text-slate-300 mt-1">
          Please try again later or check your connection.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-xl p-6 backdrop-blur-md border border-slate-700/50 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          🏆 Premier League Standings
        </h2>
        <Link
          href="/Competitions/PL"
          className="text-sm text-blue-400 hover:underline"
        >
          View Full Table →
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-200">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="text-left py-2 px-3">#</th>
              <th className="text-left py-2 px-3">Team</th>
              <th className="text-center py-2 px-3">Pts</th>
              <th className="text-center py-2 px-3">W</th>
              <th className="text-center py-2 px-3">D</th>
              <th className="text-center py-2 px-3">L</th>
              <th className="text-center py-2 px-3 hidden md:table-cell">GD</th>
            </tr>
          </thead>
          <tbody>
            {table.map((team: any) => (
              <tr
                key={team.team.id}
                className="hover:bg-slate-800/50 transition duration-200 border-b border-slate-700"
              >
                <td className="py-2 px-3 font-bold text-white">
                  {team.position}
                </td>
                <td className="py-2 px-3 flex items-center gap-2">
                  {team.team.crest && (
                    <img
                      src={team.team.crest}
                      alt={team.team.name}
                      className="w-5 h-5 object-contain"
                    />
                  )}
                  <Link
                    href={`/teams/${team.team.id}`}
                    className="hover:underline text-white"
                  >
                    {team.team.name}
                  </Link>
                </td>
                <td className="text-center py-2 px-3 font-semibold text-yellow-400">
                  {team.points}
                </td>
                <td className="text-center py-2 px-3">{team.won}</td>
                <td className="text-center py-2 px-3">{team.draw}</td>
                <td className="text-center py-2 px-3">{team.lost}</td>
                <td className="text-center py-2 px-3 hidden md:table-cell">
                  {team.goalDifference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
