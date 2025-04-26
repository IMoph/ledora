
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Calculator from "@/components/Calculator";
import PanelsDialog from "@/components/PanelsDialog";
import TutorialDialog from "@/components/TutorialDialog";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import type { LEDPanel, CalculationResult } from "@/types/types";

const Index = () => {
  const isMobile = useIsMobile();
  const [panelsDialogOpen, setPanelsDialogOpen] = useState(false);
  const [tutorialDialogOpen, setTutorialDialogOpen] = useState(false);
  
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

  const openPanelsDialog = () => {
    setPanelsDialogOpen(true);
  };
  
  const closePanelsDialog = () => {
    setPanelsDialogOpen(false);
  };
  
  const openTutorialDialog = () => {
    setTutorialDialogOpen(true);
  };
  
  const closeTutorialDialog = () => {
    setTutorialDialogOpen(false);
  };

  const mainPadding = isMobile ? "pt-4" : "pl-20";

  return (
    <div className="min-h-screen dashboard-gradient">
      <Sidebar 
        onPanelsClick={openPanelsDialog}
        onTutorialClick={openTutorialDialog}
      />
      
      <div className={`min-h-screen ${mainPadding} p-3 sm:p-6 transition-all duration-300`}>
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <header className="flex justify-between items-center mb-4 sm:mb-8 animate-fade-in">
            <h1 className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              {isMobile ? "LED Calc" : "Calculadora de Painéis LED"}
            </h1>
            
            {!isMobile && (
              <div className="flex gap-2">
                <TutorialDialog
                  open={tutorialDialogOpen}
                  onOpenChange={setTutorialDialogOpen}
                />
                <PanelsDialog 
                  open={panelsDialogOpen}
                  onOpenChange={setPanelsDialogOpen}
                  panels={panels}
                  onPanelAdded={handlePanelAdded}
                  onPanelDelete={handlePanelDelete}
                />
              </div>
            )}
          </header>
          
          <main className="animate-scale-in">
            <Calculator 
              panels={panels} 
              onCalculationSaved={handleCalculationSaved} 
              calculationHistory={calculationHistory} 
            />
          </main>
        </div>
      </div>
      
      {/* Dialogs for mobile - we control them via state instead of self-contained */}
      {isMobile && (
        <>
          <TutorialDialog
            open={tutorialDialogOpen}
            onOpenChange={setTutorialDialogOpen}
          />
          <PanelsDialog 
            open={panelsDialogOpen}
            onOpenChange={setPanelsDialogOpen}
            panels={panels}
            onPanelAdded={handlePanelAdded}
            onPanelDelete={handlePanelDelete}
          />
        </>
      )}
    </div>
  );
};

export default Index;
