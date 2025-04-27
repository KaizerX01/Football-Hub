import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";

export const useCompetitionMatches = (code: string) => {
  return useQuery({
    queryKey: ["competitions", code, "matches"],
    queryFn: async () => {
      const res = await localApiClient.get(`/competitions/${code}/matches`);
      //console.log("here" ,res);
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    enabled: !!code,
  });
};
