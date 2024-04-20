import { deleteTag } from "@/app/_controllers/tagsController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }) {
  await deleteTag(Number(params.id));
  return successResponse();
}
