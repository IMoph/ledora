
import { useIsMobile } from "@/hooks/use-mobile";
import { usePanels } from "@/hooks/use-panels";
import { useDialogs } from "@/hooks/use-dialogs";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import CalculatorMain from "@/components/CalculatorMain";
import TutorialDialog from "@/components/TutorialDialog";
import PanelsDialog from "@/components/PanelsDialog";

const Index = () => {
  const isMobile = useIsMobile();
  const { 
    panels, 
    calculationHistory, 
    handlePanelAdded, 
    handlePanelDelete, 
    handleCalculationSaved 
  } = usePanels();
  
  const {
    panelsDialogOpen,
    setPanelsDialogOpen,
    tutorialDialogOpen,
    setTutorialDialogOpen,
    openPanelsDialog,
    closePanelsDialog,
    openTutorialDialog,
    closeTutorialDialog
  } = useDialogs();

  const mainPadding = isMobile ? "pt-4" : "pl-20";

  return (
    <div className="min-h-screen dashboard-gradient">
      <Sidebar 
        onPanelsClick={openPanelsDialog}
        onTutorialClick={openTutorialDialog}
      />
      
      <div className={`min-h-screen ${mainPadding} p-3 sm:p-6 transition-all duration-300`}>
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <PageHeader
            isMobile={isMobile}
            tutorialDialogOpen={tutorialDialogOpen}
            setTutorialDialogOpen={setTutorialDialogOpen}
            panelsDialogOpen={panelsDialogOpen}
            setPanelsDialogOpen={setPanelsDialogOpen}
            panels={panels}
            onPanelAdded={handlePanelAdded}
            onPanelDelete={handlePanelDelete}
          />
          
          <CalculatorMain
            panels={panels}
            onCalculationSaved={handleCalculationSaved}
            calculationHistory={calculationHistory}
          />
        </div>
      </div>
      
      {/* Dialogs for mobile - we control them via state instead of self-contained */}
      {isMobile && (
        <>
          <TutorialDialog
            open={tutorialDialogOpen}
            onOpenChange={setTutorialDialogOpen}
          />
          <PanelsDialog 
            open={panelsDialogOpen}
            onOpenChange={setPanelsDialogOpen}
            panels={panels}
            onPanelAdded={handlePanelAdded}
            onPanelDelete={handlePanelDelete}
          />
        </>
      )}
    </div>
  );
};

export default Index;
