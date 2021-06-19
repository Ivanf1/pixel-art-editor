import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  grid: {
    display: "grid",
    gridTemplateRows: "repeat(60, 1fr)",
    gridTemplateColumns: "repeat(60, 1fr)",
    gridColumnStart: 1,
    gridColumnEnd: 1,
    gridRowStart: 2,
    gridRowEnd: "span 4",
    width: "90vh",
    height: "90vh",
    placeSelf: "center",
  },
  cell: {
    cursor: "pointer",
    outline: "1px solid black",
    background: "white",
    transition: "all 30ms linear",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
});

export default useStyles;
