import { apiClient } from "@/lib/ApiClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await apiClient.get("/competitions");
    const data = response.data.competitions;
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch competitions" },
      { status: 500 }
    );
  }
}
