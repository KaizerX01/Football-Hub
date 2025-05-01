import { apiClient } from "@/lib/ApiClient";
import { NextResponse } from "next/server";


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const { id } = await params;
try {

    const response = await apiClient.get(`/persons/${id}/matches`);
    const data = response.data;
    console.log('matches',data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch the player matches" },
      { status: 500 }
    );
  }

  }