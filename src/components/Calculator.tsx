
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
    <Card className="p-4 md:p-6 bg-white/90 backdrop-blur-lg border border-white/20 shadow-lg rounded-xl animate-scale-in hover:border-primary/20 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <CalculatorIcon className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Calculadora de Placas LED</h2>
      </div>
      
      <div className="space-y-6">
        <CalculatorPanelSelect
          panels={panels}
          selectedPanelId={selectedPanelId}
          onSelectPanel={setSelectedPanelId}
        />

        <CalculatorModeTabs
          calculationMode={calculationMode}
          setCalculationMode={setCalculationMode}
        />

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 animate-fade-in">
          <CalculatorForm
            calculationMode={calculationMode}
            onCalculate={calculationMode === "dimensions" ? calculateByDimensions : calculateByPanelCount}
            selectedPanelId={selectedPanelId}
          />
        </div>

        {result && (
          <div className="animate-fade-in">
            <CalculatorResult result={result} />
          </div>
        )}
        
        {calculationHistory.length > 0 && (
          <div className="animate-fade-in">
            <CalculationHistory history={calculationHistory} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default Calculator;
