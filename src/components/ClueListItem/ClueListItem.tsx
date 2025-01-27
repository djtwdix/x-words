import { Orientation, usePuzzleContext } from "../../contexts/PuzzleContext";
import { PuzzleCellData } from "../../puzzleData";
import { PuzzleGrid } from "../PuzzleGrid/PuzzleGrid";
import "./ClueListItem.css";

export interface ClueListItemProps {
  index: number;
  clue: string;
  autoCheck: boolean;
  orientation: Orientation;
}

export const ClueListItem = ({ clue, orientation }: ClueListItemProps) => {
  const { selectedListViewClue, setSelectedListViewClue } = usePuzzleContext();
  let className = "clueListItem";
  if (clue === selectedListViewClue) className += " selected";

  const clueNumber = Number(clue[0]);

  const { puzzleInfo } = usePuzzleContext();

  const letterGrid: PuzzleCellData[] = [];

  puzzleInfo.grid.forEach((letterObj) => {
    if (letterObj.clues?.[orientation] === clueNumber) {
      letterGrid.push(letterObj);
    }
  });

  return (
    <div className={className} onClick={() => setSelectedListViewClue(clue)}>
      <h4>{clue}</h4>
      {
        <PuzzleGrid
          letterGrid={letterGrid}
          size={letterGrid.length}
          selectedInListView={clue === selectedListViewClue}
        />
      }
    </div>
  );
};
