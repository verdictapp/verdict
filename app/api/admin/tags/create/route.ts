import { createTag } from "@/app/_controllers/tagsController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  await createTag(body.name, body.priority);
  return successResponse();
}
