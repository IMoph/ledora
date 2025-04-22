
export interface LEDPanel {
  id: string;
  name: string;
  pValue: number;
  width: number;
  height: number;
  resolutionWidth: number;
  resolutionHeight: number;
}

export interface CalculationResult {
  panelsNeeded: number;
  panelsWide: number;
  panelsHigh: number;
  finalResolutionWidth: number;
  finalResolutionHeight: number;
  aspectRatio: string;
  networkCablesNeeded: number;
  widthInMeters: number;
  heightInMeters: number;
  areaInSquareMeters: number;
  timestamp: string;
  panelName: string;
  pValue: number;
}
