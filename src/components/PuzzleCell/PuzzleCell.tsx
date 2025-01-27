import { usePuzzleContext } from "../../contexts/PuzzleContext";
import "./PuzzleCell.css";

export interface PuzzleCellProps {
  handleCellClick: (index: number, clickCount: number) => void;
  selected?: boolean;
  highlighted?: boolean;
  guess?: string;
  answer?: string | null;
  blank?: boolean;
  penciled: boolean | undefined;
  autoChecked: boolean | undefined;
  clueNumber?: number;
  index: number;
  selectedInListView?: boolean | undefined;
}

export const PuzzleCell = ({
  handleCellClick,
  index,
  selected,
  guess,
  answer,
  highlighted,
  penciled,
  autoChecked,
  clueNumber,
  selectedInListView,
  blank,
}: PuzzleCellProps) => {
  let className = "cell";
  const { listView } = usePuzzleContext();

  if (highlighted && !listView) className += " highlighted";
  if (selected) {
    //if in listview but the item is not selected we don't want squares to select
    className += listView
      ? selectedInListView
        ? " selected"
        : ""
      : " selected";
  }
  if (autoChecked && guess === answer) className += " autoCheckCorrect";
  if (blank) className += " blank";
  if (listView) className += " inListView";
  if (penciled) className += " pencil";

  const autoCheckWrong = autoChecked && guess && guess !== answer;

  return (
    <div
      className={className}
      onClick={(e) => {
        handleCellClick(index, e.detail);
      }}
    >
      {!listView && <h6 className="clueNumber">{clueNumber}</h6>}
      <h2 className="guess">{guess}</h2>
      {autoCheckWrong && <div className="autoCheckWrong"></div>}
    </div>
  );
};
