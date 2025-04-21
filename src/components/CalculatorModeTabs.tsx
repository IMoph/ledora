
import { Button } from "@/components/ui/button";
import { Ruler, Layout } from "lucide-react";

interface CalculatorModeTabsProps {
  isMobile: boolean;
  calculationMode: "dimensions" | "panels";
  setCalculationMode: (mode: "dimensions" | "panels") => void;
}

const CalculatorModeTabs = ({
  isMobile,
  calculationMode,
  setCalculationMode,
}: CalculatorModeTabsProps) => (
  <div className={`flex flex-col ${!isMobile ? 'sm:flex-row' : ''} gap-2 sm:gap-4`}>
    <Button
      variant={calculationMode === "dimensions" ? "default" : "outline"}
      onClick={() => setCalculationMode("dimensions")}
      className="flex-1"
    >
      <Ruler className="mr-2 h-4 w-4" />
      {isMobile ? "Por Dimensões" : "Calcular por Dimensões"}
    </Button>
    <Button
      variant={calculationMode === "panels" ? "default" : "outline"}
      onClick={() => setCalculationMode("panels")}
      className="flex-1"
    >
      <Layout className="mr-2 h-4 w-4" />
      {isMobile ? "Por Quantidade" : "Calcular por Quantidade"}
    </Button>
  </div>
);

export default CalculatorModeTabs;
