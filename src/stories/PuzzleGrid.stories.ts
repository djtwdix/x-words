import { PuzzleGrid } from "../components/PuzzleGrid/PuzzleGrid";
import { puzzleData } from "../puzzleData";

const meta = {
  title: "PuzzleGrid",
  component: PuzzleGrid,
};

export default meta;

export const Default = {
  args: {
    letterGrid: puzzleData.grid,
    size: puzzleData.size.cols,
  },
};

export const WithAutoCheck = {
  args: {
    letterGrid: puzzleData.grid,
    size: puzzleData.size.cols,
    autoCheck: true,
  },
};
