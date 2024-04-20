import { deleteTopicInfo } from "@/app/_controllers/topicInfoController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// deletes a topic info
export async function DELETE(request: NextRequest, { params }) {
  await deleteTopicInfo(Number(params.id));
  return successResponse();
}
