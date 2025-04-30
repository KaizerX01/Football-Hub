import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";

export const useCompetitionScorers = (code: string) => {
  return useQuery({
    queryKey: ["competitions", code, "scorers"],
    queryFn: async () => {
      const res = await localApiClient.get(`/competitions/${code}/scorers`);
      //console.log(res.data);
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    enabled: !!code,
  });
};
