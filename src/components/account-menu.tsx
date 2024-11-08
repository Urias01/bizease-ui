import { useState } from "react";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { StoreProfile } from "./store-profile";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

const commerce = {
  name: "BizEase",
};

const profile = {
  name: "John Doe",
  email: "john.doe@example.com",
};

export function AccountMenu() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleOpenDialog = () => setIsDialogOpen(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          {commerce.name}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <>
            {profile?.name}
            <span className="text-xs font-normal text-muted-foreground">
              {profile?.email}
            </span>
          </>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenDialog();
                }}
              >
                <Building className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
            </DialogTrigger>

            <StoreProfile onClose={handleCloseDialog} />
          </Dialog>
          <DropdownMenuItem asChild>
            <NavLink to="/employees">
              <Building className="mr-2 h-4 w-4" />
              <span>Funcionários</span>
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
          >
            <button
              className="w-full"
              onClick={() => navigate("/sign-in", { replace: true })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
