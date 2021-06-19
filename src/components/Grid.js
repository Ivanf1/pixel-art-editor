import useStyles from "./Grid.styles";

const blankCell = {
  color: "#ffffff",
};

const Grid = ({ currentColor, cells, setCells }) => {
  const classes = useStyles();

  const updateCell = (i, defaultState) => (e) => {
    e.preventDefault();
    setCells(
      cells.map((cell, cellIdx) => {
        if (cellIdx === i) {
          return defaultState ? defaultState : { color: currentColor };
        }
        return cell;
      })
    );
  };

  return (
    <div className={classes.grid}>
      {cells.map((cell, i) => (
        <div
          key={i}
          style={{ background: cell.color }}
          className={classes.cell}
          onClick={updateCell(i)}
          onContextMenu={updateCell(i, blankCell)}
        ></div>
      ))}
    </div>
  );
};

export default Grid;
