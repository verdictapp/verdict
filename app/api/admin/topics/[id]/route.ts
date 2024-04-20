import { showTopic } from "@/app/_controllers/topicsController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// deletes a topic
export async function GET(request: NextRequest, { params }) {
  let result = await showTopic(Number(params.id));
  return successResponse(result.returned);
}
