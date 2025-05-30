
import type { LEDPanel, CalculationResult } from "@/types/types";
import { type toast } from "@/hooks/use-toast";

const PIXELS_PER_NETWORK_CABLE = 655360;

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

const getAspectRatio = (width: number, height: number): string => {
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
};

// Formula for kVA calculation
const calculateKVA = (watts: number): number => {
  return watts / (1000 * 0.8);
};

interface UseCalculatorProps {
  panels: LEDPanel[];
  selectedPanelId: string;
  onCalculationSaved: (result: CalculationResult) => void;
  setResult: (result: CalculationResult) => void;
  toast: typeof toast;
}

export const useCalculator = ({ 
  panels, 
  selectedPanelId, 
  onCalculationSaved, 
  setResult,
  toast
}: UseCalculatorProps) => {
  const validateDimensions = (width: number, height: number, panel: LEDPanel): boolean => {
    if (panel.width !== 500 && panel.width !== 1000) {
      toast({
        title: "Dimensão inválida",
        description: "A placa selecionada deve ter largura de 500mm ou 1000mm",
        variant: "destructive"
      });
      return false;
    }
    
    if (panel.height !== 500 && panel.height !== 1000) {
      toast({
        title: "Dimensão inválida",
        description: "A placa selecionada deve ter altura de 500mm ou 1000mm",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const calculateByDimensions = (width: string, height: string) => {
    const panel = panels.find((p) => p.id === selectedPanelId);
    if (!panel || !width || !height) return;

    if (!validateDimensions(Number(width), Number(height), panel)) return;

    const widthInMm = Number(width) * 1000;
    const heightInMm = Number(height) * 1000;

    const panelsWide = Math.ceil(widthInMm / panel.width);
    const panelsHigh = Math.ceil(heightInMm / panel.height);
    const totalPanels = panelsWide * panelsHigh;

    const finalResolutionWidth = panelsWide * panel.resolutionWidth;
    const finalResolutionHeight = panelsHigh * panel.resolutionHeight;
    const totalPixels = finalResolutionWidth * finalResolutionHeight;

    const finalWidthInMeters = (panelsWide * panel.width) / 1000;
    const finalHeightInMeters = (panelsHigh * panel.height) / 1000;
    const totalAreaInSquareMeters = finalWidthInMeters * finalHeightInMeters;

    const aspectRatio = getAspectRatio(finalResolutionWidth, finalResolutionHeight);
    
    // Calculate cabinets per signal cable
    const pixelsPerPanel = panel.resolutionWidth * panel.resolutionHeight;
    const cabinetsPerSignalCable = Math.floor(PIXELS_PER_NETWORK_CABLE / pixelsPerPanel);
    
    // New formula for calculating network cables needed
    const networkCablesNeeded = Math.ceil(totalPanels / cabinetsPerSignalCable);

    const calculationResult: CalculationResult = {
      panelsNeeded: totalPanels,
      panelsWide,
      panelsHigh,
      finalResolutionWidth,
      finalResolutionHeight,
      aspectRatio,
      networkCablesNeeded,
      widthInMeters: finalWidthInMeters,
      heightInMeters: finalHeightInMeters,
      areaInSquareMeters: totalAreaInSquareMeters,
      timestamp: new Date().toISOString(),
      panelName: panel.name,
      pValue: panel.pValue,
      cabinetsPerSignalCable,
    };

    // Add weight calculation if panel has weight
    if (panel.weight) {
      calculationResult.totalWeight = totalPanels * panel.weight;
    }

    // Add watts and kVA calculations if panel has watts
    if (panel.watts) {
      const totalWatts = totalPanels * panel.watts;
      calculationResult.totalWatts = totalWatts;
      calculationResult.totalKVA = calculateKVA(totalWatts);
    }

    setResult(calculationResult);
    onCalculationSaved(calculationResult);
  };

  const calculateByPanelCount = (widthPanels: string, heightPanels: string) => {
    const panel = panels.find((p) => p.id === selectedPanelId);
    if (!panel || !widthPanels || !heightPanels) return;

    const panelsWide = Number(widthPanels);
    const panelsHigh = Number(heightPanels);
    const totalPanels = panelsWide * panelsHigh;

    const finalResolutionWidth = panelsWide * panel.resolutionWidth;
    const finalResolutionHeight = panelsHigh * panel.resolutionHeight;
    const totalPixels = finalResolutionWidth * finalResolutionHeight;

    const finalWidthInMeters = (panelsWide * panel.width) / 1000;
    const finalHeightInMeters = (panelsHigh * panel.height) / 1000;
    const totalAreaInSquareMeters = finalWidthInMeters * finalHeightInMeters;

    const aspectRatio = getAspectRatio(finalResolutionWidth, finalResolutionHeight);
    
    // Calculate cabinets per signal cable
    const pixelsPerPanel = panel.resolutionWidth * panel.resolutionHeight;
    const cabinetsPerSignalCable = Math.floor(PIXELS_PER_NETWORK_CABLE / pixelsPerPanel);
    
    // New formula for calculating network cables needed
    const networkCablesNeeded = Math.ceil(totalPanels / cabinetsPerSignalCable);

    const calculationResult: CalculationResult = {
      panelsNeeded: totalPanels,
      panelsWide,
      panelsHigh,
      finalResolutionWidth,
      finalResolutionHeight,
      aspectRatio,
      networkCablesNeeded,
      widthInMeters: finalWidthInMeters,
      heightInMeters: finalHeightInMeters,
      areaInSquareMeters: totalAreaInSquareMeters,
      timestamp: new Date().toISOString(),
      panelName: panel.name,
      pValue: panel.pValue,
      cabinetsPerSignalCable,
    };

    // Add weight calculation if panel has weight
    if (panel.weight) {
      calculationResult.totalWeight = totalPanels * panel.weight;
    }

    // Add watts and kVA calculations if panel has watts
    if (panel.watts) {
      const totalWatts = totalPanels * panel.watts;
      calculationResult.totalWatts = totalWatts;
      calculationResult.totalKVA = calculateKVA(totalWatts);
    }

    setResult(calculationResult);
    onCalculationSaved(calculationResult);
  };

  return {
    calculateByDimensions,
    calculateByPanelCount
  };
};
