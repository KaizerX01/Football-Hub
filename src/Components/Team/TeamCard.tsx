import React from "react";
import Link from "next/link";

const TeamCard = (team: any) => {
  return (
    <Link href={`/teams/${team.club.id}`} className="block">
      <div className="bg-white  text-black border-r-emerald-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3"></div>
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <img
              src={team.club.crest}
              alt={`${team.club.name} logo`}
              className="h-24 w-24 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold text-center mb-2">
            {team.club.name}
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-600">Short name:</div>
            <div className="font-medium text-right">{team.club.tla}</div>
            <div className="text-gray-600">Founded:</div>
            <div className="font-medium text-right">{team.club.founded}</div>
            <div className="text-gray-600">Stadium:</div>
            <div className="font-medium text-right">{team.club.venue}</div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="text-sm">
              <span className="text-gray-500"> in league</span>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded-full transition">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default TeamCard;
