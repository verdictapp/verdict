import { NextRequest } from "next/server";
import { showTopics, storeTopic } from "@/app/_controllers/topicsController";
import { successResponse } from "@/app/_lib/responseGenerator";

// get all topics
export async function GET(request: NextRequest) {
  let result = await showTopics(
    request.nextUrl.searchParams.get("state"),
    request.nextUrl.searchParams.get("tag"),
    request.nextUrl.searchParams.get("search") || "",
    request.nextUrl.searchParams.get("code")
  );
  return successResponse(result.returned);
}
