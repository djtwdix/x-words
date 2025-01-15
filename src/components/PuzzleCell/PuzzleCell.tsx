import "./PuzzleCell.css";

export interface PuzzleCellProps {
  selected?: boolean;
  highlighted?: boolean;
  letter?: string;
  answer?: string | null;
  blank?: boolean;
  clueNumber?: number;
  autoCheck?: boolean;
}

export const PuzzleCell = ({
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
  const autoCheckWrong = autoCheck && letter !== answer;

  return (
    <div className={className}>
      <h6 className="clueNumber">{clueNumber}</h6>
      <h2 className="letter">{letter}</h2>
      {autoCheckWrong && <div className="autoCheckWrong"></div>}
    </div>
  );
};
