import { useState } from "react";
import { ChevronDown, LogOut, Store, UserPen, Users } from "lucide-react";
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
import { EditCommerce } from "./edit-commerce";
const commerce = {
  name: "BizEase",
};

const profile = {
  name: "John Doe",
  email: "john.doe@example.com",
};

export function AccountMenu() {
  const navigate = useNavigate();
  const [isDialogProfileOpen, setIsDialogProfileOpen] = useState(false);
  const [isDialogCommerceOpen, setIsDialogCommerceOpen] = useState(false);

  const handleCloseDialogProfile = () => setIsDialogProfileOpen(false);
  const handleOpenDialogProfile = () => setIsDialogProfileOpen(true);
  const handleCloseDialogCommerce = () => setIsDialogCommerceOpen(false);
  const handleOpenDialogCommerce = () => setIsDialogCommerceOpen(true);

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
            {profile?.name} - {commerce.name}
            <span className="text-xs font-normal text-muted-foreground">
              {profile?.email}
            </span>
          </>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Dialog
            open={isDialogProfileOpen}
            onOpenChange={setIsDialogProfileOpen}
          >
            <DialogTrigger asChild>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenDialogProfile();
                }}
              >
                <UserPen className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
            </DialogTrigger>

            <StoreProfile onClose={handleCloseDialogProfile} />
          </Dialog>
          <Dialog
            open={isDialogCommerceOpen}
            onOpenChange={setIsDialogCommerceOpen}
          >
            <DialogTrigger asChild>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenDialogCommerce();
                }}
              >
                <Store className="mr-2 h-4 w-4" />
                <span>Comércio</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <EditCommerce onClose={handleCloseDialogCommerce} />
          </Dialog>
          <DropdownMenuItem asChild>
            <NavLink to="/employees">
              <Users className="mr-2 h-4 w-4" />
              <span>Funcionários</span>
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
          >
            <button
              className="w-full"
              onClick={() => {
                localStorage.getItem("token");
                navigate("/sign-in", { replace: true });
              }}
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
