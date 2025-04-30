import { apiClient } from "@/lib/ApiClient";
import { NextResponse } from "next/server";

export async function GET(request:Request) {

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "20";
  const offset = searchParams.get("offset") || "0";

  try {
    const response = await apiClient.get(`/teams?limit=${limit}&offset=${offset}`);
        const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}
