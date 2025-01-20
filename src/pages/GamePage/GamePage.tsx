import { Clue } from "../../components/Clue/Clue";
import { PuzzleGrid } from "../../components/PuzzleGrid/PuzzleGrid";
import { SettingsBar } from "../../components/SettingsBar/SettingsBar";
import { PuzzleData } from "../../puzzleData";
import "./GamePage.css";
import "../../index.css";

export interface GamePageProps {
  puzzleData: PuzzleData;
}

export const GamePage = ({ puzzleData }: GamePageProps) => {
  const icons = ["list", "edit", "support", "info"];
  return (
    <div className="gameContainer">
      <SettingsBar icons={icons} />
      <PuzzleGrid
        letterGrid={puzzleData.grid}
        autoCheck={false}
        size={puzzleData.size.cols}
      />
      <Clue clue={puzzleData.clues.across[0]} />
    </div>
  );
};
