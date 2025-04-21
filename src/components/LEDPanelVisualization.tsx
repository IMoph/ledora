
import { useState, useEffect } from "react";
import { Square } from "lucide-react";
import type { CalculationResult } from "@/types/types";

interface LEDPanelVisualizationProps {
  result: CalculationResult;
}

const CABLE_COLORS = [
  "#8B5CF6", // Roxo
  "#F97316", // Laranja
  "#0EA5E9", // Azul
  "#ea384c", // Vermelho
  "#1EAEDB", // Azul brilhante
  "#33C3F0", // Azul céu
];

const LEDPanelVisualization = ({ result }: LEDPanelVisualizationProps) => {
  const [panelGrid, setPanelGrid] = useState<Array<Array<number>>>([]);

  useEffect(() => {
    // Calcular a quantidade de painéis na largura e altura
    const panelsWide = Math.ceil(result.finalResolutionWidth / (result.finalResolutionWidth / result.panelsNeeded * result.heightInMeters / result.widthInMeters));
    const panelsHigh = Math.ceil(result.panelsNeeded / panelsWide);
    
    // Calcular quantos painéis por cabo de rede (limite de pixels por cabo)
    const pixelsPerPanel = (result.finalResolutionWidth * result.finalResolutionHeight) / result.panelsNeeded;
    const panelsPerCable = Math.floor(655360 / pixelsPerPanel);
    
    // Criar grid de painéis com informação de qual cabo está conectado a cada painel
    const grid: Array<Array<number>> = [];
    let currentCable = 0;
    let panelsInCurrentCable = 0;
    
    for (let y = 0; y < panelsHigh; y++) {
      const row: number[] = [];
      for (let x = 0; x < panelsWide; x++) {
        if (y * panelsWide + x < result.panelsNeeded) {
          row.push(currentCable);
          panelsInCurrentCable++;
          
          if (panelsInCurrentCable >= panelsPerCable) {
            currentCable++;
            panelsInCurrentCable = 0;
          }
        } else {
          row.push(-1); // -1 indica sem painel
        }
      }
      grid.push(row);
    }
    
    setPanelGrid(grid);
  }, [result]);

  if (!result || panelGrid.length === 0) return null;
  
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2">Representação do Painel:</h4>
      <div className="flex flex-col items-center border border-border rounded-md p-3 bg-background">
        {panelGrid.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex">
            {row.map((cableIndex, colIndex) => (
              <div 
                key={`cell-${rowIndex}-${colIndex}`}
                className="relative border border-gray-200 m-0.5"
                style={{ 
                  width: `${Math.max(20, Math.min(40, 500 / row.length))}px`, 
                  height: `${Math.max(20, Math.min(40, 500 / panelGrid.length))}px` 
                }}
              >
                {cableIndex >= 0 && (
                  <div 
                    className="w-full h-full flex items-center justify-center text-white text-xs"
                    style={{ backgroundColor: CABLE_COLORS[cableIndex % CABLE_COLORS.length] }}
                  >
                    {cableIndex + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
        {Array.from({ length: result.networkCablesNeeded }).map((_, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-4 h-4 mr-1" 
              style={{ backgroundColor: CABLE_COLORS[index % CABLE_COLORS.length] }}
            ></div>
            <span>Cabo {index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LEDPanelVisualization;
