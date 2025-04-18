
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Calculator from "@/components/Calculator";
import PanelsDialog from "@/components/PanelsDialog";
import type { LEDPanel } from "@/types/types";

const Index = () => {
  const { theme, setTheme } = useTheme();
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Calculadora de Painéis LED
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <PanelsDialog 
          panels={panels}
          onPanelAdded={handlePanelAdded}
          onPanelDelete={handlePanelDelete}
        />
        
        <Calculator panels={panels} />
      </div>
    </div>
  );
};

export default Index;
