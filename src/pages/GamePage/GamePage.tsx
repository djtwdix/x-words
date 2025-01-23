import { Clue } from "../../components/Clue/Clue";
import { PuzzleGrid } from "../../components/PuzzleGrid/PuzzleGrid";
import { SettingsBar } from "../../components/SettingsBar/SettingsBar";
import { PuzzleData } from "../../puzzleData";
import { ListView } from "../../components/ListView/ListView";
import { usePuzzleContext } from "../../contexts/PuzzleContext";
import "./GamePage.css";
import "../../index.css";

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
        <ListView />
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
