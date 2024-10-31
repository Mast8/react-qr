import { useContext, useEffect, useState } from "react"
import { ChromePicker } from "react-color";
import { InputContext } from "../App";

const InputColor = () => {
  const [color, setColor] = useState('#054080');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  // context
  const { inputValue, setInputValue } = useContext(InputContext);
  useEffect(() => {
    setInputValue({ ...inputValue, color: color });
  }, [color]);

  const handleChange = color => setColor(color.hex);

  return (
    <div>
      <label
        className="font-semibold text-md"
      >Color</label>
      <div className="color-picker">
        <div
          onClick={() => setDisplayColorPicker(!displayColorPicker)}
          style={{ background: color }}
          className="w-10 h-8 cursor-pointer border-4"></div>
        <span>{color}</span>
      </div>
      {
        displayColorPicker && (
          <div className="">
            <ChromePicker color={color} onChange={handleChange} />
          </div>
        )
      }
    </div>
  )
}

export default InputColor