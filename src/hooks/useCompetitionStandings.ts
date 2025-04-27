import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";

export const useCompetitionStandings = (code: string) => {
  return useQuery({
    queryKey: ['competitions', code, 'standings'],
    queryFn: async () => {
      const res = await localApiClient.get(`/competitions/${code}/standings`);
      console.log(res.data)
      return res.data;
    },
    staleTime:1000*60*10,
    gcTime:1000*60*30,
    enabled: !!code,
  })
}
