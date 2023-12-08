"use client";
import { auth } from "@/app/_firebase/client";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import React, { useEffect, useState } from "react";

function page() {
  const [email, setEmail] = useState(
    window.localStorage.getItem("emailForSignIn") || ""
  );
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    // Get the saved email
    const saved_email = window.localStorage.getItem("emailForSignIn");

    // Verify the user went through an email link and the saved email is not null
    if (isSignInWithEmailLink(auth, window.location.href) && !!saved_email) {
      // Sign the user in
      signInWithEmailLink(auth, saved_email, window.location.href);
    }
  }, []);
  const trySignIn = async () => {
    // If the user is re-entering their email address but already has a code
    if (isSignInWithEmailLink(auth, window.location.href) && !!email) {
      // Sign the user in
      signInWithEmailLink(auth, email, window.location.href).catch((err) => {
        switch (err.code) {
          default:
            console.log("====================================");
            console.log("Error", err);
            console.log("====================================");
        }
      });
    } else {
      sendSignInLinkToEmail(auth, email, {
        url: "http://localhost:1234/signin",
        handleCodeInApp: true,
      })
        .then(() => {
          // Save the users email to verify it after they access their email
          window.localStorage.setItem("emailForSignIn", email);
        })
        .catch((err) => {
          switch (err.code) {
            default:
              console.log("====================================");
              console.log("Error", err);
              console.log("====================================");
          }
        });
    }
  };
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="h-[5rem] w-full"></div>
      <span>Email:</span>
      <input
        type="text"
        className="text-black"
        value={email}
        onChange={updateEmail}
      />
      <button onClick={trySignIn}>Sign in</button>
    </div>
  );
}

export default page;
