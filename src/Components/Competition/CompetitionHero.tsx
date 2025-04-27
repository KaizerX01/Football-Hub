import React from "react";
import { MapPin, Calendar, Trophy } from "lucide-react";
import { LoadingSkeleton } from "./LoadingSkeleton";

interface CompetitionHeroProps {
  data: any;
  isLoading: boolean;
  isError: boolean;
}

export function CompetitionHero({
  data,
  isLoading,
  isError,
}: CompetitionHeroProps) {
  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <LoadingSkeleton />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container mx-auto py-12 text-center text-red-500">
        Failed to load competition data.
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-r from-white-400 to-gray-800 text-white">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20')] bg-cover bg-center" />
      <div className="relative container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={data.emblem}
            alt={`${data.name} emblem`}
            className="w-32 h-32 object-contain bg-white p-4 rounded-xl shadow-lg"
          />
          <div>
            <div className="flex items-center gap-3 text-blue-200 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{data.area?.name}</span>
              <span>•</span>
              <span className="px-2 py-1 bg-blue-400 text-xs rounded-full">
                {data.type}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-3">{data.name}</h1>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {data.currentSeason?.startDate?.split("-")[0]}-
                  {data.currentSeason?.endDate?.split("-")[0]}
                </span>
              </div>

              {data.currentSeason?.currentMatchday && (
                <div className="flex items-center gap-2">
                  <span>Matchday {data.currentSeason.currentMatchday}</span>
                </div>
              )}

              {data.currentSeason?.winner ? (
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  {data.currentSeason.winner.crest && (
                    <img
                      src={data.currentSeason.winner.crest}
                      alt={data.currentSeason.winner.name}
                      className="w-6 h-6 object-contain"
                    />
                  )}
                  <span>{data.currentSeason.winner.name}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span>Winner TBD</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
