import { apiClient } from "@/lib/ApiClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {

    const response = await apiClient.get(`/teams/${id}/matches/?status=SCHEDULED`);
    const data = response.data;
    console.log('hii',data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch team matches" },
      { status: 500 }
    );
  }
}