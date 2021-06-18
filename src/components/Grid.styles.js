import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  grid: {
    display: "grid",
    gridTemplateRows: "repeat(60, 1fr)",
    gridTemplateColumns: "repeat(60, 1fr)",
    width: "90vh",
    height: "90vh",
    outline: "2px solid black",
  },
  cell: {
    cursor: "pointer",
    outline: "1px solid black",
  },
});

export default useStyles;
