import { ChevronDown, CircleUser } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <section className="grid grid-cols-12">
      <div className="col-span-1 h-screen">
        <h1>Sidebar</h1>
      </div>
      <div className="col-span-11 h-screen">
        <header className="flex justify-between p-4 ">
          <div>
            <span>Logo</span>
          </div>
          <div>
            <span className="flex align-middle justify-center">
              <CircleUser className="h-4 w-4 mr-2 mt-1.5" />
              Comércio x
              <ChevronDown className="h-4 w-4 ml-2 mt-1.5" />
            </span>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </section>
  );
}
