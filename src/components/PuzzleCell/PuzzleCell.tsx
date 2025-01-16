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
  blank,
}: PuzzleCellProps) => {
  let className = "square";
  if (highlighted) className += " highlighted";
  if (selected) className += " selected";
  if (autoCheck && guess === answer) className += " autoCheckCorrect";
  if (blank) className += " blank";

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
