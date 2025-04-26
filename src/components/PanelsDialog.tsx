
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PanelManagement from "@/components/PanelManagement";
import PanelRegistration from "@/components/PanelRegistration";
import type { LEDPanel } from "@/types/types";
import { X, LayoutPanelLeft } from "lucide-react";
import * as React from "react";

interface PanelsDialogProps {
  panels: LEDPanel[];
  onPanelAdded: (panel: LEDPanel) => void;
  onPanelDelete: (id: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const PanelsDialog = ({ 
  panels, 
  onPanelAdded, 
  onPanelDelete,
  open,
  onOpenChange
}: PanelsDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isControlled = open !== undefined && onOpenChange !== undefined;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (isControlled) {
      onOpenChange(newOpen);
    } else {
      setIsOpen(newOpen);
    }
  };
  
  const currentOpen = isControlled ? open : isOpen;

  return (
    <Dialog open={currentOpen} onOpenChange={handleOpenChange}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-white/80 hover:bg-white flex gap-2">
            <LayoutPanelLeft size={18} />
            Painéis
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white"
        onPointerDownOutside={() => handleOpenChange(false)}
        onEscapeKeyDown={() => handleOpenChange(false)}
      >
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-2xl flex items-center gap-2">
              <LayoutPanelLeft className="text-primary" />
              Gerenciamento de Placas
            </DialogTitle>
            <button
              aria-label="Fechar"
              onClick={() => handleOpenChange(false)}
              className="rounded-full p-1 ml-2 transition-all border border-transparent hover:bg-red-100"
            >
              <X size={22} className="text-gray-500 hover:text-red-600" />
            </button>
          </div>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <PanelRegistration onPanelAdded={onPanelAdded} />
          <PanelManagement panels={panels} onPanelDelete={onPanelDelete} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PanelsDialog;
