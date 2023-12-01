"use client";

import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { UserMenu } from "./UserMenu";
import { Separator } from "@/components/ui/separator";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <>
      <nav className="w-full px-3 py-2 border-b md:border-0 flex justify-between bg-primary-foreground fixed z-10">
        <div className="w-1/4 flex items-center">
          <img className="mx-3 w-14" alt="logo" src={logo.src} />
          <Input
            type="search"
            placeholder="search verdict..."
            className="w-80 rounded-full"
          />
        </div>
        <div className="px-5 flex items-center">
          <UserMenu />
        </div>
      </nav>
      <Separator />
    </>
  );
};

export default Header;
