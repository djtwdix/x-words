import { GamePage } from "../pages/GamePage/GamePage";
import { puzzleData } from "../puzzleData";
import "../index.css";

const meta = {
  title: "Pages/Crossword",
  component: GamePage,
};

export default meta;

export const Default = {
  args: {
    puzzleData: puzzleData,
  },
};
