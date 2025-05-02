
import type { CalculationResult } from "@/types/types";
import { Layout, X, Weight, Zap } from "lucide-react";

const CalculatorResult = ({ result }: { result: CalculationResult }) => (
  <div className="mt-4 sm:mt-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-primary/10 shadow-sm space-y-4">
    <div className="flex items-center gap-2 mb-4">
      <div className="p-1.5 bg-primary/10 rounded-md">
        <Layout className="h-4 w-4 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">Resultados do Cálculo</h3>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Painel</span>
          <span className="font-semibold text-gray-900">{result.panelName} (P{result.pValue})</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Quantidade de Placas</span>
          <span className="font-semibold text-gray-900">{result.panelsNeeded} unidades</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Distribuição de Placas</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">{result.panelsWide}</span>
            <X className="h-3.5 w-3.5 text-gray-500" />
            <span className="font-semibold text-gray-900">{result.panelsHigh}</span>
            <span className="text-gray-500 ml-1">(LxA)</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Resolução Final</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">{result.finalResolutionWidth}</span>
            <X className="h-3.5 w-3.5 text-gray-500" />
            <span className="font-semibold text-gray-900">{result.finalResolutionHeight}</span>
            <span className="text-gray-500 ml-1">pixels</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Proporção</span>
          <span className="font-semibold text-gray-900">{result.aspectRatio}</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Dimensões Finais</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-900">{result.widthInMeters.toFixed(2)}</span>
            <X className="h-3.5 w-3.5 text-gray-500" />
            <span className="font-semibold text-gray-900">{result.heightInMeters.toFixed(2)}</span>
            <span className="text-gray-500 ml-1">metros</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Área Total</span>
          <span className="font-semibold text-gray-900">{result.areaInSquareMeters.toFixed(2)}m²</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">Cabos de Sinal RJ45</span>
          <span className="font-semibold text-gray-900">{result.networkCablesNeeded}</span>
        </div>
      </div>
    </div>
    
    {(result.totalWeight || result.totalWatts || result.totalKVA) && (
      <div className="pt-4 mt-4 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {result.totalWeight && (
            <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
              <Weight className="h-5 w-5 text-blue-600" />
              <div>
                <span className="text-sm font-medium text-gray-500">Peso Total</span>
                <p className="font-semibold text-gray-900">{result.totalWeight.toFixed(2)} kg</p>
              </div>
            </div>
          )}
          
          {result.totalWatts && (
            <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-lg">
              <Zap className="h-5 w-5 text-amber-600" />
              <div>
                <span className="text-sm font-medium text-gray-500">Potência Total</span>
                <p className="font-semibold text-gray-900">{result.totalWatts.toFixed(2)} W</p>
              </div>
            </div>
          )}
          
          {result.totalKVA && (
            <div className="flex items-center gap-2 bg-purple-50 p-3 rounded-lg">
              <Zap className="h-5 w-5 text-purple-600" />
              <div>
                <span className="text-sm font-medium text-gray-500">kVA Total</span>
                <p className="font-semibold text-gray-900">{result.totalKVA.toFixed(2)} kVA</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);

export default CalculatorResult;
