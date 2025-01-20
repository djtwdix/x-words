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
  inListView?: boolean | undefined;
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
  autoCheck,
  inListView,
  selectedInListView,
  blank,
}: PuzzleCellProps) => {
  let className = "square";
  if (highlighted && !inListView) className += " highlighted";
  if (selected) {
    //if in listview but the item is not selected we don't want squares to highlight
    className += inListView
      ? selectedInListView
        ? " selected"
        : ""
      : " selected";
  }
  if (autoCheck && guess === answer) className += " autoCheckCorrect";
  if (blank) className += " blank";
  if (inListView) className += " inListView";

  const autoCheckWrong = autoCheck && guess && guess !== answer;

  return (
    <div
      className={className}
      onClick={(e) => {
        handleCellClick(index, e.detail);
      }}
    >
      <h6 className="clueNumber">{clueNumber}</h6>
      <h2 className="guess">{guess}</h2>
      {autoCheckWrong && <div className="autoCheckWrong"></div>}
    </div>
  );
};
