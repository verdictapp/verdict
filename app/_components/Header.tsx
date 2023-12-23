"use client";

import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { UserMenu } from "./UserMenu";
import { Separator } from "@/components/ui/separator";
import logo from "../../assets/logo.png";
import { useRouter } from "next/navigation";
import { AuthModal } from "./modals/auth-modal";
import { Button } from "@/components/ui/button";

const Header = () => {
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMethod, setAuthMethod] = useState("login");
  const isLoggedIn = false;
  return (
    <>
      <nav className="w-full px-1 md:px-3 py-2 border-b md:border-0 flex justify-between bg-primary-foreground fixed z-10">
        <div className="w-1/4 flex items-center">
          <img
            className="mx-1 md:mx-3 w-14 cursor-pointer"
            alt="logo"
            src={logo.src}
            onClick={() => router.push("/")}
          />
          <Input
            type="search"
            placeholder="search verdict..."
            className="w-80 rounded-full"
          />
        </div>
        <div className="px-2 md:px-5 flex items-center">
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <div className="space-x-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setAuthMethod("login");
                  setIsAuthOpen(true);
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setAuthMethod("signup");
                  setIsAuthOpen(true);
                }}
              >
                Join Us
              </Button>
            </div>
          )}
        </div>
      </nav>
      <Separator />
      <AuthModal
        isOpen={isAuthOpen}
        setIsOpen={setIsAuthOpen}
        tab={authMethod}
      />
    </>
  );
};

export default Header;
