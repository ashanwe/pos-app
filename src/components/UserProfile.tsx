"use client";

import { Loader, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";

const UserProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center">
        <Loader className="h-4 w-4 animate-spin text-gray-500" />
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0).toUpperCase() || "";
    const last = lastName?.charAt(0).toUpperCase() || "";
    return first + last || "U";
  };

  const getDisplayName = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "User";
    return `${firstName || ""} ${lastName || ""}`.trim();
  };

  return (
    <div className="flex items-center">
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-auto px-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="User avatar" />
                  <AvatarFallback className="bg-primary text-white text-sm font-medium">
                    {getInitials(
                      session.user?.firstName,
                      session.user?.lastName
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {getDisplayName(
                      session.user?.firstName,
                      session.user?.lastName
                    )}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    @{session.user?.username}
                  </span>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="text-xs text-muted-foreground capitalize">
                  {session.user?.role?.replace("_", " ")}
                </p>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
