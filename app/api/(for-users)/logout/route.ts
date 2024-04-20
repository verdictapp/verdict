import { successLogoutResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return successLogoutResponse();
}
