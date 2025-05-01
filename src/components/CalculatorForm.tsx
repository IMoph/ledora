
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator as CalculatorIcon } from "lucide-react";

interface CalculatorFormProps {
  calculationMode: "dimensions" | "panels";
  onCalculate: (value1: string, value2: string) => void;
  selectedPanelId: string;
}

const CalculatorForm = ({ calculationMode, onCalculate, selectedPanelId }: CalculatorFormProps) => {
  const [dimensions, setDimensions] = useState({ width: "", height: "" });
  const [panelCount, setPanelCount] = useState({ width: "", height: "" });

  const handleCalculate = () => {
    if (calculationMode === "dimensions") {
      onCalculate(dimensions.width, dimensions.height);
    } else {
      onCalculate(panelCount.width, panelCount.height);
    }
  };

  if (calculationMode === "dimensions") {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="width" className="text-gray-500">Largura Desejada (metros)</Label>
            <Input
              id="width"
              type="number"
              step="0.1"
              value={dimensions.width}
              onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
              placeholder="Ex: 5"
              className="mt-1 bg-white border-gray-200 text-gray-800"
            />
          </div>
          <div>
            <Label htmlFor="height" className="text-gray-500">Altura Desejada (metros)</Label>
            <Input
              id="height"
              type="number"
              step="0.1"
              value={dimensions.height}
              onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
              placeholder="Ex: 2.5"
              className="mt-1 bg-white border-gray-200 text-gray-800"
            />
          </div>
        </div>
        <Button 
          onClick={handleCalculate}
          className="w-full mt-4 bg-primary hover:bg-primary/90 text-white"
          disabled={!selectedPanelId || !dimensions.width || !dimensions.height}
        >
          <CalculatorIcon className="mr-2 h-4 w-4" />
          Calcular
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="panelsWidth" className="text-gray-500">Quantidade de Placas (Largura)</Label>
          <Input
            id="panelsWidth"
            type="number"
            value={panelCount.width}
            onChange={(e) => setPanelCount({ ...panelCount, width: e.target.value })}
            placeholder="Ex: 4"
            className="mt-1 bg-white border-gray-200 text-gray-800"
          />
        </div>
        <div>
          <Label htmlFor="panelsHeight" className="text-gray-500">Quantidade de Placas (Altura)</Label>
          <Input
            id="panelsHeight"
            type="number"
            value={panelCount.height}
            onChange={(e) => setPanelCount({ ...panelCount, height: e.target.value })}
            placeholder="Ex: 3"
            className="mt-1 bg-white border-gray-200 text-gray-800"
          />
        </div>
      </div>
      <Button 
        onClick={handleCalculate}
        className="w-full mt-4 bg-primary hover:bg-primary/90 text-white"
        disabled={!selectedPanelId || !panelCount.width || !panelCount.height}
      >
        <CalculatorIcon className="mr-2 h-4 w-4" />
        Calcular
      </Button>
    </div>
  );
};

export default CalculatorForm;
