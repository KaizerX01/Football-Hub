import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";



export const useTeamMatches = (id :string) =>{
    return useQuery({
        queryKey:['teams' ,id,'matches'],
        queryFn:async () =>{
          const res = await localApiClient.get(`/teams/${id}/matches`);
          //console.log('HEREE',res.data)
          return res.data
        },
        staleTime:1000*60*60*12,
        gcTime:1000*60*60*24,
        enabled: !!id,
    })
}