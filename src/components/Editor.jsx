import { useState, useEffect, useRef, useCallback } from "react";
import { SketchPicker } from "react-color";
import Grid from "./Grid";
import useStateWithLocalStorage from "../hooks/localStorage";
import {
  defaultColors,
  maxPresetColors,
  initialCells,
  gridDimensions,
} from "../constants/constants";
import useWebSocket from "react-use-websocket";
import { useQuery } from "react-query";
import { hexToRGB565, RGB565ToHex } from "../utils/hexConverter";
import ImgDownloader from "./ImgDownloader";

const Editor = () => {
  const [cells, setCells] = useStateWithLocalStorage("cells", initialCells);
  const [cellsHistory, setCellsHistory] = useState({ historyIdx: -1, historyData: [] });
  const [presetColors, setPresetColors] = useStateWithLocalStorage("preset_colors", []);
  const [currentColor, setCurrentColor] = useState(defaultColors.colorPickerInitial);
  const currentColorRef = useRef(currentColor);
  currentColorRef.current = currentColor;
  const [socketUrl, setSocketUrl] = useState(null);

  // const { data } = useQuery("imgFromEsp", async () => {
  //   const res = await fetch("http://192.168.0.14/img/onscreen");
  //   const colorsString = await res.text();
  //   const colorsArray = colorsString.split(",");
  //   setCells(() => colorsArray.map((color) => RGB565ToHex(color)));
  // });

  const { sendMessage, sendJsonMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log("websocket open"),
    onClose: () => console.log("closing ws"),
    //Will attempt to reconnect on all close events, such as server shutting down
    // shouldReconnect: () => true,
  });

  const handleChangeSocketUrl = useCallback((newUrl) => setSocketUrl(newUrl), []);

  const handleSendMessageWebsocket = useCallback(
    (cellIdx, color, fill = false) => {
      if (socketUrl && readyState === 1) {
        if (fill) {
          sendJsonMessage({ fill: "fill", color: hexToRGB565(color) });
          return;
        }
        sendJsonMessage({ cellIdx, color: hexToRGB565(color) });
      }
    },
    [socketUrl, readyState, sendJsonMessage]
  );

  const fillAllCells = (init = false) => {
    setCells(init ? initialCells : (cells) => cells.map(() => currentColor));
    handleSendMessageWebsocket(0, init ? defaultColors.blank : currentColor, true);
  };

  const storeOnEsp = () => {
    if (socketUrl && readyState === 1) {
      const colors16array = cells.map((cell) => hexToRGB565(cell));
      sendMessage(colors16array.join(","));
    }
  };

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
    <div className="editor">
      <Grid
        cells={cells}
        setCells={setCells}
        setCellsHistory={setCellsHistory}
        blankCell={defaultColors.blank}
        currentColor={currentColor}
        sendMessageWebsocket={handleSendMessageWebsocket}
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
            onClick={() => fillAllCells(true)}
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
            onClick={() => fillAllCells()}
            style={{ backgroundColor: currentColor, color: "white" }}
          />
          <input
            className="generic-btn"
            type="button"
            value={readyState === 1 ? "connected" : "connect websocket"}
            onClick={() => handleChangeSocketUrl("ws://192.168.0.14/display")}
            disabled={readyState === 1}
          />
          {readyState === 1 && (
            <input
              className="generic-btn"
              type="button"
              value="store"
              onClick={() => storeOnEsp()}
            />
          )}
          <ImgDownloader cells={cells} size={gridDimensions.height} scale={4} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
