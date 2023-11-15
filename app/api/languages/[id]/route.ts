import {
  deleteLanguage,
  updateLanguage,
} from "@/app/_controllers/languagesController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  await updateLanguage(Number(params.id), body.language, body.code);
  return successResponse();
}
export async function DELETE(request: NextRequest, { params }) {
  await deleteLanguage(Number(params.id));
  return successResponse();
}
