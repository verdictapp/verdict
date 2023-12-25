"use client";

import { errors } from "@/app/_enums/enums";
import api from "@/app/_lib/api";
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
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export function UpdateAccountInfoModal({ isOpen, setIsOpen }) {
  // fetch the username and assign it as the usernames' initial value
  const [username, setUsername] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  const handleSave = async () => {
    //check if the username is taken and if so set the isUsernameTaken state to true or else submit changes
    let result = await api.put("/user/update-username", {
      username,
    });
    if (!result.data.success) {
      if (result.data.errorCode === errors.username_taken) {
        setIsUsernameTaken(true);
        return;
      }
      console.error(`errorCode(${result.data.errorCode})`);
    }
    setIsUsernameTaken(false);
    setIsOpen(false);
    toast({
      title: "Success!",
      description: "Your username has been updated successfully",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your username here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              className="col-span-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {isUsernameTaken && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right"></Label>
              <span className="text-red-500 font-base text-xs col-span-3">
                Username already take, please try another one.
              </span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => handleSave()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
