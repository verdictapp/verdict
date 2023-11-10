import {
  getLanguages,
  storeLanguage,
} from "@/app/_controllers/languagesController";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify(await getLanguages()));
}
export async function POST(request: NextRequest) {
  let body = await request.json();
  await storeLanguage(body.language, body.code);
  return new Response("OK");
}
