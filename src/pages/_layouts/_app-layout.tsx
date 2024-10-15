import { Header } from "@/components/header";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Box, Home, PackageOpen, PackageSearch } from "lucide-react";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export function AppLayout() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          // const code = error.response?.data.code;

          console.log(error);
          if (status === 401) {
            // code === "UNAUTHORIZED"
            navigate("/sign-in", { replace: true });
            toast.info("Sua sessão expirou")
          } else {
            throw error;
          }
        }
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate, token]);

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
          <NavLink to="/products" className="flex align-middle gap-2 ml-4">
            <PackageOpen className="h-4 w-4 mt-1" />
            Produtos
          </NavLink>
          <NavLink to="/categories" className="flex align-middle gap-2 ml-4">
            <PackageSearch className="h-4 w-4 mt-1" />
            Categorias
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
