
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PanelManagement from "@/components/PanelManagement";
import PanelRegistration from "@/components/PanelRegistration";
import type { LEDPanel } from "@/types/types";
import { X } from "lucide-react";
import * as React from "react";

interface PanelsDialogProps {
  panels: LEDPanel[];
  onPanelAdded: (panel: LEDPanel) => void;
  onPanelDelete: (id: string) => void;
}

const PanelsDialog = ({ panels, onPanelAdded, onPanelDelete }: PanelsDialogProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-4">Painéis</Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        onPointerDownOutside={() => setOpen(false)}
        onEscapeKeyDown={() => setOpen(false)}
      >
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle>Gerenciamento de Placas</DialogTitle>
            <div className="flex gap-2">
              {/* Close button */}
              <button
                aria-label="Fechar"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 ml-2 transition-all border border-transparent shadow hover:shadow-md"
                style={{
                  background: "#ea384c",
                  color: "white",
                  fontWeight: 700,
                  boxShadow: "0 2px 8px #ea384c55",
                }}
              >
                <X size={22} strokeWidth={2.2} />
              </button>
            </div>
          </div>
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
