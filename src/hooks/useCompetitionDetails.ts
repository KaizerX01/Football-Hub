import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";



export const useCompetitionDetails = (code :string) =>{
    return useQuery({
        queryKey:['competitions' ,code],
        queryFn:async () =>{
          const res = await localApiClient.get(`/competitions/${code}`);
          console.log(res.data)
          return res.data
        },
        staleTime:1000*60*60*12,
        gcTime:1000*60*60*24,
        enabled: !!code,
    })
}