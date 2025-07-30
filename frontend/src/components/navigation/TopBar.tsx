"use client"

import { Button } from "@/components/ui/button";
import { APP_NAME, CALLBACK_URL } from "../../constants/common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session, signOut } from "@/lib/auth-client";
import ThemeToggle from "../theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface TopBarProps {
  session: Session | null;
}

const TopBar = ({ session }: TopBarProps) => {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const logout = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          // Show logging out in button
          setIsLoggingOut(true);
        },
        onSuccess: () => {
          toast.success("You have been logged out successfully!");
          router.push("/");
          router.refresh();
          setIsLoggingOut(false);
        },
        onError: (error) => {
          console.error("Error during logout:", error);
          toast.error("An error occurred while logging out. Please try again.");
          setIsLoggingOut(false);
        },
      },
    });
  }

  const showLoginOrUserButton = () => {
    // If user is logged in
    if (session) {
      return (
        <>
          {isLoggingOut && (
            <div className="border border-foreground/50 border-dashed text-sm h-8 p-2 flex items-center justify-center">
              Logging out...
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Avatar className="size-10">
              <AvatarImage src={session.user?.image ?? undefined} />
              <AvatarFallback>
                {session.user?.name.substring(0, 1) ?? ":)"}
              </AvatarFallback>
            </Avatar></DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-56"
              align="end"
              sideOffset={10}
            >
              <DropdownMenuLabel>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session.user?.name ?? `${APP_NAME} User`}
                  </span>
                  {session.user?.email && (
                    <span className="truncate text-xs text-muted-foreground">
                      {session.user.email}
                    </span>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {/* <DropdownMenuItem>
              Feedback
            </DropdownMenuItem> */}
                <DropdownMenuItem onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>);
    } else {
      switch (pathname) {
        case "/":
          return (
            <Link href="/auth/login">
              <Button variant="outline" size="lg" className="px-4 py-2 text-sm animate-fade-in rounded-none">
                Login
              </Button>
            </Link>
          );
        default:
          return null;
      }
    }
  }

  return (
    <div className="w-full flex justify-between items-center">
      <Link href={session ? CALLBACK_URL : "/"}>
        <div className="text-sm uppercase tracking-widest border border-foreground/25 h-10 px-4 py-2 animate-fade-in">{APP_NAME}</div>
      </Link>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {showLoginOrUserButton()}
      </div>
    </div>
  );
};

export default TopBar;
