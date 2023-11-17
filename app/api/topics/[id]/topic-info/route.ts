import { createTopicInfo } from "@/app/_controllers/topicInfoController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// create topic info in a specific language
export async function POST(request: NextRequest, { params }) {
  let body = await request.json();
  await createTopicInfo(
    Number(params.id),
    body.languageId,
    body.title,
    body.description,
    body.options
  );
  return successResponse();
}
