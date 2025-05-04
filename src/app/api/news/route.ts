// app/api/news/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

const NEWS_API_URL = "https://newsdata.io/api/1/latest";
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY; 

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "football";

  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        apikey: API_KEY,
        q: query,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("News API error:", error.message);
    return new NextResponse("Error fetching news", { status: 500 });
  }
}
