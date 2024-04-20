import { updateTagPriority } from "@/app/_controllers/tagsController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  await updateTagPriority(Number(params.id), body.priority);
  return successResponse();
}
