import { verifyUser } from "@/app/_controllers/usersController";
import { errors } from "@/app/_enums/enums";
import { googleAuth } from "@/app/_lib/authProviders";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  switch (body.provider.toLowerCase()) {
    case "google": {
      let authResult = await googleAuth(body.token);
      // uncontrolled error
      if (!authResult)
        return new Response(
          "Error in fetching please check googleAuth function in authProviders.ts",
          {
            status: 500,
          }
        );
      // controlled error
      if (!authResult.success) return errorResponse(authResult.errorCode);

      let result = await verifyUser(
        JSON.parse(request.headers.get("user")).id,
        authResult.returned.email
      );
      if (!result.success) return errorResponse(result.errorCode);

      return successResponse(result.returned);
    }
    default:
      return errorResponse(errors.auth_provider_not_implemented);
  }
}
