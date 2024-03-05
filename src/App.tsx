import { useReducer, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import Buttons from "./components/keyField";
import OperationButton from "./components/operationButton";
export const Actions = {
  ADD_DIGIT: "add_digit",
  CHOOSE_OPERATION: "choose_operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete_digit",
  EVALUATE: "evaluate",
};
interface State {
  currentOperand: string;
  previousOperand: string;
  operation: string;
}

export interface Action {
  type: string;
  payload: {
    digit?: string;
    operation?: string;
  };
}
const evaluate = ({
  currentOperand,
  previousOperand,
  operation,
}: {
  currentOperand: string;
  previousOperand: string;
  operation: string;
}) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = 0;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }
  return computation.toString();
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.ADD_DIGIT:
      if (action.payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (action.payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      } else {
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${
            action.payload.digit
          }`,
        };
      }
    case Actions.CHOOSE_OPERATION:
      if (state.currentOperand === "" && state.previousOperand === "") {
        return state;
      }
      if (state.currentOperand === "") {
        return {
          ...state,
          operation: action.payload.operation || "",
        };
      }
      if (state.previousOperand === "") {
        return {
          ...state,
          operation: action.payload.operation || "",
          previousOperand: state.currentOperand,
          currentOperand: "",
        };
      }

      return {
        ...state,
        previousOperand: evaluate({
          currentOperand: state.currentOperand,
          previousOperand: state.previousOperand,
          operation: state.operation,
        }),
        operation: action.payload.operation || "",
        currentOperand: "",
      };
    case Actions.CLEAR:
      return { currentOperand: "", previousOperand: "", operation: "" };

    case Actions.EVALUATE:
      if (
        state.operation === null ||
        state.currentOperand === null ||
        state.previousOperand === null
      ) {
        return state;
      }
      return {
        previousOperand: "",
        operation: "",
        currentOperand: "",
      };

    case Actions.DELETE_DIGIT:
      return { ...state, currentOperand: state.currentOperand.slice(0, -1) };
    default:
      return state;
  }
};

const KeyField: React.FC = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {
      currentOperand: "",
      previousOperand: "",
      operation: "",
    }
  );

  const [result, setResult] = useState("");

  const handleResultDiv = () => {
    setResult(evaluate({ currentOperand, previousOperand, operation }));
    dispatch({ type: Actions.EVALUATE, payload: {} });
  };
  useHotkeys("1", () =>
    dispatch({ type: Actions.ADD_DIGIT, payload: { digit: "1" } })
  );
  useHotkeys("2", () =>
    dispatch({ type: Actions.ADD_DIGIT, payload: { digit: "2" } })
  );
  useHotkeys("3", () =>
    dispatch({ type: Actions.ADD_DIGIT, payload: { digit: "3" } })
  );
  useHotkeys("4", () =>
    dispatch({ type: Actions.ADD_DIGIT, payload: { digit: "4" } })
  );
  useHotkeys("5", () =>
    dispatch({ type: Actions.ADD_DIGIT, payload: { digit: "5" } })
  );
  useHotkeys("6", () =>
    dispatch({ type: Actions.ADD_DIGIT, payload: { digit: "6" } })
  );
  useHotkeys("7", () =>
    dispatch({ type: Actions.ADD_DIGIT, payload: { digit: "7" } })
  );
  useHotkeys("8", () =>
    dispatch({ type: Actions.ADD_DIGIT, payload: { digit: "8" } })
  );
  useHotkeys("9", () =>
    dispatch({ type: Actions.ADD_DIGIT, payload: { digit: "9" } })
  );
  useHotkeys("0", () =>
    dispatch({ type: Actions.ADD_DIGIT, payload: { digit: "0" } })
  );
  useHotkeys(".", () =>
    dispatch({ type: Actions.ADD_DIGIT, payload: { digit: "." } })
  );
  useHotkeys("backspace", () =>
    dispatch({ type: Actions.DELETE_DIGIT, payload: {} })
  );

  const buttonClass =
    "px-6 py-3 text-white rounded-xl bg-red-600 hover:bg-gradient-to-r from-red-600 to-red-300 font-bold font-mono";

  return (
    <div className="p-4 bg-gray-800/50 w-80 ">
      <div className="bg-gray-900 py-4 px-6 rounded-t-md flex justify-between">
        <div>
          <div className="text-white text-xl ">{previousOperand}</div>
          <div className="text-gray-500">{currentOperand}</div>
        </div>

        <div className="text-white">{operation}</div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <button
          onClick={() => dispatch({ type: Actions.CLEAR, payload: {} })}
          className={`${buttonClass} col-span-2 `}
        >
          AC
        </button>
        <button
          onClick={() => {
            dispatch({ type: Actions.DELETE_DIGIT, payload: {} });
          }}
          className={`${buttonClass} flex justify-center`}
        >
          DEL
        </button>
        <OperationButton operation="÷" dispatch={dispatch} />

        <Buttons digit="1" dispatch={dispatch} />
        <Buttons digit="2" dispatch={dispatch} />
        <Buttons digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <Buttons digit="4" dispatch={dispatch} />
        <Buttons digit="5" dispatch={dispatch} />
        <Buttons digit="6" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />

        <Buttons digit="7" dispatch={dispatch} />
        <Buttons digit="8" dispatch={dispatch} />
        <Buttons digit="9" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />

        <Buttons digit="." dispatch={dispatch} />
        <Buttons digit="0" dispatch={dispatch} />
        <button
          onClick={() => {
            handleResultDiv();
          }}
          className="px-6 py-3 text-white rounded-xl  col-span-2 bg-orange-500 hover:bg-gradient-to-l from-orange-500 to-orange-300 font-extrabold"
        >
          =
        </button>
      </div>

      <div className="mt-6 bg-gray-900 p-4 rounded-md">
        <div className="text-gray-300">Output:</div>
        <div className="text-white text-2xl font-bold">{result}</div>
      </div>
    </div>
  );
};

export default KeyField;
