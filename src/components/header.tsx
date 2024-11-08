import { Box } from "lucide-react";

import { AccountMenu } from "./account-menu";
import { ThemeToggle } from "./theme/theme-toggle";
import { Separator } from "./ui/separator";
import { NavLink } from "react-router-dom";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <SidebarTrigger />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Box className="h-4 w-4" />
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center space-x-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
