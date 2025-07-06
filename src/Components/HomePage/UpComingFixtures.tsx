"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useFavoriteTeams } from "@/hooks/useFavoriteTeams";
import { useTeamMatches } from "@/hooks/useTeamMatches";
import { supabase } from "@/lib/supabase";
import Link from "next/link"; // Ensure you have Link imported for navigation

export function UpcomingFixturesSection() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session?.user?.id) {
        setUserId(session.user.id);
      }

      if (error) console.error("Session error:", error);
    };

    getSession();
  }, []);

  const {
    data: favoriteTeamsData,
    isLoading: isLoadingFavorites,
    isError: errorFavorites,
  } = useFavoriteTeams(userId || undefined);

  const randomTeam = useMemo(() => {
  const teams = favoriteTeamsData?.teams || [];
  if (!teams.length) return null;
  const randomIndex = Math.floor(Math.random() * teams.length);
  return teams[randomIndex];
}, [favoriteTeamsData]);

  const {
    data: matchesData,
    isLoading: isLoadingMatches,
    error: matchError,
  } = useTeamMatches(randomTeam?.id ?? "");

  if (isLoadingFavorites || isLoadingMatches) {
    return (
      <div className="bg-purple-800/60 shadow-lg rounded-xl p-6 animate-pulse">
        {/* Loading Title */}
        <div className="h-8 bg-purple-600 w-1/3 mb-6 rounded" />

        {/* Loading Match Details */}
        <div className="space-y-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex flex-col lg:flex-row justify-between items-center gap-6 border border-purple-700 rounded-xl p-6 bg-purple-700/40"
              >
                {/* Placeholder for Match Competition */}
                <div className="text-center lg:text-left w-full lg:w-1/3">
                  <div className="h-6 bg-purple-600 w-2/3 mb-2 rounded" />
                  <div className="h-4 bg-purple-600 w-1/2 rounded" />
                </div>

                {/* Placeholder for Teams and Date */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full lg:w-2/3">
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-12 w-12 bg-purple-600 rounded-full mb-2" />
                    <div className="h-4 bg-purple-600 w-2/3 rounded" />
                  </div>

                  <div className="h-6 bg-purple-600 w-12 rounded-full" />

                  <div className="flex flex-col items-center gap-1">
                    <div className="h-12 w-12 bg-purple-600 rounded-full mb-2" />
                    <div className="h-4 bg-purple-600 w-2/3 rounded" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (errorFavorites) {
    return (
      <div className="bg-red-600 text-white p-4 rounded-xl">
        <p className="font-bold">
          Oops! Something went wrong while loading your favorite teams.
        </p>
        <p>Please try again later or check your connection.</p>
      </div>
    );
  }

  if (!randomTeam) {
    return <div className="text-red-400 text-center p-4"></div>;
  }

  if (matchError || !matchesData?.matches?.length) {
    return (
      <div className="p-4 text-yellow-400 bg-yellow-800 rounded-xl">
        <p className="font-bold">No upcoming matches for {randomTeam.name}!</p>
        <p>Check back later for updates or try again.</p>
      </div>
    );
  }

  return (
    <div className="bg-purple-800/60 shadow-lg rounded-xl p-6">
      <h2 className="text-3xl font-bold mb-8 text-emerald-600 text-center">
        Upcoming Matches
      </h2>
      <div className="space-y-6">
        {matchesData.matches.map((match: any) => {
          const date = new Date(match.utcDate).toLocaleString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          const home = match.homeTeam;
          const away = match.awayTeam;

          return (
            <div
              key={match.id}
              className="flex flex-col lg:flex-row justify-between items-center gap-6 border border-purple-700 rounded-xl p-6 hover:shadow-lg bg-purple-700/40"
            >
              <div className="text-center lg:text-left w-full lg:w-1/3">
                <p className="text-xl font-semibold text-white">
                  {match.competition.name}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Matchday {match.matchday} • {date}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full lg:w-2/3">
                <div className="flex flex-col items-center gap-1">
                  {home.crest && (
                    <Link href={`/teams/${home.id}`}>
                      <img
                        src={home.crest}
                        alt={home.name}
                        className="h-12 w-12 object-contain"
                      />
                    </Link>
                  )}
                  <p className="text-sm font-medium text-white text-center">
                    <span className="text-gray-300">Home Team:</span>{" "}
                    {home.name}
                  </p>
                </div>
                <span className="text-emerald-600 font-bold text-lg sm:text-2xl">
                  VS
                </span>
                <div className="flex flex-col items-center gap-1">
                  {away.crest && (
                    <Link href={`/teams/${away.id}`}>
                      <img
                        src={away.crest}
                        alt={away.name}
                        className="h-12 w-12 object-contain"
                      />
                    </Link>
                  )}
                  <p className="text-sm font-medium text-white text-center">
                    <span className="text-gray-300">Away Team:</span>{" "}
                    {away.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
