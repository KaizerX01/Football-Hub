import { apiClient } from "@/lib/ApiClient";
import { NextRequest, NextResponse } from "next/server";

// Using the Promise wrapper for params as suggested
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  // Await the params promise to get the actual values
  const { code } = await params;
  
  try {
    // Fetch matches from the API
    const response = await apiClient.get(`/competitions/${code}/matches/?status=SCHEDULED`);
   
    // Return data as a JSON response
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching competition matches:", error);
    return NextResponse.json(
      { message: "Failed to fetch competition upcoming matches" },
      { status: 500 }
    );
  }
}