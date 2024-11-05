import { Bell, Box } from "lucide-react";
import { Separator } from "./ui/separator";
import { ThemeToggle } from "./theme/theme-toggle";
import { Profile } from "./profile";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <SidebarTrigger />
        <Box className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />
        <div></div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Profile
            user={{ name: "user example", email: "user@example.com" }}
            commerce={{ name: "Commerce example" }}
          />
          <Bell className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
