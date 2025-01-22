import { usePuzzleContext } from "../../contexts/PuzzleContext";
import "./PuzzleCell.css";

export interface PuzzleCellProps {
  handleCellClick: (index: number, clickCount: number) => void;
  selected?: boolean;
  highlighted?: boolean;
  guess?: string;
  answer?: string | null;
  blank?: boolean;
  clueNumber?: number;
  autoCheck?: boolean;
  index: number;
  isListView?: boolean | undefined;
  selectedInListView?: boolean | undefined;
}

export const PuzzleCell = ({
  handleCellClick,
  index,
  selected,
  guess,
  answer,
  highlighted,
  clueNumber,
  isListView,
  selectedInListView,
  blank,
}: PuzzleCellProps) => {
  let className = "cell";
  const { autoCheck, pencil } = usePuzzleContext();

  if (highlighted && !isListView) className += " highlighted";
  if (selected) {
    //if in listview but the item is not selected we don't want squares to select
    className += isListView
      ? selectedInListView
        ? " selected"
        : ""
      : " selected";
  }
  if (autoCheck && guess === answer) className += " autoCheckCorrect";
  if (blank) className += " blank";
  if (isListView) className += " inListView";
  if (pencil) className += " pencil";

  const autoCheckWrong = autoCheck && guess && guess !== answer;

  return (
    <div
      className={className}
      onClick={(e) => {
        handleCellClick(index, e.detail);
      }}
    >
      {!isListView && <h6 className="clueNumber">{clueNumber}</h6>}
      <h2 className="guess">{guess}</h2>
      {autoCheckWrong && <div className="autoCheckWrong"></div>}
    </div>
  );
};
