import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="hover:bg-white/5"
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 text-white" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </Button>
  );
}