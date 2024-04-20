import { updateTopicPriority } from "@/app/_controllers/topicsController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// updates a topic
export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  await updateTopicPriority(Number(params.id), body.priority);
  return successResponse();
}
