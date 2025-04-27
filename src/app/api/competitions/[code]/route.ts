import { apiClient } from "@/lib/ApiClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    // Note the fixed URL - should be /competitions/ not /competition
    const response = await apiClient.get(`/competitions/${params.code}`);
    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch competition details" },
      { status: 500 }
    );
  }
}