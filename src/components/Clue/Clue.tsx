import { usePuzzleContext } from "../../contexts/PuzzleContext";
import "./Clue.css";

export interface ClueProps {
  clue: string;
}

export const Clue = ({ clue }: ClueProps) => {
  const { handleArrowNav } = usePuzzleContext();

  return (
    <div className="clue">
      <span
        onClick={() => handleArrowNav("back")}
        className="material-icons icon"
      >
        arrow_back_ios
      </span>
      <h4>{clue}</h4>
      <span
        onClick={() => handleArrowNav("forward")}
        className="material-icons icon"
      >
        arrow_forward_ios
      </span>
    </div>
  );
};
