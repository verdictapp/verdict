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

export function AuthModal({ isOpen, setIsOpen }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};
  const handleSignup = () => {};
  const handleGoogleLogin = () => {};

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/* <DialogTitle>{authMethod === 0 ? "Login" : "Signup"}</DialogTitle>*/}
          <DialogDescription>
            Login or Signup with your social account to be a verified user. It's
            Free
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder={`username`}
                  className="col-span-3"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
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
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder={`username`}
                  className="col-span-3"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
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
