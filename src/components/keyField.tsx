import { Actions, Action } from "../App";
import { Dispatch } from "react";

interface ButtonProps {
  dispatch: Dispatch<Action>;
  digit: string;
}

const Buttons: React.FC<ButtonProps> = ({ dispatch, digit }) => {
  const buttonClass =
    "px-6 py-3 text-white rounded-xl bg-red-600 hover:bg-gradient-to-r from-red-600 to-red-300 font-bold font-mono";
  return (
    <div>
      <button
        className={buttonClass}
        onClick={() =>
          dispatch({ type: Actions.ADD_DIGIT, payload: { digit } })
        }
      >
        {digit}
      </button>
    </div>
  );
};

export default Buttons;
