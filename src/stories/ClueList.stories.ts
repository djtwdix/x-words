import { ClueList } from "../components/ClueList/ClueList";
import { puzzleData } from "../puzzleData";
import "../index.css";

const meta = {
  title: "Components/ClueList",
  component: ClueList,
};

export default meta;

export const Across = {
  args: {
    clues: puzzleData.clues.across,
    answers: puzzleData.answers.across,
    orientation: "across",
  },
};

export const Down = {
  args: {
    clues: puzzleData.clues.down,
    answers: puzzleData.answers.down,
    orientation: "down",
  },
};
