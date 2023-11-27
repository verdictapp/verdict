import { unlinkTagTopic } from "@/app/_controllers/taggedController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }) {
  await unlinkTagTopic(Number(params.id));
  return successResponse();
}
