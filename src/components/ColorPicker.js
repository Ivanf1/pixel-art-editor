const ColorPicker = ({ currentColor, onSetColor }) => {
  const colorChange = (e) => {
    onSetColor(e.target.value);
  };
  return <input type="color" value={currentColor} onChange={colorChange} />;
};

export default ColorPicker;
