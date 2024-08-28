import { ThemeProvider } from "./components/theme/theme-provider";
import { ThemeToggle } from "./components/theme/theme-toggle";
import { Button } from "./components/ui/button";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="bizease-theme">
      <Button asChild>
        <ThemeToggle></ThemeToggle>
      </Button>
      <h1>Biz Ease</h1>
    </ThemeProvider>
  );
}
