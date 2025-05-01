
import { useState, useEffect } from "react";
import type { LEDPanel, CalculationResult } from "@/types/types";

export function usePanels() {
  const defaultPanels = getDefaultPanels();
  
  // Initialize with default panels and include any saved custom panels
  const [panels, setPanels] = useState<LEDPanel[]>(() => {
    const saved = localStorage.getItem("ledPanels");
    return saved ? [...defaultPanels, ...JSON.parse(saved).filter((panel: LEDPanel) => 
      // Filter out any saved panels that would duplicate a default panel ID
      !defaultPanels.some(defaultPanel => defaultPanel.id === panel.id)
    )] : defaultPanels;
  });

  const [calculationHistory, setCalculationHistory] = useState<CalculationResult[]>(() => {
    const saved = localStorage.getItem("calculationHistory");
    return saved ? JSON.parse(saved) : [];
  });

  // Only save custom panels (non-default ones) to localStorage
  useEffect(() => {
    const customPanels = panels.filter(
      panel => !defaultPanels.some(defaultPanel => defaultPanel.id === panel.id)
    );
    localStorage.setItem("ledPanels", JSON.stringify(customPanels));
  }, [panels]);

  useEffect(() => {
    localStorage.setItem("calculationHistory", JSON.stringify(calculationHistory));
  }, [calculationHistory]);

  const handlePanelAdded = (panel: LEDPanel) => {
    setPanels(currentPanels => {
      // Check for duplicate IDs before adding
      if (currentPanels.some(p => p.id === panel.id)) {
        return currentPanels;
      }
      return [...currentPanels, panel];
    });
  };

  const handlePanelDelete = (id: string) => {
    // Prevent deletion of default panels
    if (defaultPanels.some(panel => panel.id === id)) {
      return; // Don't allow deletion of default panels
    }
    setPanels(panels.filter((panel) => panel.id !== id));
  };

  const handleCalculationSaved = (result: CalculationResult) => {
    setCalculationHistory(prev => {
      const newHistory = [result, ...prev.slice(0, 4)]; // Keep only the last 5 results
      return newHistory;
    });
  };

  return {
    panels,
    calculationHistory,
    handlePanelAdded,
    handlePanelDelete,
    handleCalculationSaved
  };
}

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
