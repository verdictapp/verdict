import { errors } from "../_enums/enums";
import { errorReturn, successReturn } from "./controllerReturnGenerator";

export async function googleAuth(token: string) {
  let res;
  await fetch(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
  )
    .then(async (result) => {
      let body = await result.json();
      if (body.error_description === "Invalid Value") {
        res = errorReturn(errors.invalid_auth_provider_token);
      } else {
        res = successReturn({ email: body.email });
      }
    })
    .catch((error) => {
      console.log("====================================");
      console.log("error", error);
      console.log("====================================");
    });
  return res;
}
