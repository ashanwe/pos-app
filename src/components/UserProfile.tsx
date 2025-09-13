import { Loader } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Button } from "./ui/button";

const UserProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader className="size-6 mr-4 mt-4 float-right animate-spin" />;
  }

  const avatar = session?.user?.username?.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/");
  };

  return (
    <div>
      {session ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="outline-none relative float-right p-4 md:p-8">
            <div className="flex gap-4 items-center">
              <span>
                {session.user?.firstName?.charAt(0).toUpperCase() +
                  session.user?.firstName?.slice(1) +
                  " " +
                  session.user?.lastName?.charAt(0).toUpperCase() +
                  session.user?.lastName?.slice(1)}
              </span>
              <Avatar className="size-10 hover:opacity-75 transition">
                <AvatarImage
                  className="size-10 hover:opacity-75 transition"
                  src={undefined}
                />
                <AvatarFallback className="bg-sky-900 text-white">
                  {avatar}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="center" side="bottom" className="w-50">
            <DropdownMenuItem className="h-10" onClick={() => handleSignOut()}>
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex justify-end p-4 gap-4">
          <Button>
            <Link href="sign-in">Sign In</Link>
          </Button>
          <Button>
            <Link href="sign-up">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
