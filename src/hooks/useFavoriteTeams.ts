import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";

export const useFavoriteTeams = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["favorite-teams", userId],
    queryFn: async () => {
      if (!userId) return { teams: [] };
      const res = await localApiClient.get(`/favoriteTeams?user_id=${userId}`);
      return res.data;
    },
    enabled: !!userId,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 60 * 60 * 24 * 1000, // 24 hours
  });
};
