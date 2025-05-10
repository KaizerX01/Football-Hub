import { apiClient } from "@/lib/ApiClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await apiClient.get("/competitions");
    const competitions = response.data.competitions;

    // Filter out FIFA World Cup
    const filtered = competitions.filter(
      (comp: any) => comp.name !== "FIFA World Cup"
    );

    return NextResponse.json(filtered);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch competitions" },
      { status: 500 }
    );
  }
}
