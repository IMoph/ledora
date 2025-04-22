
import type { CalculationResult } from "@/types/types";

const CalculatorResult = ({ result }: { result: CalculationResult }) => (
  <div className="mt-4 sm:mt-6 p-4 bg-muted rounded-lg space-y-4">
    <h3 className="font-semibold mb-2">Resultados:</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
      <p>Quantidade de Placas: <span className="font-bold">{result.panelsNeeded}</span></p>
      <p>Distribuição: <span className="font-bold">{result.panelsWide}x{result.panelsHigh}</span> (LxA)</p>
      <p>Resolução Final: <span className="font-bold">{result.finalResolutionWidth}x{result.finalResolutionHeight}px</span></p>
      <p>Proporção: <span className="font-bold">{result.aspectRatio}</span></p>
      <p>Dimensões Finais: <span className="font-bold">{result.widthInMeters.toFixed(2)}x{result.heightInMeters.toFixed(2)}m</span></p>
      <p>Área Total: <span className="font-bold">{result.areaInSquareMeters.toFixed(2)}m²</span></p>
      <p>Cabos de Sinal RJ45: <span className="font-bold">{result.networkCablesNeeded}</span></p>
    </div>
  </div>
);

export default CalculatorResult;
