
import * as React from "react";
import type { CalculationResult } from "@/types/types";
import { EthernetPort } from "lucide-react";

const CABLE_COLORS = [
  "#F97316", // Laranja
  "#9b87f5", // Roxo
  "#38d9a9", // Cyan
  "#ea384c", // Vermelho
  "#33C3F0", // Sky Blue
  "#0EA5E9", // Ocean Blue
];

const PANEL_BG_COLORS = [
  "rgba(249, 115, 22, 0.12)", // Laranja claro
  "rgba(155, 135, 245, 0.12)", // Roxo claro
  "rgba(56,217,169, 0.12)", // Cyan claro
  "rgba(234,56,76,0.12)", // Vermelho claro
  "rgba(51, 195, 240, 0.12)", // SkyBlue claro
  "rgba(14,165,233,0.12)", // Azul Claro
];

// Retorna a estrutura bidimensional do painel, útil para visualização
function getPanelGrid(result: CalculationResult) {
  // Estima quadrado ou próximo (ex: 6 placas -> 2x3)
  let rows = Math.floor(Math.sqrt(result.panelsNeeded));
  let cols = Math.ceil(result.panelsNeeded / rows);
  while (rows * cols < result.panelsNeeded) cols++;

  // Garante largura >= altura
  if (cols < rows) [cols, rows] = [rows, cols];

  let grid: number[][] = [];
  let idx = 0;
  for (let y = 0; y < rows; y++) {
    let row: number[] = [];
    for (let x = 0; x < cols; x++) {
      if (idx < result.panelsNeeded) {
        row.push(idx);
      } else {
        row.push(-1); // posição vazia
      }
      idx++;
    }
    grid.push(row);
  }
  return { grid, rows, cols };
}

// Mapeia cada painel a um cabo de rede numerado
function getCableAssignment(result: CalculationResult) {
  const { grid, rows, cols } = getPanelGrid(result);
  // Cada cabo suporta até N paineis, onde N = Math.floor(655360 / pixelsPorPainel)
  const pixelsPorPainel = (result.finalResolutionWidth * result.finalResolutionHeight) / result.panelsNeeded;
  const cabos = Math.ceil(result.panelsNeeded / Math.floor(655360 / pixelsPorPainel));

  let cablePerPanel: number[][] = [];
  let currentCable = 0;
  let count = 0;
  const CABO_LIMITE = Math.floor(655360 / pixelsPorPainel);
  for (let y = 0; y < rows; y++) {
    let row: number[] = [];
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] >= 0) {
        row.push(currentCable);
        count++;
        if (count >= CABO_LIMITE) {
          currentCable++;
          count = 0;
        }
      } else {
        row.push(-1);
      }
    }
    cablePerPanel.push(row);
  }
  return { cablePerPanel, rows, cols };
}

