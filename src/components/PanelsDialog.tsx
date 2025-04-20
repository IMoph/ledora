
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PanelManagement from "@/components/PanelManagement";
import PanelRegistration from "@/components/PanelRegistration";
import type { LEDPanel } from "@/types/types";

interface PanelsDialogProps {
  panels: LEDPanel[];
  onPanelAdded: (panel: LEDPanel) => void;
  onPanelDelete: (id: string) => void;
}

const PanelsDialog = ({ panels, onPanelAdded, onPanelDelete }: PanelsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-4">Painéis</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gerenciamento de Painéis</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <PanelRegistration onPanelAdded={onPanelAdded} />
          <PanelManagement panels={panels} onPanelDelete={onPanelDelete} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PanelsDialog;

