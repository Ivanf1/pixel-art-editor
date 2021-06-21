import useStyles from "./Grid.styles";

const Grid = ({ currentColor, cells, setCells, blankCell }) => {
  const classes = useStyles();

  const updateCell = (i, defaultState) => (e) => {
    e.preventDefault();
    setCells(
      cells.map((cell, cellIdx) => {
        if (cellIdx === i) {
          return defaultState ? defaultState : currentColor;
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
          style={{ background: cell }}
          className={classes.cell}
          onClick={updateCell(i)}
          onContextMenu={updateCell(i, blankCell)}
        ></div>
      ))}
    </div>
  );
};

export default Grid;
