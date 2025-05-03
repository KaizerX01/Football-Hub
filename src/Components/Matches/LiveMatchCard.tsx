"use client";

import React from "react";
import { LiveIndicator } from "./LiveIndicator";
import Link from "next/link";

export function LiveMatchCard({ match }: any) {
  console.log("MATCH OBJECT:", match);

  if (!match) {
    console.log("No match prop passed!");
    return null;
  }
  const { competition, homeTeam, awayTeam, score, status, matchday } = match;

  const isLive = ["IN_PLAY", "PAUSED", "LIVE", "HALF_TIME"].includes(status);
  console.log("STATUS:", status);
  console.log("IS LIVE:", isLive);

  // Determine score text color based on which team is winning
  const getHomeScoreColor = () => {
    if (!score?.fullTime) return "text-black";
    if (score.fullTime.home > score.fullTime.away) return "text-green-600";
    if (score.fullTime.home < score.fullTime.away) return "text-red-600";
    return "text-black";
  };

  const getAwayScoreColor = () => {
    if (!score?.fullTime) return "text-black";
    if (score.fullTime.away > score.fullTime.home) return "text-green-600";
    if (score.fullTime.away < score.fullTime.home) return "text-red-600";
    return "text-black";
  };

  return (
    <div className="bg-white text-black border border-emerald-200 rounded-lg shadow-md overflow-hidden">
      {/* Header with competition and date */}
      <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center space-x-3">
          {competition?.emblem && (
            <img
              src={competition.emblem}
              alt={competition.name}
              className="h-6 w-6 object-contain"
            />
          )}
          <span className="text-base font-semibold">
            {competition?.name || "Unknown"}
          </span>
          <span className="text-sm text-gray-500">• Matchday {matchday}</span>
        </div>
        <div className="flex items-center space-x-3">
          {isLive && <LiveIndicator />}
        </div>
      </div>

      {/* Match content */}
      <div className="p-10">
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="w-1/3 flex flex-col items-center text-center">
            <div className="h-28 w-28 flex items-center justify-center mb-4">
              <Link href={`/teams/${homeTeam.id}`}>
                {homeTeam?.crest && (
                  <img
                    src={homeTeam.crest}
                    alt={homeTeam.name}
                    className="max-h-28 max-w-28 object-contain"
                  />
                )}
              </Link>
            </div>
            <div className="font-bold text-xl mb-2">
              {homeTeam?.name || "Home Team"}
            </div>
            <div className={`text-lg ${getHomeScoreColor()} font-bold`}>
              {homeTeam?.shortName || ""}
            </div>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 rounded-2xl px-10 py-6 mb-4">
              <div className="text-5xl font-bold flex items-center justify-center space-x-4">
                <span className={getHomeScoreColor()}>
                  {score?.fullTime?.home || "0"}
                </span>
                <span className="text-gray-400">-</span>
                <span className={getAwayScoreColor()}>
                  {score?.fullTime?.away || "0"}
                </span>
              </div>
            </div>
            <div className="text-base text-gray-500 uppercase font-semibold">
              {status?.replace("_", " ") || "UPCOMING"}
            </div>
          </div>

          {/* Away Team */}
          <div className="w-1/3 flex flex-col items-center text-center">
            <div className="h-28 w-28 flex items-center justify-center mb-4">
              <Link href={`/teams/${homeTeam.id}`}>
                {awayTeam?.crest && (
                  <img
                    src={awayTeam.crest}
                    alt={awayTeam.name}
                    className="max-h-28 max-w-28 object-contain"
                  />
                )}
              </Link>
            </div>
            <div className="font-bold text-xl mb-2">
              {awayTeam?.name || "Away Team"}
            </div>
            <div className={`text-lg ${getAwayScoreColor()} font-bold`}>
              {awayTeam?.shortName || ""}
            </div>
          </div>
        </div>
      </div>

      {/* Footer with additional match info */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center items-center px-6 pb-6">
        <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
          {status}
        </div>
      </div>
    </div>
  );
}
