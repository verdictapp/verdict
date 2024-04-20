import { createTopicInfo } from "@/app/_controllers/topicInfoController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// create topic info in a specific language
export async function POST(request: NextRequest, { params }) {
  let body = await request.json();
  let result = await createTopicInfo(
    Number(params.id),
    body.languageId,
    body.title,
    body.description,
    body.options
  );
  if (!result.success) return errorResponse(result.errorCode);
  return successResponse();
}
