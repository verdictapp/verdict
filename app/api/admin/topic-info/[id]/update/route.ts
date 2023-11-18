import { updateTopicInfo } from "@/app/_controllers/topicInfoController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// updates a topic info
export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  await updateTopicInfo(
    Number(params.id),
    body.title,
    body.description,
    body.options
  );
  return successResponse();
}
