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
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export function UpdatePasswordModal({ isOpen, setIsOpen }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordConfirmation, setnewPasswordConfirmation] = useState("");
  const [arePasswordsAMatch, setArePasswordsAMatch] = useState(true);

  const handleSave = () => {
    if (newPassword !== newPasswordConfirmation) {
      setArePasswordsAMatch(false);
      return;
    }
    // submit changes

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
              onChange={(e) => setnewPassword(e.target.value)}
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
              onChange={(e) => setnewPasswordConfirmation(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
