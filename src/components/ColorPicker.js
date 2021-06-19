import useStyles from "./ColorPicker.styles";

const ColorPicker = ({ currentColor, onSetColor }) => {
  const classes = useStyles();

  const colorChange = (e) => {
    onSetColor(e.target.value);
  };
  return (
    <input
      className={classes.colorPicker}
      type="color"
      value={currentColor}
      onChange={colorChange}
    />
  );
};

export default ColorPicker;
