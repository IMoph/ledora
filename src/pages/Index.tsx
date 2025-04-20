
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Calculator from "@/components/Calculator";
import PanelsDialog from "@/components/PanelsDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import type { LEDPanel } from "@/types/types";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [panels, setPanels] = useState<LEDPanel[]>(() => {
    const saved = localStorage.getItem("ledPanels");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("ledPanels", JSON.stringify(panels));
  }, [panels]);

  const handlePanelAdded = (panel: LEDPanel) => {
    setPanels([...panels, panel]);
  };

  const handlePanelDelete = (id: string) => {
    setPanels(panels.filter((panel) => panel.id !== id));
  };

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {isMobile ? "LED Calc" : "Calculadora de Painéis LED"}
          </h1>
          <div className="flex gap-2">
            <PanelsDialog 
              panels={panels}
              onPanelAdded={handlePanelAdded}
              onPanelDelete={handlePanelDelete}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <Calculator panels={panels} />
      </div>
    </div>
  );
};

export default Index;
