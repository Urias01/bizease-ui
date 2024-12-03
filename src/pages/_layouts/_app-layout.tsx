import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";

export function AppLayout() {
  return (
    <section className="flex h-min-screen">
      <SidebarProvider>
        <AppSidebar />

        <div className="antialised flex-1 min-h-screen h-full flex-col">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-8 pt-6">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </section>
  );
}
