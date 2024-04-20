import { deleteUser } from "@/app/_controllers/usersController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }) {
  await deleteUser(Number(params.id));
  return successResponse();
}
