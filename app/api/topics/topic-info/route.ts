import { createTopicInfo } from "@/app/_controllers/topicsController";
import { NextRequest } from "next/server";

// create topic info
export async function POST(request: NextRequest, { params }) {
  let body = await request.json();
  await createTopicInfo(params.id, body.data);
}
