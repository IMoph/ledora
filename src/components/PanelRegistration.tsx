
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { LEDPanel } from "@/types/types";

const PanelRegistration = ({ onPanelAdded }: { onPanelAdded: (panel: LEDPanel) => void }) => {
  const { toast } = useToast();
  const [panel, setPanel] = useState({
    nameAndP: "",
    width: "",
    height: "",
    resolutionWidth: "",
    resolutionHeight: "",
    watts: "",
    weight: "",
  });
  
  const [calculatedPValue, setCalculatedPValue] = useState<number | null>(null);

  // Calculate P value whenever width and resolution width change
  useEffect(() => {
    if (panel.width && panel.resolutionWidth) {
      const width = parseFloat(panel.width);
      const resWidth = parseFloat(panel.resolutionWidth);
      
      if (width > 0 && resWidth > 0) {
        const pValue = width / resWidth;
        setCalculatedPValue(pValue);
      } else {
        setCalculatedPValue(null);
      }
    } else {
      setCalculatedPValue(null);
    }
  }, [panel.width, panel.resolutionWidth]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!panel.nameAndP || !panel.width || !panel.height || !panel.resolutionWidth || !panel.resolutionHeight) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    // Nome padrão aceitando Pvalor junto: "P3.9 | Nome Personalizado"
    let norm = panel.nameAndP.trim();
    let name = norm, pValue = calculatedPValue || 0;
    const match = norm.match(/P?(\d+(?:[,.]\d+)?)\s*\|\s*(.*)/i);
    if (match) {
      name = match[2].trim();
    } else {
      // Tenta extrair valor P se digitado no começo - ex: "3.9 Painel X"
      const fallback = norm.match(/^P?(\d+(?:[,.]\d+)?)[ -]*(.*)$/i);
      if (fallback) {
        name = fallback[2].trim();
      } else {
        name = norm;
      }
    }

    const newPanel: LEDPanel = {
      id: Date.now().toString(),
      name,
      pValue,
      width: Number(panel.width),
      height: Number(panel.height),
      resolutionWidth: Number(panel.resolutionWidth),
      resolutionHeight: Number(panel.resolutionHeight),
    };

    // Add optional fields if provided
    if (panel.watts) {
      newPanel.watts = Number(panel.watts);
    }

    if (panel.weight) {
      newPanel.weight = Number(panel.weight);
    }

    onPanelAdded(newPanel);
    toast({
      title: "Sucesso",
      description: "Painel cadastrado com sucesso!",
    });

    setPanel({
      nameAndP: "",
      width: "",
      height: "",
      resolutionWidth: "",
      resolutionHeight: "",
      watts: "",
      weight: "",
    });
    setCalculatedPValue(null);
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Placa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="nameAndP">Nome da Placa <span className="font-normal text-xs">(ex: empresa P3.9)</span></Label>
          <Input
            id="nameAndP"
            value={panel.nameAndP}
            onChange={(e) => setPanel({ ...panel, nameAndP: e.target.value })}
            placeholder="Ex: empresa P3.9"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="width">Largura (mm)</Label>
            <Input
              id="width"
              type="number"
              value={panel.width}
              onChange={(e) => setPanel({ ...panel, width: e.target.value })}
              placeholder="Ex: 500"
              required
            />
          </div>
          <div>
            <Label htmlFor="height">Altura (mm)</Label>
            <Input
              id="height"
              type="number"
              value={panel.height}
              onChange={(e) => setPanel({ ...panel, height: e.target.value })}
              placeholder="Ex: 500"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="resWidth">Resolução Largura (px)</Label>
            <Input
              id="resWidth"
              type="number"
              value={panel.resolutionWidth}
              onChange={(e) => setPanel({ ...panel, resolutionWidth: e.target.value })}
              placeholder="Ex: 128"
              required
            />
          </div>
          <div>
            <Label htmlFor="resHeight">Resolução Altura (px)</Label>
            <Input
              id="resHeight"
              type="number"
              value={panel.resolutionHeight}
              onChange={(e) => setPanel({ ...panel, resolutionHeight: e.target.value })}
              placeholder="Ex: 128"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="watts">Watts (opcional)</Label>
            <Input
              id="watts"
              type="number"
              value={panel.watts}
              onChange={(e) => setPanel({ ...panel, watts: e.target.value })}
              placeholder="Ex: 150"
            />
          </div>
          <div>
            <Label htmlFor="weight">Peso (kg) (opcional)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              value={panel.weight}
              onChange={(e) => setPanel({ ...panel, weight: e.target.value })}
              placeholder="Ex: 7.5"
            />
          </div>
        </div>
        
        {calculatedPValue !== null && (
          <div className="p-3 bg-muted rounded-md">
            <p>Valor P calculado: <span className="font-semibold">P{calculatedPValue.toFixed(3)}</span></p>
            <p className="text-xs text-muted-foreground mt-1">
              Calculado como largura ÷ resolução largura = {panel.width} ÷ {panel.resolutionWidth} = {calculatedPValue.toFixed(3)}
            </p>
          </div>
        )}
        
        <Button type="submit" className="w-full">Cadastrar Placa</Button>
      </form>
    </Card>
  );
};

export default PanelRegistration;
