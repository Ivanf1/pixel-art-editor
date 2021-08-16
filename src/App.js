import { useState, useEffect, useRef } from "react";
import { SketchPicker } from "react-color";
import Grid from "./components/Grid";
import useStateWithLocalStorage from "./hooks/localStorage";
import { defaultColors, maxPresetColors, initialCells } from "./constants/constants";

const App = () => {
  const [cells, setCells] = useStateWithLocalStorage("cells", initialCells);
  const [cellsHistory, setCellsHistory] = useState({ historyIdx: -1, historyData: [] });
  const [presetColors, setPresetColors] = useStateWithLocalStorage("preset_colors", []);
  const [currentColor, setCurrentColor] = useState(defaultColors.colorPickerInitial);
  const currentColorRef = useRef(currentColor);

  currentColorRef.current = currentColor;

  useEffect(() => {
    setPresetColors((presetColors) => {
      return presetColors.includes(currentColorRef.current)
        ? presetColors
        : presetColors.concat(currentColorRef.current).slice(-maxPresetColors);
    });
  }, [cells, setPresetColors]);

  useEffect(() => {
    const keyboardShortcuts = (e) => {
      // a key - move current color backwards relative to presetColors array
      if (e.keyCode === 65) {
        const prevColorIdx = presetColors.indexOf(currentColorRef.current) - 1;
        const newColorIdx = prevColorIdx >= 0 ? prevColorIdx : 0;
        setCurrentColor(presetColors[newColorIdx]);
        return;
      }

      // f key - move current color forwards relative to presetColors array
      if (e.keyCode === 70) {
        const nextColorIdx = presetColors.indexOf(currentColorRef.current) + 1;
        const newColorIdx =
          nextColorIdx > presetColors.length - 1 ? presetColors.length - 1 : nextColorIdx;
        setCurrentColor(presetColors[newColorIdx]);
        return;
      }

      // Ctrl + shift + z
      if (e.keyCode === 90 && e.ctrlKey && e.shiftKey) {
        if (cellsHistory.historyIdx < cellsHistory.historyData.length - 1) {
          let nextIdx = cellsHistory.historyIdx + 1;
          let tmp;

          setCells((cells) =>
            cells.map((cell, idx) => {
              if (idx === cellsHistory.historyData[nextIdx].cellIdx) {
                tmp = cell;
                return cellsHistory.historyData[nextIdx].cellPrev;
              }
              return cell;
            })
          );
          setCellsHistory((prevState) => {
            return {
              historyData: prevState.historyData.map((stateObj, idx) => {
                return idx === nextIdx ? { ...stateObj, cellPrev: tmp } : stateObj;
              }),
              historyIdx: nextIdx,
            };
          });
          return;
        }
      }

      // Ctrl + z
      if (e.keyCode === 90 && e.ctrlKey && !e.shiftKey) {
        if (cellsHistory.historyIdx >= 0) {
          console.log(cellsHistory);
          let tmp;
          // set the cell to the previous value
          setCells((cells) =>
            cells.map((cell, cellIdx) => {
              if (cellIdx === cellsHistory.historyData[cellsHistory.historyIdx].cellIdx) {
                // save current value in tmp variable
                tmp = cell;
                return cellsHistory.historyData[cellsHistory.historyIdx].cellPrev;
              }
              return cell;
            })
          );
          setCellsHistory((prevState) => {
            return {
              historyData: prevState.historyData.map((h, hIdx) => {
                // set the cell history for the cell to the current value from the tmp variable
                return hIdx === cellsHistory.historyIdx ? { ...h, cellPrev: tmp } : h;
              }),
              historyIdx: prevState.historyIdx - 1,
            };
          });
        }
        return;
      }
    };

    document.addEventListener("keydown", keyboardShortcuts, false);

    return () => {
      document.removeEventListener("keydown", keyboardShortcuts, false);
    };
  }, [presetColors, cellsHistory, setCells]);

  return (
    <div className="app">
      <Grid
        cells={cells}
        setCells={setCells}
        setCellsHistory={setCellsHistory}
        blankCell={defaultColors.blank}
        currentColor={currentColor}
      />
      <div className="right-panel">
        <div className="sketch-picker-container">
          <SketchPicker
            color={currentColor}
            onChange={(color) => setCurrentColor(color.hex)}
            presetColors={presetColors}
            disableAlpha={true}
          />
        </div>
        <div className="buttons-container">
          <input
            className="generic-btn"
            type="button"
            value="clear grid"
            onClick={() => setCells(initialCells)}
          />
          <input
            className="generic-btn"
            type="button"
            value="clear color history"
            onClick={() => setPresetColors([])}
          />
          <input
            className="generic-btn"
            type="button"
            value="fill grid"
            onClick={() => setCells((cells) => cells.map(() => currentColor))}
            style={{ backgroundColor: currentColor, color: "white" }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
