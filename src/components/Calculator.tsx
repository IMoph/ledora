
import { useState } from "react";
import { Calculator as CalculatorIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { LEDPanel, CalculationResult } from "@/types/types";
import CalculatorPanelSelect from "./CalculatorPanelSelect";
import CalculatorModeTabs from "./CalculatorModeTabs";
import CalculatorForm from "./CalculatorForm";
import CalculatorResult from "./CalculatorResult";
import CalculationHistory from "./CalculationHistory";
import { useCalculator } from "@/hooks/use-calculator";

const Calculator = ({ 
  panels, 
  onCalculationSaved,
  calculationHistory 
}: { 
  panels: LEDPanel[]; 
  onCalculationSaved: (result: CalculationResult) => void;
  calculationHistory: CalculationResult[];
}) => {
  const [selectedPanelId, setSelectedPanelId] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [calculationMode, setCalculationMode] = useState<"dimensions" | "panels">("dimensions");
  const { toast } = useToast();
  const { calculateByDimensions, calculateByPanelCount } = useCalculator({ 
    panels,
    selectedPanelId,
    onCalculationSaved,
    setResult,
    toast
  });

  return (
    <Card className="p-4 md:p-6 bg-[#1a0b2e]/95 backdrop-blur-lg border border-purple-500/20">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Calculadora de Placas LED</h2>
      <div className="space-y-4">
        <CalculatorPanelSelect
          panels={panels}
          selectedPanelId={selectedPanelId}
          onSelectPanel={setSelectedPanelId}
        />

        <CalculatorModeTabs
          calculationMode={calculationMode}
          setCalculationMode={setCalculationMode}
        />

        <CalculatorForm
          calculationMode={calculationMode}
          onCalculate={calculationMode === "dimensions" ? calculateByDimensions : calculateByPanelCount}
          selectedPanelId={selectedPanelId}
        />

        {result && <CalculatorResult result={result} />}
        
        {calculationHistory.length > 0 && (
          <CalculationHistory history={calculationHistory} />
        )}
      </div>
    </Card>
  );
};

export default Calculator;
