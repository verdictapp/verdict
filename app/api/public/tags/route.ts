import { getTags } from "@/app/_controllers/tagsController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let result = await getTags(request.nextUrl.searchParams.get("search"));
  return successResponse(result);
}