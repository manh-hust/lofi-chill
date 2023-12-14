import { useContext } from "react";
import Draggable from "react-draggable";
import { ThemeContext } from "../../context";
import Pomodoro from "./Pomodoro";

function ItemModal() {
  const {
    visiableFocusType: { pomodoro },
  } = useContext(ThemeContext);

  return (
    <>
      {pomodoro && (
        <Draggable handle=".handle">
          <div className="relative z-40">
            <Pomodoro />
          </div>
        </Draggable>
      )}
    </>
  );
}

export default ItemModal;
