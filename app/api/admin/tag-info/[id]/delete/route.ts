import { deleteTagInfo } from "@/app/_controllers/tagInfoController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// deletes a topic info
export async function DELETE(request: NextRequest, { params }) {
  await deleteTagInfo(Number(params.id));
  return successResponse();
}
