import { updateTagInfo } from "@/app/_controllers/tagInfoController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// updates a topic info
export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  await updateTagInfo(Number(params.id), body.name);
  return successResponse();
}
