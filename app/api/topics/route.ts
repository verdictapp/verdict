import { NextRequest } from "next/server";
import { showTopics, storeTopic } from "@/app/_controllers/topicsController";

export async function GET(request: NextRequest) {
  let result = await showTopics(
    request.nextUrl.searchParams.get("state"),
    request.nextUrl.searchParams.get("tag"),
    request.nextUrl.searchParams.get("search") || ""
  );
  return new Response(JSON.stringify(result));
}

export async function POST(request: NextRequest) {
  let body = await request.json();
  await storeTopic(
    body.data.map((info) => {
      return {
        languageId: info.languageId,
        title: info.title,
        description: info.description,
        options: info.options,
      };
    }),
    body.image,
    body.state
  );
  return new Response("OK");
}
