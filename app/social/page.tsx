"use client";
import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../_firebase/client";
function SignUpSocial() {
  const [token, setToken] = useState("");
  const handleGoogleLogin = async (type: string) => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const idToken = credential.idToken + "a";
        switch (type) {
          case "signUp":
            await fetch("http://localhost:3000/api/auth/signup/verified", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: idToken,
                provider: "google",
              }),
            }).then(async (result) => {
              let body = await result.json();
              console.log("====================================");
              console.log("signUp result: ", body);
              console.log("====================================");
              setToken(body.result.token);
            });
            break;
          case "login":
            await fetch("http://localhost:3000/api/auth/login/social", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: idToken,
                provider: "google",
              }),
            }).then(async (result) => {
              let body = await result.json();
              console.log("====================================");
              console.log("login result: ", body);
              console.log("====================================");
              setToken(body.result.token);
            });
            break;
          case "verify":
            await fetch("http://localhost:3000/api/user/verify", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: "bearer " + token,
              },
              body: JSON.stringify({
                token: idToken,
                provider: "google",
              }),
            }).then(async (result) => {
              let body = await result.json();
              console.log("====================================");
              console.log("verify result: ", body);
              console.log("====================================");
            });
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("====================================");
        console.log("auth Error", error);
        console.log("====================================");
      });
  };
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="h-[5rem] w-full"></div>
      <div
        className="p-2 bg-white text-black w-fit rounded-sm m-2 cursor-pointer"
        onClick={() => handleGoogleLogin("signUp")}
      >
        Sign up with Google
      </div>
      <div
        className="p-2 bg-white text-black w-fit rounded-sm m-2 cursor-pointer"
        onClick={() => handleGoogleLogin("login")}
      >
        Login with Google
      </div>
      <div
        className="p-2 bg-white text-black w-fit rounded-sm m-2 cursor-pointer"
        onClick={() => handleGoogleLogin("verify")}
      >
        Verify with Google
      </div>
    </div>
  );
}

export default SignUpSocial;
