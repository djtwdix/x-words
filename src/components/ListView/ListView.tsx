import { usePuzzleContext } from "../../contexts/PuzzleContext";
import { ClueList } from "../ClueList/ClueList";
import "./ListView.css";

export const ListView = () => {
  const { puzzleInfo } = usePuzzleContext();
  return (
    <div>
      {/* <h4>Across</h4> */}
      <ClueList
        clues={puzzleInfo.clues.across}
        answers={puzzleInfo.answers.across}
        orientation={"across"}
      />
      {/* <h4>Down</h4> */}
      <ClueList
        clues={puzzleInfo.clues.down}
        answers={puzzleInfo.answers.down}
        orientation={"down"}
      />
    </div>
  );
};
