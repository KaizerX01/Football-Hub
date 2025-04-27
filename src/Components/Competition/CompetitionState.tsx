import React from "react";
import { Calendar, Trophy, Timer, Users } from "lucide-react";
import { LoadingSkeleton } from "./LoadingSkeleton";

interface CompetitionStatsProps {
  data: any;
  isLoading: boolean;
  isError: boolean;
}

export function CompetitionStats({
  data,
  isLoading,
  isError,
}: CompetitionStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <LoadingSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-500 py-12">
        Failed to load competition stats.
      </div>
    );
  }

  const stats = [
    {
      icon: Calendar,
      label: "Current Season",
      value: data.currentSeason
        ? `${new Date(data.currentSeason.startDate).getFullYear()} - ${new Date(
            data.currentSeason.endDate
          ).getFullYear()}`
        : "Not available",
    },
    {
      icon: Trophy,
      label: "Current Champion",
      value: data.currentSeason?.winner?.name || "To be decided",
    },
    {
      icon: Timer,
      label: "Current Matchday",
      value: data.currentSeason?.currentMatchday
        ? `Matchday ${data.currentSeason.currentMatchday}`
        : "Not started",
    },
    {
      icon: Users,
      label: "Total Seasons",
      value: data.seasons.length || "Unknown", // Example: maybe you store this somewhere else
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="font-semibold mt-1">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
