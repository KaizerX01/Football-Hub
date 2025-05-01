import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";


export default function  usePlayerMatches (id:string) {
    return useQuery({
        queryKey:['player',id,'matches'],
        queryFn: async () =>{
            const res = await localApiClient.get(`/player/${id}/matches`);
            console.log('usematchess' ,res.data);
            return res.data;
        },
        staleTime :60*60*1000,
        gcTime:60*60*24*1000,
        }
    )
}