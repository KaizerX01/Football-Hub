"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { addFavoriteTeam } from "@/lib/FavoriteTeam";
import toast from "react-hot-toast";

const TeamCard = ({ club }: { club: any }) => {
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
    if (!userId) return toast.error("You must be logged in.");

    const result = await addFavoriteTeam(userId, club.id);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="relative">
      <Link href={`/teams/${club.id}`} className="block">
        <div className="bg-white text-black rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3"></div>
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <img
                src={club.crest}
                alt={`${club.name} logo`}
                className="h-24 w-24 object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-center mb-2">{club.name}</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600">Short name:</div>
              <div className="font-medium text-right">{club.tla}</div>
              <div className="text-gray-600">Founded:</div>
              <div className="font-medium text-right">{club.founded}</div>
              <div className="text-gray-600">Stadium:</div>
              <div className="font-medium text-right">{club.venue}</div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <div className="text-sm text-gray-500">in league</div>
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3 rounded-full transition">
                View Details
              </button>
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={handleAddFavorite}
        className="absolute top-2 right-2 bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded text-xs"
      >
        ⭐ Add to Favorites
      </button>
    </div>
  );
};

export default TeamCard;
