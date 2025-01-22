import { ClueList } from "../components/ClueList/ClueList";
import { puzzleData } from "../puzzleData";

const meta = {
  title: "Components/ClueList",
  component: ClueList,
};

export default meta;

export const Default = {
  args: {
    clues: puzzleData.clues.across,
    answers: puzzleData.answers.across,
  },
};
