import { apiClient } from "@/lib/ApiClient";
import { NextResponse } from "next/server";


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const { id } = await params;
try {

    const response = await apiClient.get(`/persons/${id}`);
    const data = response.data;
    console.log('Person',data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch the player" },
      { status: 500 }
    );
  }

  }