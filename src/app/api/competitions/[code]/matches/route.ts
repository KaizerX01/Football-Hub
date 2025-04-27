import { apiClient } from "@/lib/ApiClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  const { code } = await params;
  try {
    const response = await apiClient.get(`/competitions/${code}/matches/?status=SCHEDULED`);
    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch competition up comming matches " },
      { status: 500 }
    );
  }
}
