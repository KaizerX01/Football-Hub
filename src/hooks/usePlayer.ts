import { localApiClient } from "@/lib/LocalApiClient";
import { useQuery } from "@tanstack/react-query";


export default function  usePlayer (id:string) {
    return useQuery({
        queryKey:['player',id],
        queryFn: async () =>{
            const res = await localApiClient.get(`/player/${id}`);
            console.log('useHook' ,res.data);
            return res.data;
        },
        staleTime :60*60*1000,
        gcTime:60*60*24*1000,
        }
    )
}