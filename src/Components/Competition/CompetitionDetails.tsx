"use client";
import { Calendar, Trophy, Users } from "lucide-react";
import { CompetitionHero } from "./CompetitionHero";
import { CompetitionStats } from "./CompetitionState";
import { CompetitionTable } from "./CompetitionTable";
import Link from "next/link";

interface CompetitionDetailsProps {
  data: any;
  isLoading: boolean;
  error: any;
  standings: any;
  standingsLoading: boolean;
  standingsError: any;
  scorers: any;
  matches: any;
  matchesLoading: any;
}

export function CompetitionDetails({
  data,
  isLoading,
  error,
  standings,
  standingsLoading,
  standingsError,
  scorers,
  matches,
  matchesLoading,
}: CompetitionDetailsProps) {
  //console.log("Top Scorers:", scorers?.data?.scorers);
  //console.log("Matches", matches?.data?.data?.matches);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <CompetitionHero data={data} isLoading={isLoading} isError={error} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <CompetitionStats data={data} isLoading={isLoading} isError={error} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Table */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                League Table
              </h2>
              <CompetitionTable
                standings={standings}
                isLoading={standingsLoading}
                isError={standingsError}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top Scorers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Top Scorers
              </h2>

              {scorers.isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg animate-pulse"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-blue-600">#</span>
                        <div>
                          <p className="font-medium text-gray-400">
                            Loading...
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Loading...
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-400">
                        Loading...
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {scorers?.data?.scorers
                    .slice(0, 5)
                    .map((scorer: any, index: number) => (
                      <div
                        key={scorer?.player.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-blue-600">
                            {index + 1}
                          </span>
                          <div>
                            <Link href={`/players/${scorer.player.id}`}>
                              <p className="font-medium">
                                {scorer.player.name}
                              </p>
                            </Link>
                            <Link href={`/teams/${scorer.team.id}`}>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {scorer.team.name}
                              </p>
                            </Link>
                          </div>
                        </div>
                        <span className="font-bold">{scorer.goals} goals</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Fixtures */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Upcoming Fixtures
              </h2>

              {matchesLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg animate-pulse"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-blue-600">#</span>
                        <div>
                          <p className="font-medium text-gray-400">
                            Loading...
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Loading...
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-400">
                        Loading...
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {matches.matches
                    ?.slice(0, 5)
                    .map((match: any, index: number) => (
                      <div
                        key={match?.id}
                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {match.utcDate}
                        </div>
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/teams/${match.homeTeam.id}`}
                            className="flex items-center space-x-2"
                          >
                            <img
                              src={match.homeTeam.crest}
                              alt={`${match.homeTeam.name} logo`}
                              className="w-6 h-6 object-contain"
                            />
                            <span className="font-medium">
                              {match.homeTeam.name}
                            </span>
                          </Link>

                          <span className="text-sm px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                            vs
                          </span>

                          <Link
                            href={`/teams/${match.awayTeam.id}`}
                            className="flex items-center space-x-2"
                          >
                            <img
                              src={match.awayTeam.crest}
                              alt={`${match.awayTeam.name} logo`}
                              className="w-6 h-6 object-contain"
                            />
                            <span className="font-medium">
                              {match.awayTeam.name}
                            </span>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
