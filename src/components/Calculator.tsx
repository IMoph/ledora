import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calculator as CalculatorIcon, SquareGantt, Ruler } from "lucide-react";
import type { LEDPanel, CalculationResult } from "@/types/types";

const PIXELS_PER_NETWORK_CABLE = 655360;

const Calculator = ({ panels }: { panels: LEDPanel[] }) => {
  const [selectedPanelId, setSelectedPanelId] = useState("");
  const [dimensions, setDimensions] = useState({
    width: "",
    height: "",
  });
  const [panelCount, setPanelCount] = useState({
    width: "",
    height: "",
  });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [calculationMode, setCalculationMode] = useState<"dimensions" | "panels">("dimensions");

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
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Calculadora de Painéis</h2>
      <div className="space-y-4">
        <div>
          <Label>Selecione o Modelo do Painel</Label>
          <Select value={selectedPanelId} onValueChange={setSelectedPanelId}>
            <SelectTrigger>
              <SelectValue placeholder="Escolha um modelo" />
            </SelectTrigger>
            <SelectContent>
              {panels.map((panel) => (
                <SelectItem key={panel.id} value={panel.id}>
                  {panel.name} (P{panel.pValue})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <Button
            variant={calculationMode === "dimensions" ? "default" : "outline"}
            onClick={() => setCalculationMode("dimensions")}
          >
            <Ruler className="mr-2" />
            Calcular por Dimensões
          </Button>
          <Button
            variant={calculationMode === "panels" ? "default" : "outline"}
            onClick={() => setCalculationMode("panels")}
          >
            <SquareGantt className="mr-2" />
            Calcular por Quantidade
          </Button>
        </div>

        {calculationMode === "dimensions" ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="width">Largura Desejada (metros)</Label>
              <Input
                id="width"
                type="number"
                step="0.1"
                value={dimensions.width}
                onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                placeholder="Ex: 5"
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
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="panelsWidth">Quantidade de Painéis (Largura)</Label>
              <Input
                id="panelsWidth"
                type="number"
                value={panelCount.width}
                onChange={(e) => setPanelCount({ ...panelCount, width: e.target.value })}
                placeholder="Ex: 4"
              />
            </div>
            <div>
              <Label htmlFor="panelsHeight">Quantidade de Painéis (Altura)</Label>
              <Input
                id="panelsHeight"
                type="number"
                value={panelCount.height}
                onChange={(e) => setPanelCount({ ...panelCount, height: e.target.value })}
                placeholder="Ex: 3"
              />
            </div>
          </div>
        )}

        <Button 
          onClick={calculationMode === "dimensions" ? calculateByDimensions : calculateByPanelCount}
          className="w-full"
          disabled={!selectedPanelId || (calculationMode === "dimensions" ? (!dimensions.width || !dimensions.height) : (!panelCount.width || !panelCount.height))}
        >
          <CalculatorIcon className="mr-2" />
          Calcular
        </Button>

        {result && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Resultados:</h3>
            <div className="space-y-2">
              <p>Quantidade de Placas: <span className="font-bold">{result.panelsNeeded}</span></p>
              <p>Resolução Final: <span className="font-bold">{result.finalResolutionWidth}x{result.finalResolutionHeight}px</span></p>
              <p>Dimensões Finais: <span className="font-bold">{result.widthInMeters.toFixed(2)}x{result.heightInMeters.toFixed(2)}m</span></p>
              <p>Área Total: <span className="font-bold">{result.areaInSquareMeters.toFixed(2)}m²</span></p>
              <p>Cabos de Rede Necessários: <span className="font-bold">{result.networkCablesNeeded}</span></p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Calculator;
