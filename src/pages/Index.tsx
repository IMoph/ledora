
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Calculator from "@/components/Calculator";
import PanelsDialog from "@/components/PanelsDialog";
import TutorialDialog from "@/components/TutorialDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import type { LEDPanel, CalculationResult } from "@/types/types";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [panels, setPanels] = useState<LEDPanel[]>(() => {
    const saved = localStorage.getItem("ledPanels");
    return saved ? JSON.parse(saved) : [];
  });

  const [calculationHistory, setCalculationHistory] = useState<CalculationResult[]>(() => {
    const saved = localStorage.getItem("calculationHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("ledPanels", JSON.stringify(panels));
  }, [panels]);

  useEffect(() => {
    localStorage.setItem("calculationHistory", JSON.stringify(calculationHistory));
  }, [calculationHistory]);

  const handlePanelAdded = (panel: LEDPanel) => {
    setPanels([...panels, panel]);
  };

  const handlePanelDelete = (id: string) => {
    setPanels(panels.filter((panel) => panel.id !== id));
  };

  const handleCalculationSaved = (result: CalculationResult) => {
    setCalculationHistory(prev => {
      const newHistory = [result, ...prev.slice(0, 4)]; // Keep only the last 5 results
      return newHistory;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] p-3 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            {isMobile ? "LED Calc" : "Calculadora de Painéis LED"}
          </h1>
          <div className="flex gap-2">
            <TutorialDialog />
            <PanelsDialog 
              panels={panels}
              onPanelAdded={handlePanelAdded}
              onPanelDelete={handlePanelDelete}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="bg-purple-900/50 border-purple-500/30 text-white hover:bg-purple-800/60"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <Calculator panels={panels} onCalculationSaved={handleCalculationSaved} calculationHistory={calculationHistory} />
      </div>
    </div>
  );
};

export default Index;
