import { unlinkTagTopic } from "@/app/_controllers/taggedController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  await unlinkTagTopic(body.taggedIds);
  return successResponse();
}
