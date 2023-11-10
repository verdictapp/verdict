import {
  deleteLanguage,
  updateLanguage,
} from "@/app/_controllers/languagesController";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  await updateLanguage(Number(params.id), body.language, body.code);
  return new Response("OK");
}
export async function DELETE(request: NextRequest, { params }) {
  await deleteLanguage(Number(params.id));
  return new Response("OK");
}
