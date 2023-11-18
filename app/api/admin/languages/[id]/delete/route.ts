import { deleteLanguage } from "@/app/_controllers/languagesController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }) {
  await deleteLanguage(Number(params.id));
  return successResponse();
}
