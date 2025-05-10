"use client";

import React, { useState } from "react";
import { useMatches } from "@/hooks/useMatches";
import Link from "next/link";
import { LiveIndicator } from "../Matches/LiveIndicator";

export function LiveMatchesSection() {
  const { data: liveMatches, isLoading, error } = useMatches();
  const [showAll, setShowAll] = useState(false);

  if (isLoading) {
    return (
      <section className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-lg animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 bg-slate-600 rounded w-1/3"></div>
          <div className="flex gap-2">
            <div className="h-6 w-24 bg-slate-700 rounded-full"></div>
            <div className="h-6 w-20 bg-slate-700 rounded-full"></div>
            <div className="h-6 w-20 bg-slate-700 rounded-full"></div>
          </div>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-slate-700/50 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-1/3">
                <div className="h-10 w-10 bg-slate-600 rounded-full" />
                <div className="h-4 bg-slate-600 rounded w-2/3" />
              </div>
              <div className="h-6 w-24 bg-slate-600 rounded" />
              <div className="flex items-center gap-4 w-full sm:w-1/3 justify-end">
                <div className="h-4 bg-slate-600 rounded w-2/3" />
                <div className="h-10 w-10 bg-slate-600 rounded-full" />
              </div>
              <div className="mt-4 sm:mt-0 w-full sm:w-auto h-4 bg-slate-600 rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !liveMatches?.matches) {
    return (
      <section className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-lg text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Live Matches</h2>
        <p className="text-red-400 text-lg">
          ⚠️ Failed to load live matches. Please try again later.
        </p>
        <p className="text-sm text-gray-500 mt-1">Network or API issue.</p>
      </section>
    );
  }

  const liveOnly = liveMatches.matches.filter((match: any) =>
    ["IN_PLAY", "PAUSED", "LIVE", "HALF_TIME"].includes(match.status)
  );

  const visibleMatches = showAll ? liveOnly : liveOnly.slice(0, 5);

  if (liveOnly.length === 0) {
    return (
      <section className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-lg text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Live Matches</h2>
        <p className="text-gray-300">⚽ No live matches at the moment.</p>
        <p className="text-sm text-gray-500 mt-1">Check back later!</p>
      </section>
    );
  }

  const getScoreColor = (a: number, b: number) => {
    if (a > b) return "text-green-500";
    if (a < b) return "text-red-500";
    return "text-gray-300";
  };

  return (
    <section className="bg-slate-800/60 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Live Matches</h2>

        <div className="flex items-center gap-2">
          <Link href={"/matches"}>
            <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold transition shadow-sm">
              View All Matches
            </span>
          </Link>

          <button className="bg-red-600/80 text-white px-4 py-1 rounded-full text-sm font-medium">
            Live ({liveOnly.length})
          </button>
          <button className="bg-slate-700/70 text-gray-300 px-4 py-1 rounded-full text-sm font-medium">
            Finished
          </button>
          <button className="bg-slate-700/70 text-gray-300 px-4 py-1 rounded-full text-sm font-medium">
            Upcoming
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {visibleMatches.map((match: any) => {
          const { homeTeam, awayTeam, score, competition, status, matchday } =
            match;

          return (
            <div
              key={match.id}
              className="bg-slate-700/50 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between hover:bg-slate-700/70 transition"
            >
              {/* Home Team */}
              <div className="flex items-center gap-4 w-full sm:w-1/3">
                <Link href={`/teams/${homeTeam.id}`}>
                  <img
                    src={homeTeam.crest}
                    alt={homeTeam.name}
                    className="h-10 w-10 object-contain"
                  />
                </Link>
                <span className="text-white font-medium truncate">
                  {homeTeam.name}
                </span>
              </div>

              {/* Score */}
              <div className="flex items-center justify-center gap-2 bg-slate-800/60 px-4 py-2 rounded-xl text-xl font-bold">
                <span
                  className={getScoreColor(
                    score?.fullTime?.home ?? 0,
                    score?.fullTime?.away ?? 0
                  )}
                >
                  {score?.fullTime?.home ?? "-"}
                </span>
                <span className="text-gray-400">-</span>
                <span
                  className={getScoreColor(
                    score?.fullTime?.away ?? 0,
                    score?.fullTime?.home ?? 0
                  )}
                >
                  {score?.fullTime?.away ?? "-"}
                </span>
              </div>

              {/* Away Team */}
              <div className="flex items-center gap-4 w-full sm:w-1/3 justify-end">
                <span className="text-white font-medium truncate text-right">
                  {awayTeam.name}
                </span>
                <Link href={`/teams/${awayTeam.id}`}>
                  <img
                    src={awayTeam.crest}
                    alt={awayTeam.name}
                    className="h-10 w-10 object-contain"
                  />
                </Link>
              </div>

              {/* Match Meta Info */}
              <div className="flex flex-col items-center sm:items-end mt-4 sm:mt-0 w-full sm:w-auto text-sm text-gray-300">
                <div className="flex items-center gap-2 mb-1">
                  <LiveIndicator />
                  <span className="uppercase tracking-wide">
                    {status?.replace("_", " ")}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  {competition?.name} • MD {matchday}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {liveOnly.length > 5 && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-6 w-full bg-slate-700/60 hover:bg-slate-700/80 text-white py-2 rounded-lg text-sm font-semibold transition"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </section>
  );
}
