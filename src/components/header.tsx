import { Bell, Box } from "lucide-react";
import { Separator } from "./ui/separator";
import { ThemeToggle } from "./theme/theme-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Box className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />
        <div></div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <span className="p-2 border bg-transparent rounded-md">
            Usuário X
          </span>
          <Bell className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
