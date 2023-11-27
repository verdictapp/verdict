import { NextRequest } from "next/server";
import { showTopics } from "@/app/_controllers/topicsController";
import { successResponse } from "@/app/_lib/responseGenerator";

// get all topics
export async function GET(request: NextRequest) {
  let result = await showTopics(
    request.nextUrl.searchParams.get("state"),
    request.nextUrl.searchParams.get("tag") || undefined,
    request.nextUrl.searchParams.get("search"),
    request.nextUrl.searchParams.get("code") || undefined,
    JSON.parse(request.headers.get("user")).id
  );
  return successResponse(result.returned);
}
