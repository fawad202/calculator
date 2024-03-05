import { Actions, Action } from "../App";
import { Dispatch } from "react";

interface operationProps {
  dispatch: Dispatch<Action>;
  operation: string;
}

const OperationButton: React.FC<operationProps> = ({ operation, dispatch }) => {
  const buttonClass =
    "px-6 py-3 text-white rounded-xl bg-red-600 hover:bg-gradient-to-r from-red-600 to-red-300 font-bold font-mono";
  return (
    <div>
      <button
        className={buttonClass}
        onClick={() =>
          dispatch({ type: Actions.CHOOSE_OPERATION, payload: { operation } })
        }
      >
        {operation}
      </button>
    </div>
  );
};

export default OperationButton;
