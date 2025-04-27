"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function StatsSection() {
  const leagueStandings = [
    {
      position: 1,
      team: "Manchester City",
      played: 7,
      won: 6,
      drawn: 1,
      lost: 0,
      points: 19,
    },
    {
      position: 2,
      team: "Liverpool",
      played: 7,
      won: 5,
      drawn: 2,
      lost: 0,
      points: 17,
    },
    {
      position: 3,
      team: "Arsenal",
      played: 7,
      won: 5,
      drawn: 1,
      lost: 1,
      points: 16,
    },
    {
      position: 4,
      team: "Tottenham",
      played: 7,
      won: 5,
      drawn: 0,
      lost: 2,
      points: 15,
    },
    {
      position: 5,
      team: "Brighton",
      played: 7,
      won: 4,
      drawn: 2,
      lost: 1,
      points: 14,
    },
  ];

  const topScorers = [
    {
      position: 1,
      player: "Erling Haaland",
      team: "Manchester City",
      goals: 9,
    },
    {
      position: 2,
      player: "Son Heung-min",
      team: "Tottenham",
      goals: 6,
    },
    {
      position: 3,
      player: "Mohamed Salah",
      team: "Liverpool",
      goals: 5,
    },
    {
      position: 4,
      player: "Bukayo Saka",
      team: "Arsenal",
      goals: 4,
    },
    {
      position: 5,
      player: "Bruno Fernandes",
      team: "Manchester United",
      goals: 3,
    },
  ];

  return (
    <section className="w-full bg-background py-12">
      <div className="container">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              Stats & Tables
            </h2>
            <Link
              href="/stats"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Full statistics <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* League Table */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Premier League Table</h3>
                <Link
                  href="/tables/premier-league"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  View full table
                </Link>
              </div>
              <div className="rounded-lg border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-accent/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Pos
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Team
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          P
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          W
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          D
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          L
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Pts
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {leagueStandings.map((team) => (
                        <tr key={team.position} className="hover:bg-accent/20">
                          <td className="px-4 py-3 text-sm">{team.position}</td>
                          <td className="px-4 py-3 text-sm font-medium">
                            {team.team}
                          </td>
                          <td className="px-4 py-3 text-sm text-center">
                            {team.played}
                          </td>
                          <td className="px-4 py-3 text-sm text-center">
                            {team.won}
                          </td>
                          <td className="px-4 py-3 text-sm text-center">
                            {team.drawn}
                          </td>
                          <td className="px-4 py-3 text-sm text-center">
                            {team.lost}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-center">
                            {team.points}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Top Scorers */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Top Goalscorers</h3>
                <Link
                  href="/stats/scorers"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  View all
                </Link>
              </div>
              <div className="rounded-lg border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-accent/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Pos
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Player
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Team
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Goals
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {topScorers.map((scorer) => (
                        <tr
                          key={scorer.position}
                          className="hover:bg-accent/20"
                        >
                          <td className="px-4 py-3 text-sm">
                            {scorer.position}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium">
                            {scorer.player}
                          </td>
                          <td className="px-4 py-3 text-sm">{scorer.team}</td>
                          <td className="px-4 py-3 text-sm font-medium text-center">
                            {scorer.goals}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Link
                  href="/stats/assists"
                  className="rounded-md border bg-card p-4 text-center text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Top Assists
                </Link>
                <Link
                  href="/stats/clean-sheets"
                  className="rounded-md border bg-card p-4 text-center text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Clean Sheets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
