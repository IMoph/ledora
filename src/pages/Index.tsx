
import { useState, useEffect } from "react";
import PanelRegistration from "@/components/PanelRegistration";
import Calculator from "@/components/Calculator";
import type { LEDPanel } from "@/types/types";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Calculadora de Painéis LED
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <PanelRegistration onPanelAdded={handlePanelAdded} />
          <Calculator panels={panels} />
        </div>
      </div>
    </div>
  );
};

export default Index;
