import { ListViewItem } from "../components/ListViewItem/ListViewItem";
import { puzzleData } from "../puzzleData";

const meta = {
  title: "ListViewItem",
  component: ListViewItem,
};

export default meta;

export const ExampleOne = {
  args: {
    clue: puzzleData.clues.across[0],
    answer: puzzleData.answers.across[0],
  },
};

export const ExampleOneSelected = {
  args: {
    clue: puzzleData.clues.across[0],
    answer: puzzleData.answers.across[0],
    selected: true,
  },
};

export const ExampleOneWithAutoCheck = {
  args: {
    clue: puzzleData.clues.across[0],
    answer: puzzleData.answers.across[0],
    autoCheck: true,
  },
};

export const ExampleTwo = {
  args: {
    clue: puzzleData.clues.across[1],
    answer: puzzleData.answers.across[1],
  },
};

export const ExampleTwoSelected = {
  args: {
    clue: puzzleData.clues.across[1],
    answer: puzzleData.answers.across[1],
    selected: true,
  },
};

export const ExampleTwoWithAutoCheck = {
  args: {
    clue: puzzleData.clues.across[1],
    answer: puzzleData.answers.across[1],
    autoCheck: true,
  },
};
