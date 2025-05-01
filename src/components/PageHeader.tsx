
import { useIsMobile } from "@/hooks/use-mobile";
import PanelsDialog from "@/components/PanelsDialog";
import TutorialDialog from "@/components/TutorialDialog";

interface PageHeaderProps {
  isMobile: boolean;
  tutorialDialogOpen: boolean;
  setTutorialDialogOpen: (open: boolean) => void;
  panelsDialogOpen: boolean;
  setPanelsDialogOpen: (open: boolean) => void;
  panels: any[];
  onPanelAdded: (panel: any) => void;
  onPanelDelete: (id: string) => void;
}

const PageHeader = ({
  isMobile,
  tutorialDialogOpen,
  setTutorialDialogOpen,
  panelsDialogOpen,
  setPanelsDialogOpen,
  panels,
  onPanelAdded,
  onPanelDelete
}: PageHeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-4 sm:mb-8 animate-fade-in">
      <div className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/00bada8e-d250-4eee-842c-6f731a81f1f8.png" 
          alt="calcuLEDora Logo" 
          className="h-10 sm:h-14 w-auto"
        />
        <h1 className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
          {isMobile ? "calcuLEDora" : "calcuLEDora"}
        </h1>
      </div>
      
      {!isMobile && (
        <div className="flex gap-2">
          <TutorialDialog
            open={tutorialDialogOpen}
            onOpenChange={setTutorialDialogOpen}
          />
          <PanelsDialog 
            open={panelsDialogOpen}
            onOpenChange={setPanelsDialogOpen}
            panels={panels}
            onPanelAdded={onPanelAdded}
            onPanelDelete={onPanelDelete}
          />
        </div>
      )}
    </header>
  );
};

export default PageHeader;
