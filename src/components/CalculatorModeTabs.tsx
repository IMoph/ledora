
import { Button } from "@/components/ui/button";
import { Ruler, Layout } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CalculatorModeTabsProps {
  calculationMode: "dimensions" | "panels";
  setCalculationMode: (mode: "dimensions" | "panels") => void;
}

const CalculatorModeTabs = ({
  calculationMode,
  setCalculationMode,
}: CalculatorModeTabsProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-gray-100 p-1 rounded-lg flex">
      <Button
        variant="ghost"
        onClick={() => setCalculationMode("dimensions")}
        className={`flex-1 flex items-center justify-center gap-2 rounded-md transition-all ${
          calculationMode === "dimensions" 
            ? "bg-white shadow-sm text-primary" 
            : "text-gray-600 hover:text-primary"
        }`}
      >
        <Ruler className="h-4 w-4" />
        {isMobile ? "Por Dimensões" : "Calcular por Dimensões"}
      </Button>
      <Button
        variant="ghost"
        onClick={() => setCalculationMode("panels")}
        className={`flex-1 flex items-center justify-center gap-2 rounded-md transition-all ${
          calculationMode === "panels" 
            ? "bg-white shadow-sm text-primary" 
            : "text-gray-600 hover:text-primary"
        }`}
      >
        <Layout className="h-4 w-4" />
        {isMobile ? "Por Quantidade" : "Calcular por Quantidade"}
      </Button>
    </div>
  );
};

export default CalculatorModeTabs;