const PanelCell = ({
  cableIdx,
  row,
  col,
  rows,
  cols,
  indexInPanel,
  highlight,
}: {
  cableIdx: number,
  row: number,
  col: number,
  rows: number,
  cols: number,
  indexInPanel: number,
  highlight: boolean,
}) => {
  // auto-label tipo 1-1, 1-2, etc
  const label = `${row + 1}-${col + 1}`;
  const color = CABLE_COLORS[cableIdx % CABLE_COLORS.length];
  const panelBg = PANEL_BG_COLORS[cableIdx % PANEL_BG_COLORS.length];
  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{
        width: `130px`,
        height: `110px`,
        margin: "6px",
        background: panelBg,
        border: highlight ? `2.5px solid ${color}` : `2px solid #d1d5db`,
        borderRadius: "9px",
        boxShadow: highlight ? `0 4px 15px ${color}55` : "0 1.5px 5px #0001",
      }}
    >
      <div style={{
        position: "absolute",
        left: 10,
        top: 7,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: 0.1,
        color: "#222",
        pointerEvents: "none",
        opacity: 0.70,
      }}>{label}</div>
      {/** Ligação tipo S -> ... -> E por cabo */}
      <div className="flex flex-row items-center w-full h-full justify-center z-10 relative">
        {col === 0 && (
          <div className="flex flex-col items-center mr-[-8px]">
            <div style={{
              background: color,
              color: "white",
              fontWeight: "bold",
              borderRadius: "50%",
              width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, boxShadow: `0 1px 8px ${color}20`
            }}>S</div>
          </div>
        )}
        <div style={{
          flex: 1,
          height: "5px",
          background: color,
          borderRadius: "2.5px",
          marginLeft: col === 0 ? 6 : 0,
          marginRight: col === cols - 1 ? 6 : 0,
          position: "relative",
          zIndex: 2,
        }}>
          {/* seta final */}
          {col === cols - 1 && (
            <>
              <div style={{
                position: "absolute",
                right: -14,
                top: -9,
                width: 20,
                height: 20,
                pointerEvents: "none",
              }}>
                {/* E */}
                <div style={{
                  background: color,
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  width: 32, height: 32,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 15, boxShadow: `0 1px 8px ${color}40`,
                  left: 0, top: 0, position: "relative"
                }}>E</div>
                {/* seta -> */}
                <div style={{
                  borderTop: `5px solid transparent`,
                  borderBottom: `5px solid transparent`,
                  borderLeft: `12px solid ${color}`,
                  position: "absolute",
                  left: -13,
                  top: 7,
                }}></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Legenda de cabos (inspirado no original)
const EthernetLegend = ({ count }: { count: number }) => (
  <div>
    <div className="font-medium mb-1 mt-2 flex items-center gap-2">
      <EthernetPort size={21} className="mr-1 -ml-1" />
      <span style={{ letterSpacing: 0.1 }}>Ethernet Port</span>
    </div>
    <div className="grid grid-cols-3 gap-2 w-[150px]">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-primary flex items-center justify-center"
          style={{
            background: PANEL_BG_COLORS[idx % PANEL_BG_COLORS.length],
            outline: idx === 1 ? `2.5px solid ${CABLE_COLORS[1]}` : "none",
          }}
        >
          <div
            className="m-2"
            style={{
              background: "#118769",
              color: "white",
              borderRadius: "24px",
              width: "38px", height: "33px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 19, fontWeight: 700,
              boxShadow: "0 1px 8px #2222"
            }}
          >
            {idx + 1}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LEDPanelSchematic = ({ result }: { result: CalculationResult }) => {
  const { cablePerPanel, rows, cols } = getCableAssignment(result);

  if (!result || rows === 0 || cols === 0) return null;

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-6 sm:gap-12 mt-4 justify-center items-center">
      {/* Legenda à esquerda */}
      <EthernetLegend count={result.networkCablesNeeded} />
      {/* Matriz com painéis e cabeamento */}
      <div
        style={{
          border: "1.5px solid #eee",
          borderRadius: 15,
          background: "#f8f8ff",
          padding: "24px 22px",
          minWidth: `${cols * 130 + 26}px`,
          minHeight: `${rows * 110 + 36}px`,
          position: "relative",
          boxShadow: "0 8px 29px #ccc4",
        }}
      >
        <div>
          {cablePerPanel.map((r, ridx) => (
            <div key={ridx} className="flex flex-row">
              {r.map((cable, cidx) =>
                cable === -1 ? (
                  <div
                    key={cidx}
                    style={{
                      width: 130, height: 110,
                      margin: "6px",
                      background: "#f3f3f3",
                      borderRadius: "7px",
                      border: "2px dashed #eeeeee",
                    }}
                  />
                ) : (
                  <PanelCell
                    key={cidx}
                    cableIdx={cable}
                    row={ridx}
                    col={cidx}
                    rows={rows}
                    cols={cols}
                    indexInPanel={ridx * cols + cidx}
                    highlight={true}
                  />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LEDPanelSchematic;
