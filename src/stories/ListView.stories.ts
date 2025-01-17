import { ListView } from "../components/ListView/ListView";
import { puzzleData } from "../puzzleData";

const meta = {
  title: "ListView",
  component: ListView,
};

export default meta;

export const Default = {
  args: {
    clues: puzzleData.clues.across,
    answers: puzzleData.answers.across,
  },
};
