import { unlinkTagTopic } from "@/app/_controllers/taggedController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  let body = await request.json();
  await unlinkTagTopic(body.tagLinkIds);
  return successResponse();
}
