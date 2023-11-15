import {
  destroyTopic,
  showTopicTimedStats,
  updateTopic,
} from "@/app/_controllers/topicsController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

// fetches a single topic from the database only (timed stats and stats)
export async function GET(request: NextRequest, { params }) {
  let result = await showTopicTimedStats(Number(params.id));
  return successResponse(result);
}

// deletes a topic
export async function DELETE(request: NextRequest, { params }) {
  await destroyTopic(Number(params.id));
  return successResponse();
}

// updates a topic
export async function PUT(request: NextRequest, { params }) {
  let body = await request.json();
  await updateTopic(Number(params.id), body.image, body.state);
  return successResponse();
}
