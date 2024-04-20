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
    new URLSearchParams(window.location.search).get("email") || ""
  );
  const [token, setToken] = useState("");

  const handleBackend = async (type, uid) => {
    switch (type) {
      case "signUp":
        await fetch("http://localhost:3000/api/auth/signup/verified", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: uid,
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
            uid: uid,
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
            uid: uid,
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
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleReturnFromEmail = async () => {
    // Get the saved email
    const saved_email = new URLSearchParams(window.location.search).get(
      "email"
    );
    const type = new URLSearchParams(window.location.search).get("type");

    // Verify the user went through an email link and the saved email is not null
    if (isSignInWithEmailLink(auth, window.location.href) && !!saved_email) {
      // Sign the user in
      try {
        let userInfo = await signInWithEmailLink(
          auth,
          saved_email,
          window.location.href
        );
        await handleBackend(type, userInfo.user.uid);
      } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      }
    }
  };
  useEffect(() => {
    handleReturnFromEmail();
  }, []);
  useEffect(() => {
    console.log("====================================");
    console.log(new URLSearchParams(window.location.search).get("email"));
    console.log("====================================");
  }, []);
  const trySignIn = async (type) => {
    // If the user is re-entering their email address but already has a code
    if (isSignInWithEmailLink(auth, window.location.href) && !!email) {
      // Sign the user in
      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          await handleBackend(type, result.user.uid);
        })
        .catch((err) => {
          switch (err.code) {
            default:
              console.log("====================================");
              console.log("Error", err);
              console.log("====================================");
          }
        });
    } else {
      sendSignInLinkToEmail(auth, email, {
        url: `http://localhost:3000/social/signup?email=${email}&type=${type}`,
        handleCodeInApp: true,
      })
        .then(() => {
          // Save the users email to verify it after they access their email
          // window.localStorage.setItem("emailForSignIn", email);
          // window.localStorage.setItem("type", email);
          console.log("====================================");
          console.log("Email Sent!");
          console.log("====================================");
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
        className="text-black p-2 w-[50ch]"
        value={email}
        onChange={updateEmail}
      />
      <button onClick={() => trySignIn("signUp")}>Sign in</button>
      <button onClick={() => trySignIn("login")}>login in</button>
      <button onClick={() => trySignIn("verify")}>verify</button>
    </div>
  );
}

export default page;
