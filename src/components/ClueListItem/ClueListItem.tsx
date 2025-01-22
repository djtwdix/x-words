import { usePuzzleContext } from "../../contexts/PuzzleContext";
import { PuzzleCellData } from "../../puzzleData";
import { PuzzleGrid } from "../PuzzleGrid/PuzzleGrid";
import "./ClueListItem.css";

export interface ClueListItemProps {
  index: number;
  clue: string;
  autoCheck: boolean;
  handleSelect: (index: number) => void;
  selected: boolean;
}

export const ClueListItem = ({
  index,
  clue,
  autoCheck,
  handleSelect,
  selected,
}: ClueListItemProps) => {
  let className = "clueListItem";
  if (selected) className += " selected";

  const clueNumber = Number(clue[0]);

  const { puzzleInfo } = usePuzzleContext();

  const letterGrid: PuzzleCellData[] = [];

  puzzleInfo.grid.forEach((letterObj) => {
    if (letterObj.clues?.across === clueNumber) {
      letterGrid.push(letterObj);
    }
  });

  return (
    <div
      className={className}
      onClick={() => handleSelect && handleSelect(index)}
    >
      <h4>{clue}</h4>
      {
        <PuzzleGrid
          letterGrid={letterGrid}
          size={letterGrid.length}
          autoCheck={autoCheck}
          isListView={true}
          selectedInListView={selected}
        />
      }
    </div>
  );
};
