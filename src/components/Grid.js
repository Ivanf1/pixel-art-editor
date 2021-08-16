import { useState, useMemo, useCallback } from "react";
import CellIndexDisplay from "./CellIndexDisplay";

const Grid = ({ currentColor, cells, setCells, setCellsHistory, blankCell }) => {
  const [isCellIndexDisplayVisible, setCellIndexDisplayVisibility] = useState(false);
  const [cellCoordinates, setCellCoordinates] = useState({ x: 0, y: 0 });
  const [displayCoordinates, setDisplayCoordinates] = useState({ x: 0, y: 0 });

  const toggleCellIndexDisplay = useCallback(() => {
    setCellIndexDisplayVisibility((current) => !current);
  }, []);

  const updateCell = useCallback(
    (i, defaultState) => (e) => {
      e.preventDefault();
      setCellsHistory((prevState) => ({
        historyData: [...prevState.historyData, { cellIdx: i, cellPrev: cells[i] }].slice(-10),
        historyIdx: prevState.historyData.length === 10 ? 9 : prevState.historyData.length,
      }));
      setCells(
        cells.map((cell, cellIdx) => {
          return cellIdx === i ? (defaultState ? defaultState : currentColor) : cell;
        })
      );
    },
    [cells, currentColor, setCells, setCellsHistory]
  );

  const updateCoordinates = useCallback(
    (i) => (e) => {
      setDisplayCoordinates({ x: e.clientX + 30, y: e.clientY + 8 });
      setCellCoordinates({ x: i % 64, y: parseInt(i / 64) });
    },
    []
  );

  const cellsElement = useMemo(
    () => (
      <>
        {cells.map((cell, i) => (
          <div
            key={i}
            style={{ background: cell }}
            className="cell"
            onClick={updateCell(i)}
            onContextMenu={updateCell(i, blankCell)}
            onMouseOver={updateCoordinates(i)}
          ></div>
        ))}
      </>
    ),
    [cells, blankCell, updateCell, updateCoordinates]
  );

  return (
    <>
      <CellIndexDisplay
        isVisible={isCellIndexDisplayVisible}
        cellX={cellCoordinates.x}
        cellY={cellCoordinates.y}
        displayX={displayCoordinates.x}
        displayY={displayCoordinates.y}
      />
      <div
        className="grid"
        onMouseEnter={toggleCellIndexDisplay}
        onMouseLeave={toggleCellIndexDisplay}
      >
        {cellsElement}
      </div>
    </>
  );
};

export default Grid;
