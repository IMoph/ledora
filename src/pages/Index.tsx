
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Calculator from "@/components/Calculator";
import PanelsDialog from "@/components/PanelsDialog";
import TutorialDialog from "@/components/TutorialDialog";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useIsMobile } from "@/hooks/use-mobile";
import type { LEDPanel, CalculationResult } from "@/types/types";

const Index = () => {
  const isMobile = useIsMobile();
  const [panelsDialogOpen, setPanelsDialogOpen] = useState(false);
  const [tutorialDialogOpen, setTutorialDialogOpen] = useState(false);
  
  // Fix: Ensure the default panels are loaded first, then override with any saved panels
  const [panels, setPanels] = useState<LEDPanel[]>(() => {
    const saved = localStorage.getItem("ledPanels");
    const defaultPanels = getDefaultPanels();
    // Only use saved panels if they exist, otherwise use defaults
    return saved ? JSON.parse(saved) : defaultPanels;
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
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/00bada8e-d250-4eee-842c-6f731a81f1f8.png" 
                alt="calcuLEDora Logo" 
                className="h-10 sm:h-14 w-auto"
              />
              <h1 className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                {isMobile ? "calcuLEDora" : "calcuLEDora"}
              </h1>
            </div>
            
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
          
          <Footer />
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

// Function to provide default panel presets
function getDefaultPanels(): LEDPanel[] {
  return [
    {
      id: "p1-25",
      name: "P1.25",
      pValue: 1.25,
      width: 640,
      height: 480,
      resolutionWidth: 512,
      resolutionHeight: 384
    },
    {
      id: "p1-53",
      name: "P1.53",
      pValue: 1.53,
      width: 640,
      height: 480,
      resolutionWidth: 416,
      resolutionHeight: 312
    },
    {
      id: "p2-60",
      name: "P2.60",
      pValue: 2.60,
      width: 500,
      height: 500,
      resolutionWidth: 192,
      resolutionHeight: 192
    },
    {
      id: "p2-97",
      name: "P2.97",
      pValue: 2.97,
      width: 500,
      height: 500,
      resolutionWidth: 168,
      resolutionHeight: 168
    },
    {
      id: "p2-97-0-5x1m",
      name: "P2.97 0,5x1m",
      pValue: 2.97,
      width: 500,
      height: 1000,
      resolutionWidth: 168,
      resolutionHeight: 336
    },
    {
      id: "p3-90",
      name: "P3.90",
      pValue: 3.90,
      width: 500,
      height: 500,
      resolutionWidth: 128,
      resolutionHeight: 128
    },
    {
      id: "p3-9-0-5x1m",
      name: "P3.9 0,5x1m",
      pValue: 3.9,
      width: 500,
      height: 1000,
      resolutionWidth: 128,
      resolutionHeight: 256
    },
    {
      id: "p4-8",
      name: "P4.8",
      pValue: 4.8,
      width: 500,
      height: 500,
      resolutionWidth: 104,
      resolutionHeight: 104
    },
    {
      id: "p5-1m",
      name: "P5 1m",
      pValue: 5,
      width: 960,
      height: 960,
      resolutionWidth: 192,
      resolutionHeight: 192
    }
  ];
}

export default Index;
