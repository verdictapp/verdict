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
import { DatePicker } from "../date-picker";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import api from "@/app/_lib/api";

export function UpdatePersonalInfoModal({ isOpen, setIsOpen }) {
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("prefer-not-to-say");

  const handleSave = async () => {
    let genderValue = undefined;
    if (gender.toLowerCase() === "male") {
      genderValue = true;
    } else if (gender.toLowerCase() === "female") {
      genderValue = false;
    }
    let result = await api.put("/user/update-information", {
      gender: genderValue,
      dateOfBirth: dob === "" ? undefined : dob,
      location: location === "" ? undefined : location,
    });
    if (!result.data.success) {
      console.error(`errorCode${result.data.errorCode}`);
      return;
    }
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your personal info here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dob" className="text-right">
              Date Of Birth
            </Label>
            <DatePicker date={dob} setDate={setDob} className={"col-span-3"} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dob" className="text-right">
              Gender
            </Label>
            <RadioGroup
              onValueChange={(value) => setGender(value)}
              defaultValue="prefer-not-to-say"
              className="flex space-x-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="r1" />
                <Label htmlFor="r1">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="r2" />
                <Label htmlFor="r2">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="prefer-not-to-say" id="r3" />
                <Label htmlFor="r3">Prefer not to answer</Label>
              </div>
            </RadioGroup>
          </div>
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
