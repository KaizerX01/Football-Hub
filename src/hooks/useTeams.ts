import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";

interface UseTeamsOptions {
  limit?: number;
  offset?: number;
  search?: string;
}

export const useTeams = ({
  limit = 20,
  offset = 0,
  search = "",
}: UseTeamsOptions) => {
  return useQuery({
    queryKey: ["teams", limit, offset, search],
    queryFn: async () => {
      const res = await localApiClient.get(
        `/teams?limit=${limit}&offset=${offset}&search=${search}`
      );
      return res.data;
    },
    staleTime: 60 * 60 * 1000,
    gcTime: 60 * 60 * 24 * 1000,
  });
};
