import { Header } from "@/components/header";
import { NavLink, Outlet } from "react-router-dom";
import { Box, Home, PackageOpen } from "lucide-react";

export function AppLayout() {
  return (
    <section className="flex h-min-screen">
      <div className="flex-none bg-secondary items-center">
        <h1 className="flex align-middle ml-2 mt-4 text-xl">
          <Box className="h-6 w-6 mt-1 mr-2" />
          BizEase
        </h1>
        <div className="flex flex-col space-y-4 mt-8 w-36">
          <NavLink to="/" className="flex align-middle gap-2 ml-4">
            <Home className="h-4 w-4 mt-1" />
            Início
          </NavLink>
          <NavLink to="/orders" className="flex align-middle gap-2 ml-4">
            <PackageOpen className="h-4 w-4 mt-1" />
            Produtos
          </NavLink>
        </div>
      </div>
      <div className="antialised flex-1 min-h-screen h-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-8 pt-6">
          <Outlet />
        </main>
        <p className="text-[0.75rem] absolute bottom-0 p-4">
          &copy; - BizEase {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
