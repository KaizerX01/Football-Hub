import React from "react";
import { Calendar, Trophy } from "lucide-react";
import Link from "next/link";

export interface Match {
  id: number;
  utcDate: string;
  homeTeam: {
    id: string;
    name: string;
    shortName: string;
    crest: string;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
    crest: string;
  };
  score: {
    winner: string;
    fullTime: {
      home: number;
      away: number;
    };
  };
  competition: {
    name: string;
    code: string;
  };
  matchday: number;
  status: string;
}

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  if (!match) {
    return <div>Loading match data...</div>;
  }

  const matchDate = new Date(match.utcDate).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const getResultClass = (team: "home" | "away") => {
    if (match.score.winner === "DRAW") return "text-yellow-600";
    if (
      (team === "home" && match.score.winner === "HOME_TEAM") ||
      (team === "away" && match.score.winner === "AWAY_TEAM")
    ) {
      return "text-green-600 font-bold";
    }
    return "text-red-600";
  };

  const getCompetitionBadgeColor = (code: string) => {
    switch (code) {
      case "CL":
        return "bg-blue-100 text-blue-800";
      case "SA":
        return "bg-green-100 text-green-800";
      case "PD":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Trophy className="w-4 h-4 mr-2 text-gray-500" />
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${getCompetitionBadgeColor(
                match.competition.code
              )}`}
            >
              {match.competition.name} • Matchday {match.matchday}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {matchDate}
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Home Team */}
          <Link href={`/teams/${match.homeTeam.id}`}>
            <div className="flex-1 flex items-center gap-2">
              <img
                src={match.homeTeam.crest}
                alt={match.homeTeam.name}
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
              />
              <span className={`text-lg font-medium ${getResultClass("home")}`}>
                {match.homeTeam.name}
              </span>
            </div>
          </Link>

          {/* Score */}
          <div className="px-4 py-2 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className={`text-2xl font-bold ${getResultClass("home")}`}>
              {match.score.fullTime.home}
            </span>
            <span className="mx-2 text-gray-500">-</span>
            <span className={`text-2xl font-bold ${getResultClass("away")}`}>
              {match.score.fullTime.away}
            </span>
          </div>

          {/* Away Team */}
          <Link href={`/teams/${match.awayTeam.id}`}>
            <div className="flex-1 flex items-center justify-end gap-2">
              <span className={`text-lg font-medium ${getResultClass("away")}`}>
                {match.awayTeam.name}
              </span>
              <img
                src={match.awayTeam.crest}
                alt={match.awayTeam.name}
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
              />
            </div>
          </Link>
        </div>

        <div className="mt-4 flex justify-center">
          <span className="text-xs text-gray-500 uppercase font-medium">
            {match.status === "FINISHED" ? "Full Time" : match.status}
          </span>
        </div>
      </div>
    </div>
  );
}
