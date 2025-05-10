"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import TeamStats from "@/Components/Team/TeamState";
import { useTeamDetails } from "@/hooks/useTeamDetails";
import { useTeamMatches } from "@/hooks/useTeamMatches";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { addFavoriteTeam } from "@/lib/FavoriteTeam";

const ClubDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useTeamDetails(id);
  const teamId = data?.id;

  const {
    data: matchData,
    isLoading: matchesLoading,
    error: matchesError,
  } = useTeamMatches(teamId);

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

      if (error) console.error("Error fetching session:", error);
    };

    getSession();
  }, []);

  const handleAddFavorite = async () => {
    if (!userId) {
      return toast.error("You must be logged in.");
    }

    const result = await addFavoriteTeam(userId, data?.id);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div>
      <div className="m-6 text-3xl">
        <Link
          href="/teams"
          className="inline-flex items-center text-green-600 hover:text-green-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 mr-1"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to All Clubs
        </Link>
      </div>

      {/* Add the favorite button */}
      <div className="m-6">
        <button
          onClick={handleAddFavorite}
          className="inline-flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 mr-2"
          >
            <path d="M12 21s9-5.5 9-10A5 5 0 0 0 12 3a5 5 0 0 0-9 8c0 4.5 9 10 9 10z" />
          </svg>
          Add to Favorites
        </button>
      </div>

      <TeamStats
        team={{ data, error, isLoading }}
        matchData={matchData}
        matchesLoading={matchesLoading}
        matchesError={matchesError}
      />
    </div>
  );
};

export default ClubDetailPage;
