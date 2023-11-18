import { updateTag } from "@/app/_controllers/tagsController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  await updateTag(Number(params.id), body.name, body.priority);
  return successResponse();
}
