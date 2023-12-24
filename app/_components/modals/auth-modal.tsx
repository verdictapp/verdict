"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import google from "../../../assets/Google.webp";
import api from "@/app/_lib/api";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/_firebase/client";

export function AuthModal({ isOpen, setIsOpen, tab = "login" }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    let result = await api.post("/auth/login/local", {
      username,
      password,
    });

    if (!result.data.success) {
      console.error(`errorCode(${result.data.errorCode})`);
      return;
    }
    setIsOpen(false);
  };

  const handleSignup = async () => {
    let result = await api.post("/auth/signup/unverified", {
      username,
      password,
    });

    if (!result.data.success) {
      console.error(`errorCode(${result.data.errorCode})`);
      return;
    }
    setIsOpen(false);
  };
  const handleGoogleLogin = async () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (authResult) => {
        let result = await api.post("auth/login/social", {
          uid: authResult.user.uid,
        });
        if (!result.data.success) {
          console.error(`errorCode(${result.data.errorCode})`);
          return;
        }
        setIsOpen(false);
      })
      .catch((error) => {
        console.log("====================================");
        console.log("auth Error", error);
        console.log("====================================");
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>
            Login or Signup with your social account to be a verified user. It's
            Free
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={tab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="usernameL" className="text-right">
                  Username
                </Label>
                <Input
                  id="usernameL"
                  placeholder={`username`}
                  className="col-span-3"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="passwordL" className="text-right">
                  Password
                </Label>
                <Input
                  id="passwordL"
                  placeholder={`●●●●●●●●●●`}
                  className="col-span-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => handleLogin()}
            >
              Login
            </Button>
            <div className="w-full flex items-center justify-center my-4">
              <div className="h-0.5 bg-secondary w-full"></div>
              <span className="mx-3 text-sm">OR</span>
              <div className="h-0.5 bg-secondary w-full"></div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Button
                className="col-span-4"
                onClick={() => handleGoogleLogin()}
              >
                <img src={google.src} className="h-7" />
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="signup">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="usernameS" className="text-right">
                  Username
                </Label>
                <Input
                  id="usernameS"
                  placeholder={`username`}
                  className="col-span-3"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="passwordS" className="text-right">
                  Password
                </Label>
                <Input
                  id="passwordS"
                  placeholder={`●●●●●●●●●●`}
                  className="col-span-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => handleSignup()}
            >
              Signup
            </Button>
            <div className="w-full flex items-center justify-center my-4">
              <div className="h-0.5 bg-secondary w-full"></div>
              <span className="mx-3 text-sm">OR</span>
              <div className="h-0.5 bg-secondary w-full"></div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Button
                className="col-span-4"
                onClick={() => handleGoogleLogin()}
              >
                <img src={google.src} className="h-7" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
