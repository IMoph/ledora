
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { LEDPanel } from "@/types/types";

const PanelRegistration = ({ onPanelAdded }: { onPanelAdded: (panel: LEDPanel) => void }) => {
  const { toast } = useToast();
  const [panel, setPanel] = useState({
    name: "",
    pValue: "",
    width: "",
    height: "",
    resolutionWidth: "",
    resolutionHeight: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!panel.name || !panel.pValue || !panel.width || !panel.height || !panel.resolutionWidth || !panel.resolutionHeight) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    const newPanel: LEDPanel = {
      id: Date.now().toString(),
      name: panel.name,
      pValue: Number(panel.pValue),
      width: Number(panel.width),
      height: Number(panel.height),
      resolutionWidth: Number(panel.resolutionWidth),
      resolutionHeight: Number(panel.resolutionHeight),
    };

    onPanelAdded(newPanel);
    toast({
      title: "Sucesso",
      description: "Painel cadastrado com sucesso!",
    });

    setPanel({
      name: "",
      pValue: "",
      width: "",
      height: "",
      resolutionWidth: "",
      resolutionHeight: "",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Painel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Nome do Painel</Label>
          <Input
            id="name"
            value={panel.name}
            onChange={(e) => setPanel({ ...panel, name: e.target.value })}
            placeholder="Ex: Painel P3.9"
          />
        </div>
        
        <div>
          <Label htmlFor="pValue">Valor P</Label>
          <Input
            id="pValue"
            type="number"
            step="0.1"
            value={panel.pValue}
            onChange={(e) => setPanel({ ...panel, pValue: e.target.value })}
            placeholder="Ex: 3.9"
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
            />
          </div>
        </div>

        <Button type="submit" className="w-full">Cadastrar Painel</Button>
      </form>
    </Card>
  );
};

export default PanelRegistration;
