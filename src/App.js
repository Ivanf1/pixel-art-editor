import { useState, useEffect, useRef } from "react";
import { SketchPicker } from "react-color";
import Grid from "./components/Grid";
import useStyles from "./App.styles";

const defaultColors = {
  blank: "#ffffff",
  colorPickerInitial: "#2C2C54",
};

const initialCells = Array.from({ length: 64 * 64 }, () => defaultColors.blank);

function App() {
  const [cells, setCells] = useState(initialCells);
  const [currentColor, setCurrentColor] = useState(defaultColors.colorPickerInitial);
  const [presetColors, setPresetColors] = useState([]);
  const cellsRef = useRef(cells);
  const classes = useStyles();

  useEffect(() => {
    if (cellsRef.current !== cells) {
      setPresetColors((presetColors) => {
        return presetColors.includes(currentColor)
          ? presetColors
          : [...presetColors, currentColor].slice(-12);
      });
      cellsRef.current = cells;
    }
  }, [cells, currentColor]);

  return (
    <div className={classes.app}>
      <Grid
        cells={cells}
        setCells={setCells}
        blankCell={defaultColors.blank}
        currentColor={currentColor}
      />
      <div className={classes.sketchPickerContainer}>
        <SketchPicker
          color={currentColor}
          onChange={(color) => setCurrentColor(color.hex)}
          presetColors={presetColors}
          disableAlpha={true}
        />
      </div>
      <div className={classes.clearGridContainer}>
        <input
          className={classes.clearGridBtn}
          type="button"
          value="clear grid"
          onClick={() => setCells(initialCells)}
        />
        <input
          className={classes.clearGridBtn}
          type="button"
          value="fill grid"
          onClick={() => setCells((cells) => cells.map(() => currentColor))}
          style={{ backgroundColor: currentColor, color: "white" }}
        />
      </div>
    </div>
  );
}

export default App;
