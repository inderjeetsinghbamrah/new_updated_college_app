import { Button } from '@/components/ui/button';
import { Moon, Sun } from "lucide-react";
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className='flex items-center gap-2'
        >
            {theme==='dark'? (<><Sun className='w-4 h-4'/>Light Mode</>):(<><Moon className='w-4 h-4' />Dark Mode</>)}
        </Button>
    )
}
