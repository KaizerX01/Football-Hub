"use client";

import { useEffect, useState } from "react";
import { useFavoriteTeams } from "@/hooks/useFavoriteTeams";
import { supabase } from "@/lib/supabase";
import { removeFavoriteTeam } from "@/lib/FavoriteTeam";
import toast from "react-hot-toast";
import Link from "next/link";

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse space-y-4">
    <div className="h-3 bg-gradient-to-r from-purple-300 to-indigo-300 rounded"></div>
    <div className="flex justify-center">
      <div className="h-24 w-24 bg-gray-300 rounded-full"></div>
    </div>
    <div className="h-5 bg-gray-300 rounded w-2/3 mx-auto"></div>
    <div className="grid grid-cols-2 gap-2 mt-4">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="h-4 bg-gray-200 rounded col-span-1"></div>
      ))}
    </div>
    <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mt-6"></div>
  </div>
);

const FavoriteTeamsPage = () => {
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

  const { data, isLoading, isError, refetch } = useFavoriteTeams(
    userId || undefined
  );
  const teams = data?.teams || [];

  const handleRemoveFavorite = async (teamId: string) => {
    if (!userId) return toast.error("Not logged in");

    const result = await removeFavoriteTeam(userId, teamId);

    if (result.success) {
      toast.success(result.message);
      refetch();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="px-4 py-10 min-h-[90vh] bg-gradient-to-b from-[#1f1c2c] to-[#928dab] text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Favorite Teams
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-red-300 text-center text-sm">
            Failed to load teams.{" "}
            <button
              onClick={() => refetch()}
              className="text-blue-400 underline hover:text-blue-600"
            >
              Retry
            </button>
          </div>
        ) : teams.length === 0 ? (
          <div className="text-white text-lg text-center">
            No favorites yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {teams.map((club: any) => (
              <div
                key={club.id}
                className="relative group transition transform duration-300 hover:-translate-y-1"
              >
                <Link href={`/teams/${club.id}`} className="block">
                  <div className="bg-white text-black rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3"></div>
                    <div className="p-6">
                      <div className="flex items-center justify-center mb-4">
                        <img
                          src={club.crest}
                          alt={`${club.name} logo`}
                          className="h-24 w-24 object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h2 className="text-xl font-bold text-center mb-2">
                        {club.name}
                      </h2>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-600">Short name:</div>
                        <div className="font-medium text-right">{club.tla}</div>
                        <div className="text-gray-600">Founded:</div>
                        <div className="font-medium text-right">
                          {club.founded}
                        </div>
                        <div className="text-gray-600">Stadium:</div>
                        <div className="font-medium text-right">
                          {club.venue}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="text-sm text-gray-500">In League</div>
                        <button className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded-full transition">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => handleRemoveFavorite(club.id)}
                  className="absolute top-2 right-2 flex items-center gap-1 bg-red-100 text-red-700 hover:bg-red-200 transition px-3 py-1 rounded-full text-xs font-medium shadow-md"
                  title="Remove from favorites"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteTeamsPage;
