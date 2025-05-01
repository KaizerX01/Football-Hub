"use client";

import { useTeamMatches } from "@/hooks/useTeamMatches";
import Link from "next/link";
import React from "react";

const TeamStats = ({
  team,
  matchData,
  matchesLoading,
  matchesError,
}: {
  team: { data: any; isLoading: boolean; error: any };
  matchData: any;
  matchesLoading: boolean;
  matchesError: any;
}) => {
  if (team.isLoading) {
    return (
      <div className="space-y-12 p-8 text-black animate-pulse">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="h-40 w-40 bg-gray-200 rounded-full" />
          <div className="space-y-4 w-full">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-10 w-10 bg-gray-200 rounded" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded" />
                ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg" />
            ))}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg" />
              ))}
          </div>
        </div>
      </div>
    );
  }

  if (team.error) {
    return (
      <div className="p-8 text-red-600 text-center font-semibold">
        Failed to load team data. Please try again later.
      </div>
    );
  }

  const data = team.data;

  const coachName = data.coach?.name || "Unknown";
  const competitions =
    data.runningCompetitions?.map((comp: any) => comp.name).join(", ") || "N/A";
  const squad = data.squad || [];

  const groupedPlayers = {
    Goalkeepers: squad.filter((p: any) =>
      p.position?.toLowerCase().includes("goalkeeper")
    ),
    Defenders: squad.filter((p: any) =>
      ["defence", "centre-back", "left-back", "right-back"].some((pos) =>
        p.position?.toLowerCase().includes(pos)
      )
    ),
    Midfielders: squad.filter((p: any) =>
      p.position?.toLowerCase().includes("midfield")
    ),
    Forwards: squad.filter((p: any) =>
      ["forward", "offence", "winger", "striker"].some((pos) =>
        p.position?.toLowerCase().includes(pos)
      )
    ),
    Others: squad.filter((p: any) => {
      const pos = p.position?.toLowerCase();
      return (
        pos &&
        ![
          "goalkeeper",
          "defence",
          "centre-back",
          "left-back",
          "right-back",
          "midfield",
          "forward",
          "offence",
          "winger",
          "striker",
        ].some((known) => pos.includes(known))
      );
    }),
  };

  const renderPlayerSection = (title: string, players: any[]) => {
    if (!players.length) return null;

    return (
      <div>
        <h3 className="text-xl font-bold text-emerald-700 mb-4">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {players.map((player: any) => (
            <div
              key={player.id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <Link href={`/players/${player.id}`}>
                <h4 className="text-md font-semibold text-gray-800">
                  {player.name}
                </h4>
              </Link>
              <p className="text-sm text-gray-500">{player.position}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 p-8 text-black">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        <img
          src={data.crest}
          alt={`${data.name} logo`}
          className="h-40 w-40 object-contain drop-shadow-md"
        />
        <div>
          <h1 className="text-4xl font-extrabold text-emerald-700 mb-2">
            {data.name}
          </h1>
          <img
            src={data.area.flag}
            alt={`${data.area.name} flag`}
            className="h-10 w-10 object-contain drop-shadow-md mb-4"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white shadow rounded-lg px-4 py-2 text-center">
              <p className="text-sm text-gray-500">Founded</p>
              <p className="font-bold text-lg">{data.founded}</p>
            </div>
            <div className="bg-white shadow rounded-lg px-4 py-2 text-center">
              <p className="text-sm text-gray-500">Country</p>
              <p className="font-bold text-lg">{data.area.name}</p>
            </div>
            <div className="bg-white shadow rounded-lg px-4 py-2 text-center">
              <p className="text-sm text-gray-500">Colors</p>
              <p className="font-bold text-lg">{data.clubColors}</p>
            </div>
            <div className="bg-white shadow rounded-lg px-4 py-2 text-center">
              <p className="text-sm text-gray-500">Coach</p>
              <p className="font-bold text-lg">{coachName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Competitions */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-600">
          Running Competitions
        </h2>
        <p className="text-gray-700 text-lg">{competitions}</p>
      </div>

      {/* Matches Section */}
      {matchesLoading ? (
        <div className="bg-white shadow-md rounded-xl p-6 animate-pulse">
          <div className="h-8 bg-gray-200 w-1/3 mb-6 rounded" />
          <div className="space-y-4">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl" />
              ))}
          </div>
        </div>
      ) : matchesError ? (
        <div className="p-4 text-red-600 font-medium">
          Failed to load upcoming matches.
        </div>
      ) : (
        matchData?.matches?.length > 0 && (
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-3xl font-bold mb-8 text-emerald-600 text-center">
              Upcoming Matches
            </h2>
            <div className="space-y-6">
              {matchData.matches.map((match: any) => {
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
                    className="flex flex-col lg:flex-row justify-between items-center gap-6 border border-gray-200 rounded-xl p-6 hover:shadow-lg bg-gray-50"
                  >
                    <div className="text-center lg:text-left w-full lg:w-1/3">
                      <p className="text-xl font-semibold text-gray-800">
                        {match.competition.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
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
                        <p className="text-sm font-medium text-gray-700 text-center">
                          <span className="text-gray-500">Home Team:</span>{" "}
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
                        <p className="text-sm font-medium text-gray-700 text-center">
                          <span className="text-gray-500">Away Team:</span>{" "}
                          {away.name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}

      {/* Squad Sections */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-emerald-600">Squad</h2>
        {renderPlayerSection("Goalkeepers", groupedPlayers.Goalkeepers)}
        {renderPlayerSection("Defenders", groupedPlayers.Defenders)}
        {renderPlayerSection("Midfielders", groupedPlayers.Midfielders)}
        {renderPlayerSection("Forwards", groupedPlayers.Forwards)}
        {renderPlayerSection("Other Players", groupedPlayers.Others)}
      </div>
    </div>
  );
};

export default TeamStats;
