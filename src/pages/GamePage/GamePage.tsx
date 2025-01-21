import { Clue } from "../../components/Clue/Clue";
import { PuzzleGrid } from "../../components/PuzzleGrid/PuzzleGrid";
import { SettingsBar } from "../../components/SettingsBar/SettingsBar";
import { PuzzleData } from "../../puzzleData";
import "./GamePage.css";
import "../../index.css";
import { usePuzzleContext } from "../../contexts/PuzzleContext";
import { ListView } from "../../components/ListView/ListView";

export interface GamePageProps {
  puzzleData: PuzzleData;
}

export const GamePage = ({ puzzleData }: GamePageProps) => {
  const icons = ["list", "edit", "support", "info"];
  const { puzzleInfo, clues, answers, selectedClue } = usePuzzleContext();

  return (
    <div className="gameContainer">
      <SettingsBar icons={icons} />
      <PuzzleGrid
        letterGrid={puzzleInfo.grid}
        autoCheck={false}
        size={puzzleData.size.cols}
      />
      <Clue clue={selectedClue} />
      {/* <ListView clues={clues.across} answers={answers.across} /> */}
    </div>
  );
};
