
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { LEDPanel } from "@/types/types";
import { LayoutPanelLeft } from "lucide-react";

interface CalculatorPanelSelectProps {
  panels: LEDPanel[];
  selectedPanelId: string;
  onSelectPanel: (id: string) => void;
}

const CalculatorPanelSelect = ({ panels, selectedPanelId, onSelectPanel }: CalculatorPanelSelectProps) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium flex items-center gap-1">
      <LayoutPanelLeft className="h-4 w-4 text-primary" />
      Selecione o Modelo da Placa
    </Label>
    <Select value={selectedPanelId} onValueChange={onSelectPanel}>
      <SelectTrigger className="bg-white border border-gray-200">
        <SelectValue placeholder="Escolha um modelo" />
      </SelectTrigger>
      <SelectContent>
        {panels.length === 0 ? (
          <div className="py-2 px-3 text-sm text-gray-500">
            Nenhum painel cadastrado. Adicione painéis primeiro.
          </div>
        ) : (
          panels.map((panel) => (
            <SelectItem key={panel.id} value={panel.id}>
              {panel.name} (P{panel.pValue})
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  </div>
);

export default CalculatorPanelSelect;
