import { addTagsToTopic } from "@/app/_controllers/taggedController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }) {
  let body = await request.json();
  await addTagsToTopic(Number(params.id), body.tags);
  return successResponse();
}
