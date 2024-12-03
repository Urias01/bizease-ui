import { Box } from "lucide-react";
import { Outlet } from "react-router-dom";

import checkBoxDark from "@/assets/images/check-box-dark.svg";
import checkBoxLight from "@/assets/images/check-box-light.svg";

export function AuthLayout() {
  return (
    <div className="antialised grid min-h-screen grid-cols-1 sm:grid-cols-2">
      <div
        className="hidden sm:flex h-full flex-col justify-between bg-background p-10 text-muted-foreground"
      >
        <div className="flex items-center gap-3 text-lg  text-primary">
          <Box className="h-8 w-8" />
          <span className="font-semibold">BizEase</span>
        </div>
        <div className="flex align-middle justify-center">
          {localStorage.getItem("bizease-theme") === "dark" ? (
            <img src={checkBoxDark} className="h-[420px] w-[420px]" />
          ) : (
            <img src={checkBoxLight} className="h-[420px] w-[420px]" />
          )}
        </div>
        <footer className="text-sm  text-foreground">
          &copy; bizease - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center bg-background">
        <Outlet />
      </div>
    </div>
  );
}
