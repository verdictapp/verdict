import { showTopicTimedStats } from "@/app/_controllers/topicsController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// fetches a single topic from the database only (timed stats and stats)
export async function GET(request: NextRequest, { params }) {
  let result = await showTopicTimedStats(Number(params.id));
  if (!result.success) return errorResponse(result.errorCode);
  return successResponse(result.returned);
}
