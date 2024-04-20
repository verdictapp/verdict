import { updateTopicState } from "@/app/_controllers/topicsController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// updates a topic
export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  await updateTopicState(Number(params.id), body.state);
  return successResponse();
}
