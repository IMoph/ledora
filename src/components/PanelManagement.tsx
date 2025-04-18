
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import type { LEDPanel } from "@/types/types";

interface PanelManagementProps {
  panels: LEDPanel[];
  onPanelDelete: (id: string) => void;
  onPanelEdit: (panel: LEDPanel) => void;
}

const PanelManagement = ({ panels, onPanelDelete, onPanelEdit }: PanelManagementProps) => {
  const { toast } = useToast();
  const [editingPanel, setEditingPanel] = useState<LEDPanel | null>(null);

  const handleDelete = (id: string) => {
    onPanelDelete(id);
    toast({
      description: "Painel removido com sucesso",
    });
  };

  const handleEdit = (panel: LEDPanel) => {
    setEditingPanel(panel);
    onPanelEdit(panel);
    toast({
      description: "Editando painel...",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Painéis Cadastrados</h2>
      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
        {panels.length === 0 ? (
          <p className="text-center text-muted-foreground">Nenhum painel cadastrado</p>
        ) : (
          <div className="space-y-4">
            {panels.map((panel) => (
              <div
                key={panel.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div>
                  <h3 className="font-medium">{panel.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    P{panel.pValue} - {panel.width}x{panel.height}mm
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Resolução: {panel.resolutionWidth}x{panel.resolutionHeight}px
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(panel)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(panel.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default PanelManagement;
