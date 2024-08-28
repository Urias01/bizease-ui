import { Helmet, HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { router } from './routes';

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="bizease-theme">
        <Helmet titleTemplate="%s | bizease" />
        <Toaster richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
