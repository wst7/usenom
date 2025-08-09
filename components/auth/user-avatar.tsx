import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignIn from "@/components/auth/sign-in";
import SignOut from "@/components/auth/sign-out";
export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user)
    return (
      <div>
        <SignIn />
      </div>
    );

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage className="cursor-pointer" src={session.user.image} />
            <AvatarFallback>{session.user.name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Account Setting</DropdownMenuItem>
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
