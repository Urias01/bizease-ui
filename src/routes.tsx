import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/_layouts/_auth-layout";
import { SignIn } from "./pages/auth/sign-in";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> }
    ],
  }
])
