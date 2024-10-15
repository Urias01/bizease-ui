import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/_auth-layout";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import { AppLayout } from "./pages/_layouts/_app-layout";
import { Home } from "./pages/home";
import { Products } from "./pages/products";
import { Categories } from "./pages/categories";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/categories", element: <Categories /> },
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
