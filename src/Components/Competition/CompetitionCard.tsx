"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Trophy } from "lucide-react";

interface CompetitionCardProps {
  competition: {
    id: number;
    name: string;
    code: string;
    area: { name: string; flag?: string };
    emblem?: string | null;
    currentSeason?: {
      startDate: string;
      endDate: string;
    };
  };
}

export function CompetitionCard({ competition }: CompetitionCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/Competitions/${competition.code}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center">
        {competition.emblem ? (
          <img
            src={competition.emblem.replace(".pnq", ".png")} // Fix typo if needed
            alt={`${competition.name} logo`}
            className="w-16 h-16 object-contain bg-white rounded-full p-1"
          />
        ) : (
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <Trophy className="w-8 h-8 text-blue-600" />
          </div>
        )}
        <div className="ml-4 text-white">
          <h3 className="font-bold text-xl">{competition.name}</h3>
          <div className="flex items-center mt-1">
            {competition.area.flag && (
              <img
                src={competition.area.flag}
                alt={`${competition.area.name} flag`}
                className="w-5 h-5 mr-2 rounded-sm object-cover"
              />
            )}
            <span className="text-sm">{competition.area.name}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-sm text-gray-500 dark:text-gray-400">
            Competition Type
          </h4>
          {competition.currentSeason && (
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
              {new Date(competition.currentSeason.startDate).getFullYear()} -{" "}
              {new Date(competition.currentSeason.endDate).getFullYear()}
            </span>
          )}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <button className="w-full text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-800 dark:hover:text-blue-300">
            View Matches →
          </button>
        </div>
      </div>
    </div>
  );
}
