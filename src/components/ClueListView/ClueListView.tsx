import { usePuzzleContext } from "../../contexts/PuzzleContext";
import { ClueList } from "../ClueList/ClueList";
import "./ClueListView.css";

export const ClueListView = () => {
  const { puzzleInfo } = usePuzzleContext();

  return (
    <div>
      <ClueList
        clues={puzzleInfo.clues.across}
        answers={puzzleInfo.answers.across}
        orientation={"across"}
      />
      <ClueList
        clues={puzzleInfo.clues.down}
        answers={puzzleInfo.answers.down}
        orientation={"down"}
      />
    </div>
  );
};
