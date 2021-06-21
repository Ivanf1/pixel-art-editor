import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  app: {
    display: "grid",
    width: "100%",
    height: "100%",
    gridTemplateColumns: "80% 20%",
    gridTemplateRows: "40px 30% 100px 5% 1fr 40px",
  },
  colorSwatchContainer: {
    placeSelf: "start",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "start",
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 3,
    gridRowEnd: 3,
  },
  colorSwatch: {
    margin: "0.5rem",
    padding: 0,
    width: "25px",
    height: "25px",
    border: "none",
    cursor: "pointer",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 4,
    gridRowEnd: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  genericBtn: {
    fontSize: "1em",
    minWidth: "200px",
    borderRadius: "5px",
    boxShadow: "rgb(0 0 0 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 15%) 0px 8px 16px",
    borderStyle: "none",
    margin: "1rem",
    padding: "10px",
  },
  sketchPickerContainer: {
    alignSelf: "center",
    justifySelf: "center",
    gridColumnStart: 2,
    gridColumnEnd: 2,
    gridRowStart: 2,
    gridRowEnd: 2,
  },
});

export default useStyles;
