import { Clue } from "../components/Clue/Clue";
import { puzzleData } from "../puzzleData";
import "../index.css";

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
