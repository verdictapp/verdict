import { updateTopicInfo } from "@/app/_controllers/topicsController";
import { NextRequest } from "next/server";

// updates a topic info
export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  await updateTopicInfo(
    Number(params.topicInfoId),
    body.title,
    body.description,
    body.options
  );
}
