
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calculator as CalculatorIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { LEDPanel, CalculationResult } from "@/types/types";
import CalculatorPanelSelect from "./CalculatorPanelSelect";
import CalculatorModeTabs from "./CalculatorModeTabs";
import CalculatorResult from "./CalculatorResult";

const PIXELS_PER_NETWORK_CABLE = 655360;

const Calculator = ({ panels }: { panels: LEDPanel[] }) => {
  const [selectedPanelId, setSelectedPanelId] = useState("");
  const [dimensions, setDimensions] = useState({ width: "", height: "" });
  const [panelCount, setPanelCount] = useState({ width: "", height: "" });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [calculationMode, setCalculationMode] = useState<"dimensions" | "panels">("dimensions");
  const isMobile = useIsMobile();

  const calculateByDimensions = () => {
    const panel = panels.find((p) => p.id === selectedPanelId);
    if (!panel || !dimensions.width || !dimensions.height) return;

    const widthInMm = Number(dimensions.width) * 1000;
    const heightInMm = Number(dimensions.height) * 1000;

    const panelsWide = Math.ceil(widthInMm / panel.width);
    const panelsHigh = Math.ceil(heightInMm / panel.height);
    const totalPanels = panelsWide * panelsHigh;

    const finalResolutionWidth = panelsWide * panel.resolutionWidth;
    const finalResolutionHeight = panelsHigh * panel.resolutionHeight;
    const totalPixels = finalResolutionWidth * finalResolutionHeight;

    const finalWidthInMeters = (panelsWide * panel.width) / 1000;
    const finalHeightInMeters = (panelsHigh * panel.height) / 1000;
    const totalAreaInSquareMeters = finalWidthInMeters * finalHeightInMeters;

    const networkCablesNeeded = Math.ceil(totalPixels / PIXELS_PER_NETWORK_CABLE);

    setResult({
      panelsNeeded: totalPanels,
      finalResolutionWidth,
      finalResolutionHeight,
      networkCablesNeeded,
      widthInMeters: finalWidthInMeters,
      heightInMeters: finalHeightInMeters,
      areaInSquareMeters: totalAreaInSquareMeters,
    });
  };

  const calculateByPanelCount = () => {
    const panel = panels.find((p) => p.id === selectedPanelId);
    if (!panel || !panelCount.width || !panelCount.height) return;

    const panelsWide = Number(panelCount.width);
    const panelsHigh = Number(panelCount.height);
    const totalPanels = panelsWide * panelsHigh;

    const finalResolutionWidth = panelsWide * panel.resolutionWidth;
    const finalResolutionHeight = panelsHigh * panel.resolutionHeight;
    const totalPixels = finalResolutionWidth * finalResolutionHeight;

    const finalWidthInMeters = (panelsWide * panel.width) / 1000;
    const finalHeightInMeters = (panelsHigh * panel.height) / 1000;
    const totalAreaInSquareMeters = finalWidthInMeters * finalHeightInMeters;

    const networkCablesNeeded = Math.ceil(totalPixels / PIXELS_PER_NETWORK_CABLE);

    setResult({
      panelsNeeded: totalPanels,
      finalResolutionWidth,
      finalResolutionHeight,
      networkCablesNeeded,
      widthInMeters: finalWidthInMeters,
      heightInMeters: finalHeightInMeters,
      areaInSquareMeters: totalAreaInSquareMeters,
    });
  };

  return (
    <Card className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Calculadora de Placas LED</h2>
      <div className="space-y-4">
        <CalculatorPanelSelect
          panels={panels}
          selectedPanelId={selectedPanelId}
          onSelectPanel={setSelectedPanelId}
        />

        <CalculatorModeTabs
          isMobile={isMobile}
          calculationMode={calculationMode}
          setCalculationMode={setCalculationMode}
        />

        {calculationMode === "dimensions" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="width">Largura Desejada (metros)</Label>
              <Input
                id="width"
                type="number"
                step="0.1"
                value={dimensions.width}
                onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                placeholder="Ex: 5"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="height">Altura Desejada (metros)</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                value={dimensions.height}
                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                placeholder="Ex: 2.5"
                className="mt-1"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="panelsWidth">Quantidade de Placas (Largura)</Label>
              <Input
                id="panelsWidth"
                type="number"
                value={panelCount.width}
                onChange={(e) => setPanelCount({ ...panelCount, width: e.target.value })}
                placeholder="Ex: 4"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="panelsHeight">Quantidade de Placas (Altura)</Label>
              <Input
                id="panelsHeight"
                type="number"
                value={panelCount.height}
                onChange={(e) => setPanelCount({ ...panelCount, height: e.target.value })}
                placeholder="Ex: 3"
                className="mt-1"
              />
            </div>
          </div>
        )}

        <Button 
          onClick={calculationMode === "dimensions" ? calculateByDimensions : calculateByPanelCount}
          className="w-full"
          disabled={
            !selectedPanelId ||
            (calculationMode === "dimensions"
              ? (!dimensions.width || !dimensions.height)
              : (!panelCount.width || !panelCount.height))
          }
        >
          <CalculatorIcon className="mr-2 h-4 w-4" />
          Calcular
        </Button>

        {result && <CalculatorResult result={result} />}
      </div>
    </Card>
  );
};

export default Calculator;
