import { errors } from "../_enums/enums";
import { adminAuth } from "../_firebase/admin";
import { errorReturn, successReturn } from "./controllerReturnGenerator";

// export async function googleAuth(token: string) {
//   let res;
//   await fetch(
//     `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
//   )
//     .then(async (result) => {
//       let body = await result.json();
//       if (body.error_description === "Invalid Value") {
//         res = errorReturn(errors.invalid_firebase_user_uid);
//       } else {
//         res = successReturn({ email: body.email });
//       }
//     })
//     .catch((error) => {
//       console.log("====================================");
//       console.log("error", error);
//       console.log("====================================");
//     });
//   return res;
// }

export async function firebaseAuth(uid: string) {
  try {
    let userInFirebase = await adminAuth.getUser(uid);

    if (!userInFirebase.emailVerified)
      return errorReturn(errors.email_not_verified);

    return successReturn(userInFirebase);
  } catch (error) {
    if (error.errorInfo.code === "auth/user-not-found")
      return errorReturn(errors.invalid_firebase_user_uid);
    console.log("====================================");
    console.log("firebaseAuth Error: ", error);
    console.log("====================================");
  }
}
