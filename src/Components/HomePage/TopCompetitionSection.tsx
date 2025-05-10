"use client";

import React from "react";
import { Star } from "lucide-react";
import { useCompetitions } from "@/hooks/useCompetitions";
import Link from "next/link";

const TOP_LEAGUES = [
  "Primera Division",
  "Premier League",
  "Serie A",
  "Ligue 1",
  "Bundesliga",
];

export function TopCompetitionsSection() {
  const { data: competitions, isLoading, error } = useCompetitions();

  const filteredCompetitions =
    competitions?.filter((c: any) => TOP_LEAGUES.includes(c.name)) || [];

  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-4 border border-slate-700/50">
      <h2 className="text-lg font-semibold mb-4">Top Competitions</h2>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-700/30 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-600" />
                <div className="w-24 h-3 bg-slate-600 rounded" />
              </div>
              <div className="w-4 h-4 bg-slate-600 rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredCompetitions.map((competition: any) => (
            <Link
              key={competition.code}
              href={`/Competitions/${competition.code}`}
              className="flex items-center justify-between p-2 hover:bg-slate-700/30 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`${competition.color}`}>
                  {competition.icon}
                </span>
                <span>{competition.name}</span>
              </div>
              <Star size={16} className="text-gray-400 hover:text-yellow-400" />
            </Link>
          ))}
        </div>
      )}

      <Link href="/Competitions">
        <button className="text-sm text-blue-400 mt-4 flex items-center justify-center w-full hover:underline">
          Show more
        </button>
      </Link>
    </div>
  );
}
