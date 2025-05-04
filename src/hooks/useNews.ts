// hooks/useNews.ts
import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";

export const useNews = (query: string = "football") => {
  return useQuery({
    queryKey: ['news', query],
    queryFn: async () => {
      const res = await localApiClient.get(`/news`, {
        params: { q: query },
      });
      console.log('news',res.data)
      return res.data;
    },
    staleTime: 5 * 60 * 1000, 
    gcTime: 8 * 60 * 1000,    
  });
};
