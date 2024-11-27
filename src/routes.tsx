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
import { Sales } from "./pages/sales";
import { Purcharses } from "./pages/purcharses";
import { Movements } from "./pages/movements";
import { ExpiredProducts } from "./pages/expired-products";
import { ReturnedProducts } from "./pages/returned-products";
import { ForgotPassword } from "./pages/auth/forgot-password";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/categories", element: <Categories /> },
      { path: "/suppliers", element: <Suppliers /> },
      { path: "/movements", element: <Movements /> },
      { path: "/dashboard", element: <Dashboards /> },
      { path: "/employees", element: <Employees /> },
      { path: "/sales", element: <Sales /> },
      { path: "/purcharses", element: <Purcharses /> },
      { path: "/expired-products", element: <ExpiredProducts /> },
      { path: "/returned-products", element: <ReturnedProducts /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/forgot-password", element: <ForgotPassword/> },
    ],
  },
]);
