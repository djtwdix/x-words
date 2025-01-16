import { PuzzleGrid } from "../components/Puzzle/PuzzleGrid";
import { puzzleData } from "../puzzleData";

const meta = {
  title: "PuzzleGrid",
  component: PuzzleGrid,
};

export default meta;

export const Default = {
  args: {
    puzzleData,
  },
};

export const WithAutoCheck = {
  args: {
    puzzleData,
    autoCheck: true,
  },
};
