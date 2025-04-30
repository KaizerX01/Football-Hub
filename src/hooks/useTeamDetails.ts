import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";



export const useTeamDetails = (id :string) =>{
    return useQuery({
        queryKey:['teams' ,id],
        queryFn:async () =>{
          const res = await localApiClient.get(`/teams/${id}`);
          return res.data;
        },
        staleTime:1000*60*60*12,
        gcTime:1000*60*60*24,
        enabled: !!id,
    })
}