import { createVerifiedUser } from "@/app/_controllers/usersController";
import { firebaseAuth } from "@/app/_lib/authProviders";
import {
  errorResponse,
  successLoginResponse,
} from "@/app/_lib/responseGenerator";

import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  let authResult = await firebaseAuth(body.uid);
  if (!authResult.success) return errorResponse(authResult.errorCode);

  let result = await createVerifiedUser(
    authResult.returned.email,
    body.shouldLogin || true
  );
  if (!result.success) return errorResponse(result.errorCode);

  return successLoginResponse(result.returned);

  // switch (body.provider.toLowerCase()) {
  //   case "google": {
  //     let authResult = await googleAuth(body.token);
  //     // uncontrolled error
  //     if (!authResult)
  //       return new Response(
  //         "Error in fetching please check googleAuth function in authProviders.ts",
  //         {
  //           status: 500,
  //         }
  //       );
  //     // controlled error
  //     if (!authResult.success) return errorResponse(authResult.errorCode);

  //     let result = await createVerifiedUser(authResult.returned.email);
  //     if (!result.success) return errorResponse(result.errorCode);

  //     return successResponse(result.returned);
  //   }

  //   case "email": {
  //     let user = await adminAuth.getUser(body.uid);
  //     user.email;
  //   }
  //   default:
  //     return errorResponse(errors.auth_provider_not_implemented);
  // }
}
