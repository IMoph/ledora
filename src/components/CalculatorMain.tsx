
import Calculator from "@/components/Calculator";
import Footer from "@/components/Footer";
import type { LEDPanel, CalculationResult } from "@/types/types";

interface CalculatorMainProps {
  panels: LEDPanel[];
  onCalculationSaved: (result: CalculationResult) => void;
  calculationHistory: CalculationResult[];
}

const CalculatorMain = ({ 
  panels, 
  onCalculationSaved, 
  calculationHistory 
}: CalculatorMainProps) => {
  return (
    <main className="animate-scale-in">
      <Calculator 
        panels={panels} 
        onCalculationSaved={onCalculationSaved} 
        calculationHistory={calculationHistory} 
      />
      <Footer />
    </main>
  );
};

export default CalculatorMain;
