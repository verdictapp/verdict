import { NextRequest } from "next/server";
import { storeTopic } from "@/app/_controllers/topicsController";
import { successResponse } from "@/app/_lib/responseGenerator";

// create a topic with an array of topics info
export async function POST(request: NextRequest) {
  let body = await request.json();
  await storeTopic(body.data, body.priority, body.image, body.state);
  return successResponse();
}

// .map((info) => {
//   return {
//     languageId: info.languageId,
//     title: info.title,
//     description: info.description,
//     options: info.options,
//   };
// })
