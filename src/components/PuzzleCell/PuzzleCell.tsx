import "./PuzzleCell.css";

export interface PuzzleCellProps {
  handleCellClick: (index: number, clickCount: number) => void;
  selected?: boolean;
  highlighted?: boolean;
  letter?: string;
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
  letter,
  answer,
  highlighted,
  clueNumber,
  autoCheck,
  blank,
}: PuzzleCellProps) => {
  let className = "square";
  if (highlighted) className += " highlighted";
  if (selected) className += " selected";
  if (autoCheck && letter === answer) className += " autoCheckCorrect";
  if (blank) className += " blank";

  const autoCheckWrong = autoCheck && letter && letter !== answer;

  return (
    <div
      className={className}
      onClick={(e) => {
        handleCellClick(index, e.detail);
      }}
    >
      <h6 className="clueNumber">{clueNumber}</h6>
      <h2 className="letter">{letter}</h2>
      {autoCheckWrong && <div className="autoCheckWrong"></div>}
    </div>
  );
};
