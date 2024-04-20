"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { UpdateAccountInfoModal } from "./modals/update-account-info-modal";
import { useState } from "react";
import { UpdatePersonalInfoModal } from "./modals/update-personal-info-modal";
import { UpdatePasswordModal } from "./modals/update-password-modal";
import { useStore } from "../store";
import api from "../_lib/api";

export function UserMenu() {
  const [isUpdateAccountInfo, setIsUpdateAccountInfo] = useState(false);
  const [isUpdatePersonalInfo, setIsUpdatePersonalInfo] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);

  const handleLogout = async () => {
    //logout
    const result = await api.post("/logout");
    if (result.data.success) {
      useStore.setState({
        isLoggedIn: false,
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <span className="hidden md:inline-block">@username</span>{" "}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => setIsUpdateAccountInfo((old) => !old)}
            >
              Update Account Info
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsUpdatePersonalInfo((old) => !old)}
            >
              Optional Personal Info
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsUpdatePassword((old) => !old)}
            >
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem>Verify Account</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLogout()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateAccountInfoModal
        isOpen={isUpdateAccountInfo}
        setIsOpen={setIsUpdateAccountInfo}
      />
      <UpdatePersonalInfoModal
        isOpen={isUpdatePersonalInfo}
        setIsOpen={setIsUpdatePersonalInfo}
      />
      <UpdatePasswordModal
        isOpen={isUpdatePassword}
        setIsOpen={setIsUpdatePassword}
      />
    </>
  );
}
