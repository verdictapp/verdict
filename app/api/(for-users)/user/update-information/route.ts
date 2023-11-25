import { updateInformation } from "@/app/_controllers/usersController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  let user = JSON.parse(request.headers.get("user"));
  let body = await request.json();
  await updateInformation(user.id, {
    gender: body.gender,
    dateOfBirth: body.dateOfBirth,
    location: body.location,
  });
  return successResponse();
}
