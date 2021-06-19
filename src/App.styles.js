import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  app: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  colorSwatchContainer: {
    display: "flex",
  },
  colorSwatch: {
    margin: "0.5rem",
    padding: 0,
    width: "25px",
    height: "25px",
    border: "none",
    cursor: "pointer",
  },
});

export default useStyles;
