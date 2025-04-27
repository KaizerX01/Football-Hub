
import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";

export const useCompetitions = () => {
  return useQuery({
    queryKey: ['competitions'],
    queryFn: async () => {
      const res = await localApiClient.get('/competitions');
      console.log(res.data);
      return res.data; 
    },
    staleTime :60*60*1000,
    gcTime:60*60*24*1000,

  } 
);
};