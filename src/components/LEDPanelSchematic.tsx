
import * as React from "react";
import type { CalculationResult } from "@/types/types";

const CHESS_COLORS = ['#37c9c7', '#53dfde']; // Duas cores para xadrez, inspiradas na imagem

function getPanelGrid(result: CalculationResult) {
  // Mantém a lógica quadrada para distribuir os painéis
  let rows = Math.floor(Math.sqrt(result.panelsNeeded));
  let cols = Math.ceil(result.panelsNeeded / rows);
  while (rows * cols < result.panelsNeeded) cols++;

  if (cols < rows) [cols, rows] = [rows, cols];

  let grid: number[][] = [];
  let idx = 0;
  for (let y = 0; y < rows; y++) {
    let row: number[] = [];
    for (let x = 0; x < cols; x++) {
      if (idx < result.panelsNeeded) {
        row.push(result.panelsNeeded - idx); // Numera invertido (como na imagem)
      } else {
        row.push(0);
      }
      idx++;
    }
    grid.push(row);
  }
  return { grid, rows, cols };
}

const LedPanelChessBoard = ({ result }: { result: CalculationResult }) => {
  const { grid, rows, cols } = getPanelGrid(result);

  if (!result || rows === 0 || cols === 0) return null;

  return (
    <div className="flex justify-center items-center w-full overflow-x-auto mt-2">
      <div
        className="border-dashed border-2 rounded-lg p-1 sm:p-3"
        style={{
          borderColor: "#cbd5e1",
          background: "#343847",
        }}
      >
        <div
          className="flex flex-col"
          style={{
            gap: 0,
          }}
        >
          {grid.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex flex-row"
              style={{
                gap: 0,
              }}
            >
              {row.map((panelNum, colIdx) =>
                panelNum === 0 ? (
                  <div
                    key={colIdx}
                    style={{
                      width: "44px",
                      height: "44px",
                      margin: 1,
                      background: "transparent",
                    }}
                  />
                ) : (
                  <div
                    key={colIdx}
                    className="flex items-start justify-start relative text-xs sm:text-base"
                    style={{
                      width: "44px",
                      height: "44px",
                      minWidth: "44px",
                      minHeight: "44px",
                      margin: 1,
                      background: CHESS_COLORS[(rowIdx + colIdx) % 2],
                      border: "1.2px solid #4ee3d4",
                      borderRadius: "4.5px",
                      boxSizing: "border-box",
                      boxShadow: "0 2px 10px #0001",
                      transition: "background 0.4s",
                      userSelect: "none",
                    }}
                  >
                    <span
                      className="absolute left-2 top-1"
                      style={{
                        fontWeight: 500,
                        opacity: 0.9,
                        color: "#173839",
                        fontSize: "13px",
                        letterSpacing: ".04em",
                      }}
                    >
                      {panelNum}
                    </span>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LEDPanelSchematic = ({ result }: { result: CalculationResult }) => {
  return (
    <div>
      <div className="mb-2 font-medium text-sm text-muted-foreground">
        Visualização 2D das placas (numeradas em ordem inversa)
      </div>
      <LedPanelChessBoard result={result} />
    </div>
  );
};

export default LEDPanelSchematic;
