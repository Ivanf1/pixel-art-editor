const CellIndexDisplay = ({ isVisible, cellX, cellY, displayX, displayY }) => {
  return (
    <div
      className="cell-index-display"
      style={{ display: isVisible ? "flex" : "none", left: displayX, top: displayY }}
    >
      <span id="x-cell-idx">x: {cellX}</span>
      <span id="y-cell-idx">y: {cellY}</span>
    </div>
  );
};

export default CellIndexDisplay;
