import useStyles from "./Grid.styles";
import { useState } from "react";

const Grid = () => {
  const [cells] = useState(Array.from({ length: 3600 }));
  const classes = useStyles();
  return (
    <div className={classes.grid}>
      {cells.map(() => (
        <div className={classes.cell}></div>
      ))}
    </div>
  );
};

export default Grid;
