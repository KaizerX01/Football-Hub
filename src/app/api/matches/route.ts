import { apiClient } from "@/lib/ApiClient";
import { NextResponse } from "next/server";


export async function GET(){

    try {
        const response = await apiClient.get('/matches?status=LIVE');
            const data = response.data;
        return NextResponse.json(data);
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { message: "Failed to fetch matches" },
          { status: 500 }
        );
      }
    }
