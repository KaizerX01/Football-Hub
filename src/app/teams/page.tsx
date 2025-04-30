"use client";
import React, { useState } from "react";
import { useTeams } from "@/hooks/useTeams";
import TeamCard from "@/Components/Team/TeamCard";

const LIMIT = 20;

const SkeletonCard = () => (
  <div className="bg-white text-black border-r-emerald-200 mx-8 rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3"></div>
    <div className="p-6">
      <div className="flex items-center justify-center mb-4">
        <div className="h-24 w-24 bg-gray-300 rounded-full" />
      </div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-4" />
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="h-3 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-2/3 ml-auto" />
        <div className="h-3 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-1/2 ml-auto" />
        <div className="h-3 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-2/3 ml-auto" />
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="h-4 bg-gray-300 rounded w-1/3" />
        <div className="h-6 bg-gray-300 rounded w-1/4" />
      </div>
    </div>
  </div>
);

const ClubsPage = () => {
  const [offset, setOffset] = useState(0);
  const { data, error, isLoading } = useTeams({ limit: LIMIT, offset });

  const handleNext = () => {
    if (data?.teams.length === LIMIT) {
      setOffset((prev) => prev + LIMIT);
    }
  };

  const handlePrevious = () => {
    setOffset((prev) => Math.max(prev - LIMIT, 0));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center mt-6">
          Football Clubs
        </h1>
        <p className="fontbold text-3xl text-emerald-700 text-center m-2">
          Explore top football clubs from around the world
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-600 text-center font-semibold mt-6">
          ⚠️ Failed to load teams. Please try again later.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-center mx-16">
            {data?.teams.map((team: any) => (
              <TeamCard key={team.id} club={team} />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              disabled={offset === 0}
              className="px-4 py-2 bg-emerald-600 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!data?.teams || data.teams.length < LIMIT}
              className="px-4 py-2 bg-emerald-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClubsPage;
