import { Helmet, HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="bizease-theme">
        <Helmet titleTemplate="%s | bizease" />
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
