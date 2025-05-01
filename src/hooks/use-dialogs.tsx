
import { useState } from "react";

export function useDialogs() {
  const [panelsDialogOpen, setPanelsDialogOpen] = useState(false);
  const [tutorialDialogOpen, setTutorialDialogOpen] = useState(false);
  
  const openPanelsDialog = () => {
    setPanelsDialogOpen(true);
  };
  
  const closePanelsDialog = () => {
    setPanelsDialogOpen(false);
  };
  
  const openTutorialDialog = () => {
    setTutorialDialogOpen(true);
  };
  
  const closeTutorialDialog = () => {
    setTutorialDialogOpen(false);
  };

  return {
    panelsDialogOpen,
    setPanelsDialogOpen,
    tutorialDialogOpen,
    setTutorialDialogOpen,
    openPanelsDialog,
    closePanelsDialog,
    openTutorialDialog,
    closeTutorialDialog
  };
}
