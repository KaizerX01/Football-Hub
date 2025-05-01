import React from "react";
import {
  CalendarDays,
  CalendarX,
  Flag,
  Shirt,
  UserPen,
  Users,
} from "lucide-react";

interface PlayerProfileProps {
  player: {
    name: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    position: string;
    shirtNumber: number;
    currentTeam: {
      name: string;
      shortName: string;
      crest: string;
      contract?: {
        start?: string;
        until?: string;
      };
    };
  };
}

export function PlayerProfile({ player }: PlayerProfileProps) {
  if (!player) {
    return <div>Loading player data...</div>;
  }

  const formattedBirthDate = new Date(player.dateOfBirth).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 text-black">
      <div className="bg-blue-600 h-32 md:h-48"></div>
      <div className="px-6 py-12 md:px-8 md:flex">
        <div className="md:w-1/3 flex justify-center md:justify-start">
          <div className="w-48 h-48 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden -mt-24 md:-mt-32">
            <img
              src={player.currentTeam.crest}
              alt={player.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:w-2/3 mt-6 md:mt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {player.name || "Unknown Player"}
              </h1>
              <p className="text-lg text-gray-500">
                {player.currentTeam?.name || "No team info"}
              </p>
            </div>
            <div className="bg-blue-600 text-white text-4xl font-bold w-16 h-16 rounded-full flex items-center justify-center">
              {player.shirtNumber ?? "?"}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="flex items-center">
              <Shirt className="w-5 h-5 mr-3 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Position</p>
                <p className="font-medium">{player.position || "Unknown"}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Flag className="w-5 h-5 mr-3 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Nationality</p>
                <p className="font-medium">{player.nationality || "Unknown"}</p>
              </div>
            </div>
            <div className="flex items-center">
              <CalendarDays className="w-5 h-5 mr-3 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">
                  {formattedBirthDate} ({calculateAge(player.dateOfBirth)}{" "}
                  years)
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-3 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Team</p>
                <p className="font-medium">
                  {player.currentTeam?.name || "Not available"}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <UserPen className="w-5 h-5 mr-3 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Contract start Date</p>
                <p className="font-medium">
                  {player.currentTeam?.contract?.start || "Not available"}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <CalendarX className="w-5 h-5 mr-3 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Contract finish Date</p>
                <p className="font-medium">
                  {player.currentTeam?.contract?.until || "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
