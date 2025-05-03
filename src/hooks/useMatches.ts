
import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";

export const useMatches = () => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const res = await localApiClient.get('/matches');
      //console.log('res here',res.data);
      return res.data; 
    },
    staleTime :60*3*1000,
    gcTime:60*5*1000,

  } 
);
};