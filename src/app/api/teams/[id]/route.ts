import { apiClient } from "@/lib/ApiClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {

    const response = await apiClient.get(`/teams/${id}`);
    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch team details" },
      { status: 500 }
    );
  }
}