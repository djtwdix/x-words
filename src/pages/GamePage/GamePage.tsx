import { Clue } from "../../components/Clue/Clue";
import { PuzzleGrid } from "../../components/PuzzleGrid/PuzzleGrid";
import { SettingsBar } from "../../components/SettingsBar/SettingsBar";
import { PuzzleData } from "../../puzzleData";
import "./GamePage.css";
import "../../index.css";
import { ClueList } from "../../components/ClueList/ClueList";
import { usePuzzleContext } from "../../contexts/PuzzleContext";

export interface GamePageProps {
  puzzleData: PuzzleData;
}

export const GamePage = ({ puzzleData }: GamePageProps) => {
  const icons = ["list", "edit", "support", "info"];
  const { puzzleInfo, listView, selectedClue } = usePuzzleContext();
  return (
    <div className="gameContainer">
      <SettingsBar icons={icons} />
      {listView ? (
        <ClueList
          clues={puzzleInfo.clues.across}
          answers={puzzleInfo.answers.down}
        />
      ) : (
        <>
          <PuzzleGrid
            letterGrid={puzzleInfo.grid}
            autoCheck={false}
            size={puzzleInfo.size.cols}
          />
          <Clue clue={selectedClue} />
        </>
      )}
    </div>
  );
};
