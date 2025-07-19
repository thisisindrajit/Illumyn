"use client"

import { Button } from "@/components/ui/button";
import { APP_NAME } from "../../../constants/common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopBar = () => {
  const pathname = usePathname();

  const showLoginOrUserButton = () => {
    switch (pathname) {
      case "/":
        return (
          <Link href="/login">
            <Button variant="outline" size="lg" className="px-4 py-2 border border-primary hover:text-background hover:bg-primary transition-colors text-sm animate-fade-in rounded-none">
              Login
            </Button>
          </Link>
        )
      case "/user/dashboard":
        return (
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )
      default:
        return null;
    }
  }

  return (
    <div className="w-full flex justify-between items-center">
      <Link href="/">
        <div className="text-sm uppercase tracking-widest border border-foreground/25 h-10 px-4 py-2 animate-fade-in">{APP_NAME}</div>
      </Link>
      {showLoginOrUserButton()}
    </div>
  );
};

export default TopBar;
