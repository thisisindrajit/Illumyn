"use client"

import { Button } from "@/components/ui/button";
import { APP_NAME } from "../../../constants/common";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full flex justify-between items-center">
      <Link href="/">
        <div className="text-sm uppercase tracking-widest border border-foreground/25 h-10 px-4 py-2 animate-fade-in">{APP_NAME}</div>
      </Link>
      {pathname !== "/login" && <Link href="/login">
        <Button variant="outline" size="lg" className="px-4 py-2 border border-primary hover:text-background hover:bg-primary transition-colors text-sm animate-fade-in rounded-none">
          Login
        </Button>
      </Link>}
    </div>
  );
};

export default TopBar;
