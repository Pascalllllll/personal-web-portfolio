import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// 💡 1. Ubah interface props
interface ThemeToggleProps {
    theme: "light" | "dark";
    onToggle: () => void; // Ganti dari setTheme
}

// 💡 2. Terima 'onToggle' sebagai prop
export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
    const toggleTheme = () => {
        // 💡 3. Panggil 'onToggle' dari App.tsx
        onToggle();
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="fixed top-6 left-6 z-50 rounded-full"
        >
            {theme === "light" ? (
                <Moon className="h-5 w-5" />
            ) : (
                <Sun className="h-5 w-5" />
            )}
        </Button>
    );
};