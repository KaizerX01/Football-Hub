"use client"; // Ensure this is a client-side component

import { use } from "react"; // Import `use` hook from React
import { CompetitionDetails } from "@/Components/Competition/CompetitionDetails";
import { ErrorState } from "@/Components/Competition/ErrorState";
import { LoadingSkeleton } from "@/Components/Competition/LoadingSkeleton";
import { useCompetitionDetails } from "@/hooks/useCompetitionDetails";
import { useCompetitionScorers } from "@/hooks/useCompetitionScorers";
import { useCompetitionStandings } from "@/hooks/useCompetitionStandings";
import { useCompetitionMatches } from "@/hooks/useCompetitionMatches";

export default function CompetitionPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params); // Unwrap the params using the `use` hook

  const scorers = useCompetitionScorers(code);
  const matches = useCompetitionMatches(code);
  //console.log("here", matches);
  //console.log("here2", matches.data);
  //console.log("here3", matches.data.matches);
  //console.log("here4", matches.data.data);

  const { data, isLoading, error } = useCompetitionDetails(code);
  const {
    data: standings,
    isLoading: standingsLoading,
    error: standingsError,
  } = useCompetitionStandings(code);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <CompetitionDetails
      data={data}
      isLoading={isLoading}
      error={error}
      standings={standings}
      standingsLoading={standingsLoading}
      standingsError={standingsError}
      scorers={scorers}
      matches={matches.data}
      matchesLoading={matches.isLoading}
    />
  );
}
