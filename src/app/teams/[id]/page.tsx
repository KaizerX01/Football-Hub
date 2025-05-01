"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import TeamStats from "@/Components/Team/TeamState";
import { useTeamDetails } from "@/hooks/useTeamDetails";
import { useTeamMatches } from "@/hooks/useTeamMatches";

const ClubDetailPage = () => {
  const { id } = useParams<{
    id: string;
  }>();

  const { data, error, isLoading } = useTeamDetails(id);
  const teamId = data?.id;
  const {
    data: matchData,
    isLoading: matchesLoading,
    error: matchesError,
  } = useTeamMatches(teamId);

  console.log("ggg", data);

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
      <TeamStats
        team={{ data, error, isLoading }}
        matchData={matchData}
        matchesLoading={matchesLoading}
        matchesError={matchesError}
      />{" "}
    </div>
  );
};
export default ClubDetailPage;
