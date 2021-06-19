import { useState, useMemo } from "react";
import useStyles from "./App.styles";
import Grid from "./components/Grid";
import ColorPicker from "./components/ColorPicker";

const blankCell = {
  color: "#ffffff",
};

const initialCells = Array.from({ length: 3600 }, () => blankCell);

function App() {
  const [cells, setCells] = useState(initialCells);
  const [currentColor, setCurrentColor] = useState("#2C2C54");
  // const [colorHistory, setColorHistory] = useState([]);
  const classes = useStyles();

  const colorSwatch = useMemo(
    () => [
      ...new Set(
        cells
          .filter((cell) => cell !== blankCell)
          .map((cell) => cell.color)
          .slice(-12)
      ),
    ],
    [cells]
  );

  const clearGrid = () => {
    setCells(initialCells);
  };

  // const onSetColor = (color) => {
  //   setColorHistory(colorHistory.slice(-9).concat(color));
  //   setCurrentColor(color);
  // };

  return (
    <div className={classes.app}>
      <Grid cells={cells} setCells={setCells} currentColor={currentColor} />
      <ColorPicker currentColor={currentColor} onSetColor={setCurrentColor} />
      <div className={classes.colorSwatchContainer}>
        {colorSwatch.map((color) => (
          <div
            key={color}
            onClick={() => setCurrentColor(color)}
            className={classes.colorSwatch}
            style={{ background: color }}
          ></div>
        ))}
      </div>
      <div className={classes.clearGridContainer}>
        <input
          className={classes.clearGridBtn}
          type="button"
          value="clear grid"
          onClick={clearGrid}
        />
      </div>
    </div>
  );
}

export default App;
