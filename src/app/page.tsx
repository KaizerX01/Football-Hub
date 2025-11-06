"use client";
import { HeroSection } from "@/Components/HomePage/HeroSection";
import { LiveMatchesSection } from "@/Components/HomePage/LiveMatchesSection";
import { NewsSection } from "@/Components/HomePage/NewsSection";
import { TopCompetitionsSection } from "@/Components/HomePage/TopCompetitionSection";
import { UpcomingFixturesSection } from "@/Components/HomePage/UpComingFixtures";
import { useCompetitionScorers } from "@/hooks/useCompetitionScorers"; // Import the hook
import React from "react";
import { Star } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  // Fetch Premier League top scorers
  const { data: scorers, isLoading } = useCompetitionScorers("PL");

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-24 left-1/4 w-72 h-72 bg-indigo-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-3/4 right-1/3 w-64 h-64 bg-violet-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header with Title and Description */}
      <header className="relative z-10 px-4 sm:px-6 lg:px-8 py-10 text-center bg-gradient-to-r from-indigo-700 to-purple-900 rounded-b-xl shadow-md">
        <h1 className="text-5xl font-bold text-white">
          Welcome to Football Hub
        </h1>
        <p className="mt-4 text-xl text-white/80">
          Your one-stop destination for all the latest football news, live
          matches, upcoming fixtures, and top competitions. Stay updated with
          your favorite teams and never miss a game.
        </p>
      </header>

      {/* Content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-10 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr_20rem] gap-6">
          {/* Left Sidebar - Top Competitions */}
          <aside className="bg-zinc-900/70 rounded-xl p-4 border border-white/10 shadow-md h-fit">
            <TopCompetitionsSection />
          </aside>

          {/* Center - Main Feed: Matches, Fixtures, Hero */}
          <section className="space-y-6">
            <HeroSection />
            <LiveMatchesSection />
            <UpcomingFixturesSection />
            <NewsSection />
          </section>

          {/* Right Sidebar - Featured, Ads, Widgets */}
          <aside className="bg-zinc-900/70 rounded-xl p-4 border border-white/10 shadow-md h-fit">
            {/* Top Scorers */}
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-4 border border-slate-700/50">
              <h2 className="text-lg font-semibold mb-4">
                Top Scorers (Premier League)
              </h2>

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
                  {scorers?.scorers
                    .slice(0, 5)
                    .map((scorer: any, index: number) => (
                      <Link
                        key={scorer.player.id}
                        href={`/players/${scorer.player.id}`}
                        className="flex items-center justify-between p-2 hover:bg-slate-700/30 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`${scorer.team.color}`}>
                            {scorer.team.icon}
                          </span>
                          <span>{scorer.player.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">
                            {scorer.goals} goals
                          </span>
                          <Star
                            size={16}
                            className="text-gray-400 hover:text-yellow-400"
                          />
                        </div>
                      </Link>
                    ))}
                </div>
              )}
            </div>

            <Link href="/Competitions/PL">
              <button className="text-sm text-blue-400 mt-4 flex items-center justify-center w-full hover:underline">
                Show more
              </button>
            </Link>
          </aside>
        </div>
      </main>
    </div>
  );
}
