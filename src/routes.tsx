import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/_auth-layout";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import { AppLayout } from "./pages/_layouts/_app-layout";
import { Home } from "./pages/home";
import { Products } from "./pages/products";
import { Categories } from "./pages/categories";
import { Dashboards } from "./pages/dashboards";
import Suppliers from "./pages/suppliers";
import { Employees } from "./pages/employees";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/categories", element: <Categories /> },
      { path: "/suppliers", element: <Suppliers /> },
      { path: "/dashboard", element: <Dashboards /> },
      { path: "/employees", element: <Employees /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> }
    ],
  },
])
