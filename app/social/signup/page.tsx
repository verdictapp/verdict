"use client";
import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../firebase/client";
function SignUpSocial() {
  const handleGoogleLogin = async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log('====================================');
        console.log("credentials", credential);
        console.log("token", token);
        console.log("user", user);
        console.log('====================================');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="h-[5rem] w-full"></div>
      <div className="p-2 bg-white text-black w-fit rounded-sm m-2 cursor-pointer" onClick={()=>handleGoogleLogin()}>SignUpSocial</div>
    </div>
  );
}

export default SignUpSocial;
