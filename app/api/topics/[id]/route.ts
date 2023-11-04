import {
  destroyTopic,
  showTopicTimedStats,
  updateTopic,
} from "@/app/_controllers/topicsController";
import { NextRequest } from "next/server";

// fetches a single topic from the database
export async function GET(request: NextRequest, { params }) {
  let result = await showTopicTimedStats(Number(params.id));
  return new Response(JSON.stringify(result));
}

// deletes a topic
export async function DELETE(request: NextRequest, { params }) {
  await destroyTopic(Number(params.id));
  return new Response("OK");
}

// updates a topic
export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  await updateTopic(
    Number(params.id),
    body.title,
    body.description,
    body.image,
    body.state
  );
}
