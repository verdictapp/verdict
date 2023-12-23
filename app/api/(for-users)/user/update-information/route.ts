import { updateInformation } from "@/app/_controllers/usersController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  let userId = Number(request.headers.get("userId"));
  let body = await request.json();
  await updateInformation(userId, {
    gender: body.gender,
    dateOfBirth: body.dateOfBirth,
    location: body.location,
  });
  return successResponse();
}
