
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from "lucide-react";

interface Theme {
  name: string;
  primary: string;
  gradient: string;
}

const themes: Theme[] = [
  { name: 'Default', primary: '#8B5CF6', gradient: 'linear-gradient(135deg, #1a0b2e 0%, #2f1c4a 100%)' },
  { name: 'Blue', primary: '#3B82F6', gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)' },
  { name: 'Green', primary: '#10B981', gradient: 'linear-gradient(135deg, #022c22 0%, #065f46 100%)' },
  { name: 'Red', primary: '#EF4444', gradient: 'linear-gradient(135deg, #450a0a 0%, #991b1b 100%)' },
  { name: 'Orange', primary: '#F97316', gradient: 'linear-gradient(135deg, #431407 0%, #9a3412 100%)' },
  { name: 'Pink', primary: '#EC4899', gradient: 'linear-gradient(135deg, #500724 0%, #9d174d 100%)' },
  { name: 'Teal', primary: '#14B8A6', gradient: 'linear-gradient(135deg, #042f2e 0%, #0f766e 100%)' },
  { name: 'Cyan', primary: '#06B6D4', gradient: 'linear-gradient(135deg, #083344 0%, #0e7490 100%)' },
  { name: 'Amber', primary: '#F59E0B', gradient: 'linear-gradient(135deg, #451a03 0%, #b45309 100%)' },
  { name: 'Indigo', primary: '#6366F1', gradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)' }
];

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'Default';
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
  }, [currentTheme]);

  const applyTheme = (themeName: string) => {
    const theme = themes.find(t => t.name === themeName) || themes[0];
    document.documentElement.style.setProperty('--primary', convertHexToHSL(theme.primary));
    document.documentElement.style.setProperty('--primary-foreground', '0 0% 98%');
    document.documentElement.style.setProperty('--ring', convertHexToHSL(theme.primary));
    
    document.body.style.setProperty('--dashboard-gradient', theme.gradient);
    
    // Apply the gradient for the root element
    const root = document.querySelector('.dashboard-gradient');
    if (root) {
      (root as HTMLElement).style.background = theme.gradient;
    }
  };

  // Helper function to convert hex to HSL string format for CSS variables
  const convertHexToHSL = (hex: string): string => {
    // Remove the # from the beginning
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    // Find greatest and smallest channel values
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    // Calculate hue and saturation
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h *= 60;
    }

    // Convert to Shadcn format (hue saturation% lightness%)
    return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="bg-white shadow-md border-primary/20 flex gap-2">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Tema</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <h3 className="text-sm font-medium mb-2">Escolha um tema</h3>
        <div className="grid grid-cols-5 gap-2">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setCurrentTheme(theme.name)}
              className={`h-8 w-8 rounded-full transition-all ${
                currentTheme === theme.name ? 'ring-2 ring-offset-2 scale-110' : ''
              }`}
              style={{ background: theme.primary }}
              title={theme.name}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitcher;
