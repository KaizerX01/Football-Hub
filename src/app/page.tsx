import { HeroSection } from "@/Components/HomePage/HeroSection";
import { LiveMatchesSection } from "@/Components/HomePage/LiveMatchesSection";
import { NewsSection } from "@/Components/HomePage/NewsSection";
import { TopCompetitionsSection } from "@/Components/HomePage/TopCompetitionSection";
import { UpcomingFixturesSection } from "@/Components/HomePage/UpComingFixtures";
import React from "react";

export default function HomePage() {
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
          <aside className="space-y-6">
            <div className="bg-zinc-900/70 rounded-xl p-4 border border-white/10 shadow-md">
              {/* Featured Match / Odds / Promotions */}
              <h2 className="text-lg font-semibold mb-3">Featured</h2>
              <div className="flex items-center justify-between bg-zinc-800 rounded-lg px-4 py-3 mb-2">
                <div className="flex items-center gap-2">
                  <img src="/psg-logo.png" alt="PSG" className="h-6 w-6" />
                  <span>PSG</span>
                </div>
                <span className="text-xl font-bold">1 - 0</span>
                <div className="flex items-center gap-2">
                  <span>Arsenal</span>
                  <img
                    src="/arsenal-logo.png"
                    alt="Arsenal"
                    className="h-6 w-6"
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-300">
                <div>
                  1 <span className="text-red-400">1.57</span>
                </div>
                <div>
                  X <span className="text-yellow-400">4.00</span>
                </div>
                <div>
                  2 <span className="text-green-400">5.50</span>
                </div>
              </div>
            </div>

            {/* Optionally: Ads or Weekly Challenge */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 shadow-md">
              <div className="font-semibold text-white text-center">
                🏆 Weekly Challenge
              </div>
              <div className="text-sm text-center text-white/80">
                Time left: 4d 10h
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
