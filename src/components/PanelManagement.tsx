
import { Trash2, Weight, Zap, LayoutPanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import type { LEDPanel } from "@/types/types";

interface PanelManagementProps {
  panels: LEDPanel[];
  onPanelDelete: (id: string) => void;
}

const PanelManagement = ({ panels, onPanelDelete }: PanelManagementProps) => {
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    onPanelDelete(id);
    toast({
      description: "Painel removido com sucesso",
    });
  };

  return (
    <Card className="p-6 border bg-white">
      <div className="flex items-center gap-2 mb-4">
        <LayoutPanelLeft className="text-primary" />
        <h2 className="text-xl font-bold">Painéis Cadastrados</h2>
      </div>
      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
        {panels.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <LayoutPanelLeft className="h-10 w-10 text-gray-300 mb-2" />
            <p className="text-gray-500">Nenhum painel cadastrado</p>
            <p className="text-sm text-gray-400 mt-1">Adicione seu primeiro painel acima</p>
          </div>
        ) : (
          <div className="space-y-4">
            {panels.map((panel) => (
              <div
                key={panel.id}
                className="panel-card flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{panel.name}</h3>
                    <p className="text-sm text-primary mt-0.5">
                      P{panel.pValue}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(panel.id)}
                    className="hover:bg-red-50 hover:text-red-600 transition-colors h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Dimensões:</span>
                    <p className="font-medium">{panel.width}x{panel.height}mm</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Resolução:</span>
                    <p className="font-medium">{panel.resolutionWidth}x{panel.resolutionHeight}px</p>
                  </div>
                </div>
                
                {(panel.watts || panel.weight) && (
                  <div className="flex gap-3 mt-1">
                    {panel.watts && (
                      <div className="flex items-center gap-1.5 bg-amber-50 py-1 px-2 rounded text-sm">
                        <Zap className="h-3.5 w-3.5 text-amber-600" />
                        <span className="text-gray-700">{panel.watts}W</span>
                      </div>
                    )}
                    {panel.weight && (
                      <div className="flex items-center gap-1.5 bg-blue-50 py-1 px-2 rounded text-sm">
                        <Weight className="h-3.5 w-3.5 text-blue-600" />
                        <span className="text-gray-700">{panel.weight}kg</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default PanelManagement;
