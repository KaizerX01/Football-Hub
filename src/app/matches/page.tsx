"use client";
import React from "react";
import { useMatches } from "@/hooks/useMatches";
import { LiveMatchCard } from "@/Components/Matches/LiveMatchCard";

export default function LiveMatchesPage() {
  const { data, isLoading, error, refetch } = useMatches();

  // Create skeleton loader that matches your Teams page
  const SkeletonCard = () => (
    <div className="bg-white text-black border border-emerald-200 rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3"></div>

      {/* Match content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
        </div>

        {/* Teams and score area */}
        <div className="flex justify-between items-center my-8">
          <div className="flex flex-col items-center w-1/3">
            <div className="h-24 w-24 bg-gray-300 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>

          {/* Score area */}
          <div className="h-16 w-24 bg-gray-300 rounded"></div>

          <div className="flex flex-col items-center w-1/3">
            <div className="h-24 w-24 bg-gray-300 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-4xl text-red-600 font-bold mb-6 text-center mt-6">
            Live Matches
          </h1>
          <p className="fontbold text-4xl text-emerald-900 font-bold text-center m-2">
            Follow live football matches from top leagues around the world
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-16">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-4xl text-red-600 font-bold mb-6 text-center mt-6">
            Live Matches
          </h1>
        </div>
        <div className="text-red-600 text-center font-semibold mt-6">
          ⚠️ Failed to load matches. Please try again later.
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl text-red-600 font-bold mb-6 text-center mt-6">
          Live Matches
        </h1>
        <p className="fontbold text-4xl text-red-200 font-bold text-center m-2">
          Follow live football matches from top leagues around the world
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-16">
        {data?.matches?.map((match: any) => (
          <div
            key={match.id}
            className="bg-white text-black border border-emerald-200 rounded-lg shadow-md overflow-hidden"
          >
            <LiveMatchCard key={match.id} match={match} />
          </div>
        ))}
      </div>
    </div>
  );
}
