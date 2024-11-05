import { LogOut, User2, Users } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { EditProfile } from "./edit-profile";

interface ProfileProps {
  user: {
    name: string;
    email: string;
  };
  commerce: {
    name: string;
  };
}
export function Profile({ user, commerce }: ProfileProps) {
  const navigate = useNavigate();

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            {user.name} -{" "}
            {commerce.name.length > 10
              ? commerce.name.substring(0, 8).concat("...")
              : commerce.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Email: {user.email}</DropdownMenuLabel>
          <DropdownMenuLabel>Comércio: {commerce.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DialogTrigger className="flex gap-2">
              <User2 className="h-4 w-4" /> <p>Editar perfil</p>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2">
            <Users className="h-4 w-4" /> <p>Editar funcionários</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 space-x-2 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/sign-in", { replace: true });
            }}
          >
            <LogOut className="h-4 w-4" /> <p>Sign out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditProfile />
    </Dialog>
  );
}
