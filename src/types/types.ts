
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
  finalResolutionWidth: number;
  finalResolutionHeight: number;
  networkCablesNeeded: number;
  widthInMeters: number;
  heightInMeters: number;
  areaInSquareMeters: number;
}

