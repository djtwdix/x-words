import { PuzzleGrid } from "../components/Puzzle/PuzzleGrid";
import { puzzleData } from "../puzzleData";

const meta = {
  title: "PuzzleGrid",
  component: PuzzleGrid,
};

export default meta;

export const Primary = {
  args: {
    puzzleData,
  },
};
