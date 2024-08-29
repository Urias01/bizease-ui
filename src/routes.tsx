import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/_auth-layout";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import { AppLayout } from "./pages/_layouts/_app-layout";
import { Home } from "./pages/home";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/sign-up", element: <SignUp /> }
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
