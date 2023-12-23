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

export function TopicInfoModal({
  isOpen,
  setIsOpen,
  langID,
  language,
  options,
  handleSave,
}) {
  const [authMethod, setAuthMethod] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{authMethod === 0 ? "Login" : "Signup"}</DialogTitle>
          <DialogDescription>
            {authMethod === 0 ? "Login" : "Signup"} to be able to vote and
            unlock all features. It's Free.
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => handleSave(langID, username, password, options)}
          >
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
