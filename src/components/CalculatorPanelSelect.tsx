
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { LEDPanel } from "@/types/types";

interface CalculatorPanelSelectProps {
  panels: LEDPanel[];
  selectedPanelId: string;
  onSelectPanel: (id: string) => void;
}

const CalculatorPanelSelect = ({ panels, selectedPanelId, onSelectPanel }: CalculatorPanelSelectProps) => (
  <div>
    <Label>Selecione o Modelo da Placa</Label>
    <Select value={selectedPanelId} onValueChange={onSelectPanel}>
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
);

export default CalculatorPanelSelect;
