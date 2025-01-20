import { Clue } from "../components/Clue/Clue";
import { puzzleData } from "../puzzleData";

const meta = {
  title: "Components/Clue",
  component: Clue,
};

export default meta;

export const Default = {
  args: {
    clue: puzzleData.clues.across[0],
  },
};
