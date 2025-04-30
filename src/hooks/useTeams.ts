import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";

interface UseTeamsOptions {
  limit?: number;
  offset?: number;
}

export const useTeams = ({ limit = 20, offset = 0 }: UseTeamsOptions) => {
  return useQuery({
    queryKey: ['teams', limit, offset], 
    queryFn: async () => {
      const res = await localApiClient.get(`/teams?limit=${limit}&offset=${offset}`);
      return res.data;
    },
    staleTime: 60 * 60 * 1000, // 1h
    gcTime: 60 * 60 * 24 * 1000, // 24h
  });
};
