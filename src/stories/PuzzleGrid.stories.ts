import { PuzzleGrid } from "../components/PuzzleGrid/PuzzleGrid";
import { puzzleData } from "../puzzleData";
import "../index.css";

const meta = {
  title: "Components/PuzzleGrid",
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
