import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function MatchesSection() {
  const upcomingMatches = [
    {
      id: 1,
      league: "Premier League",
      homeTeam: "Arsenal",
      awayTeam: "Manchester United",
      homeScore: null,
      awayScore: null,
      time: "Sunday, 16:30",
      date: "Oct 8, 2023",
      homeLogo:
        "https://logodownload.org/wp-content/uploads/2017/02/Arsenal-logo-escudo-shield-1.png",
      awayLogo:
        "https://logodownload.org/wp-content/uploads/2016/10/manchester-united-logo-1.png",
    },
    {
      id: 2,
      league: "La Liga",
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      homeScore: null,
      awayScore: null,
      time: "Saturday, 20:00",
      date: "Oct 14, 2023",
      homeLogo:
        "https://logodownload.org/wp-content/uploads/2015/05/barcelona-logo-0.png",
      awayLogo:
        "https://logodownload.org/wp-content/uploads/2016/05/real-madrid-logo-escudo-1.png",
    },
    {
      id: 3,
      league: "Serie A",
      homeTeam: "Juventus",
      awayTeam: "AC Milan",
      homeScore: null,
      awayScore: null,
      time: "Sunday, 18:45",
      date: "Oct 8, 2023",
      homeLogo:
        "https://logodownload.org/wp-content/uploads/2017/02/juventus-logo-0.png",
      awayLogo:
        "https://logodownload.org/wp-content/uploads/2016/09/ac-milan-logo-0.png",
    },
  ];

  const recentResults = [
    {
      id: 4,
      league: "Champions League",
      homeTeam: "Bayern Munich",
      awayTeam: "PSG",
      homeScore: 2,
      awayScore: 0,
      date: "Oct 4, 2023",
      homeLogo:
        "https://logodownload.org/wp-content/uploads/2017/02/bayern-munich-logo-0.png",
      awayLogo:
        "https://logodownload.org/wp-content/uploads/2017/02/psg-logo-escudo-paris-saint-germain.png",
    },
    {
      id: 5,
      league: "Premier League",
      homeTeam: "Liverpool",
      awayTeam: "Chelsea",
      homeScore: 1,
      awayScore: 1,
      date: "Oct 1, 2023",
      homeLogo:
        "https://logodownload.org/wp-content/uploads/2017/02/liverpool-fc-logo-0.png",
      awayLogo:
        "https://logodownload.org/wp-content/uploads/2017/02/chelsea-fc-logo-0.png",
    },
  ];

  return (
    <section className="w-full bg-background py-12">
      <div className="container">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Matches</h2>
            <Link
              href="/matches"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              View all <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Upcoming Fixtures</h3>
              <div className="flex flex-col gap-4">
                {upcomingMatches.map((match) => (
                  <div
                    key={match.id}
                    className="rounded-lg border bg-card p-4 shadow-sm hover:shadow transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {match.league}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {match.date}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={match.homeLogo}
                          alt={match.homeTeam}
                          className="h-8 w-8 object-contain"
                        />
                        <span className="font-medium">{match.homeTeam}</span>
                      </div>
                      <div className="px-4 py-2 rounded-md bg-accent text-sm font-medium">
                        {match.time}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{match.awayTeam}</span>
                        <img
                          src={match.awayLogo}
                          alt={match.awayTeam}
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Recent Results</h3>
              <div className="flex flex-col gap-4">
                {recentResults.map((match) => (
                  <div
                    key={match.id}
                    className="rounded-lg border bg-card p-4 shadow-sm hover:shadow transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {match.league}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {match.date}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={match.homeLogo}
                          alt={match.homeTeam}
                          className="h-8 w-8 object-contain"
                        />
                        <span className="font-medium">{match.homeTeam}</span>
                      </div>
                      <div className="px-4 py-2 rounded-md bg-accent text-sm font-bold">
                        {match.homeScore} - {match.awayScore}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{match.awayTeam}</span>
                        <img
                          src={match.awayLogo}
                          alt={match.awayTeam}
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  href="/results"
                  className="w-full rounded-md border border-input bg-card p-4 text-center text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  View More Results
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
