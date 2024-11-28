import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  BaggageClaim,
  Box,
  ChartColumn,
  Home,
  LogOutIcon,
  Package2Icon,
  PackageOpen,
  PackageSearch,
  PackageSearchIcon,
  Receipt,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { NavLink } from "react-router-dom";

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="bg-secondary rounded-t-lg flex justify-middle">
        <div className="flex items-center space-x-2">
          <Box className="h-6 w-6" />
          <span className={state === "collapsed" ? "hidden" : "block"}>
            BizEase
          </span>
        </div>
      </SidebarHeader>
      <Separator orientation="horizontal" className="h-[2px]" />

      <SidebarContent className="bg-secondary">
        <SidebarGroup>
          <SidebarGroupContent>
            <NavLink to="/" className="flex items-center space-x-2 mb-6">
              <Home className="h-4 w-4 mt-1" />
              <span className={state === "collapsed" ? "hidden" : "block"}>
                Início
              </span>
            </NavLink>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Estoque</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavLink
              to="/products"
              className="flex items-center space-x-2 mb-6"
            >
              <PackageOpen className="h-4 w-4 mt-1" />
              <span className={state === "collapsed" ? "hidden" : "block"}>
                Produtos
              </span>
            </NavLink>
            <NavLink
              to="/categories"
              className="flex items-center space-x-2 mb-6"
            >
              <PackageSearch className="h-4 w-4 mt-1" />
              <span className={state === "collapsed" ? "hidden" : "block"}>
                Categorias
              </span>
            </NavLink>
            <NavLink
              to="/suppliers"
              className="flex items-center space-x-2 mb-6"
            >
              <ShoppingBag className="h-4 w-4 mt-1" />
              <span className={state === "collapsed" ? "hidden" : "block"}>
                Fornecedor
              </span>
            </NavLink>
            <NavLink
              to="/movements"
              className="flex items-center space-x-2 mb-6"
            >
              <BaggageClaim className="h-4 w-4 mt-1" />
              <span className={state === "collapsed" ? "hidden" : "block"}>
                Movimentação
              </span>
            </NavLink>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Controles</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavLink to="/sales" className="flex items-center space-x-2 mb-6">
              <Receipt className="h-4 w-4 mt-1" />
              <span className={state === "collapsed" ? "hidden" : "block"}>
                Vendas
              </span>
            </NavLink>
            <NavLink
              to="/purcharses"
              className="flex items-center space-x-2 mb-6"
            >
              <ShoppingCart className="h-4 w-4 mt-1" />
              <span className={state === "collapsed" ? "hidden" : "block"}>
                Compras
              </span>
            </NavLink>
            <NavLink
              to="/dashboard"
              className="flex items-center space-x-2 mb-6"
            >
              <ChartColumn className="h-4 w-4 mt-1" />
              <span className={state === "collapsed" ? "hidden" : "block"}>
                Dashboards
              </span>
            </NavLink>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Relatórios</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavLink
              to="/expired-products"
              className="flex items-center space-x-2 mb-6"
            >
              <PackageSearchIcon className="h-4 w-4 mt-1" />
              <span className={state === "collapsed" ? "hidden" : "block"}>
                Produtos vencidos
              </span>
            </NavLink>
            <NavLink
              to="/returned-products"
              className="flex items-center space-x-2 mb-6"
            >
              <Package2Icon className="h-4 w-4 mt-1" />
              <span className={state === "collapsed" ? "hidden" : "block"}>
                Produtos devolvidos
              </span>
            </NavLink>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-secondary rounded-b-lg">
        <div className="flex items-center space-x-2 mb-6 bg-transparent cursor-pointer text-red-500 font-bold">
          <LogOutIcon className="h-4 w-4" />
          <span
            className={state === "collapsed" ? "hidden" : "block"}
            onClick={() => localStorage.getItem("token")}
          >
            Sair
          </span>
        </div>
        <p
          className={
            state === "collapsed"
              ? "hidden"
              : "text-[0.75rem] absolute bottom-0 p-4"
          }
        >
          &copy; - BizEase {new Date().getFullYear()}
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
