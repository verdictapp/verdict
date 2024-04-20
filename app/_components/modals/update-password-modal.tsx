"use client";

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
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export function UpdatePasswordModal({ isOpen, setIsOpen }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [arePasswordsAMatch, setArePasswordsAMatch] = useState(true);

  const handleSave = async () => {
    if (newPassword !== newPasswordConfirmation) {
      setArePasswordsAMatch(false);
      return;
    }
    setArePasswordsAMatch(true);
    // submit changes
    let result = await api.put("/user/update-password", {
      oldPassword: currentPassword,
      newPassword: newPassword,
    });
    if (!result.data.success) {
      // current password is not correct
      console.error(`errorCode(${result.data.errorCode})`);
      return;
    }
    setIsOpen(false);
    toast({
      title: "Success!",
      description: "Your password has been updated successfully",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Change your password here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="current-password" className="text-right">
              Current Password
            </Label>
            <Input
              id="current-password"
              placeholder="●●●●●●●●●●"
              className="col-span-3"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-password" className="text-right">
              New Password
            </Label>
            <Input
              id="new-password"
              placeholder="●●●●●●●●●●"
              className="col-span-3"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirm-new-password" className="text-right">
              Confirm New Password
            </Label>
            <Input
              id="confirm-new-password"
              placeholder="●●●●●●●●●●"
              className="col-span-3"
              type="password"
              value={newPasswordConfirmation}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
            />
          </div>
          {!arePasswordsAMatch && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right"></Label>
              <span className="text-red-500 font-base text-xs col-span-3">
                Password Mismatch.
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
