
import { useState } from "react";
import { ChevronDown, ChevronUp, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { CalculationResult } from "@/types/types";

interface CalculationHistoryProps {
  history: CalculationResult[];
}

const CalculationHistory = ({ history }: CalculationHistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="mt-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full flex justify-between">
            <div className="flex items-center">
              <History className="mr-2 h-4 w-4" />
              Histórico de Cálculos
            </div>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3">
          {history.map((item, index) => (
            <Card key={index} className="p-3 text-sm">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{item.panelName} (P{item.pValue})</span>
                <span className="text-muted-foreground">{formatDate(item.timestamp)}</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <p>Quantidade: <span className="font-medium">{item.panelsNeeded}</span></p>
                <p>Distribuição de Placas: <span className="font-medium">{item.panelsWide}x{item.panelsHigh}</span></p>
                <p>Resolução: <span className="font-medium">{item.finalResolutionWidth}x{item.finalResolutionHeight}</span></p>
                <p>Proporção: <span className="font-medium">{item.aspectRatio}</span></p>
                <p>Dimensões: <span className="font-medium">{item.widthInMeters.toFixed(2)}x{item.heightInMeters.toFixed(2)}</span></p>
                <p>Cabos RJ45: <span className="font-medium">{item.networkCablesNeeded}</span></p>
                <p>Placas/Cabo: <span className="font-medium">{item.cabinetsPerSignalCable}</span></p>
                <p>Área Total: <span className="font-medium">{item.areaInSquareMeters}m²</span></p>
              </div>
            </Card>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CalculationHistory;
