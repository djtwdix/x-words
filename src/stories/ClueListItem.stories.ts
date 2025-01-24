import { ClueListItem } from "../components/ClueListItem/ClueListItem";
import { puzzleData } from "../puzzleData";
import "../index.css";

const meta = {
  title: "Components/ClueListItem",
  component: ClueListItem,
};

export default meta;

export const ExampleOne = {
  args: {
    clue: puzzleData.clues.across[0],
    answer: puzzleData.answers.across[0],
    orientation: "across",
    listView: true,
  },
};

export const ExampleOneSelected = {
  args: {
    clue: puzzleData.clues.across[0],
    answer: puzzleData.answers.across[0],
    selectedListViewClue: puzzleData.clues.across[0],
    orientation: "across",
    selected: true,
    listView: true,
  },
};

export const ExampleOneWithAutoCheck = {
  args: {
    clue: puzzleData.clues.across[0],
    answer: puzzleData.answers.across[0],
    orientation: "across",
    autoCheck: true,
    listView: true,
  },
};

export const ExampleTwo = {
  args: {
    clue: puzzleData.clues.across[1],
    answer: puzzleData.answers.across[1],
    orientation: "across",
    listView: true,
  },
};

export const ExampleTwoSelected = {
  args: {
    clue: puzzleData.clues.across[1],
    answer: puzzleData.answers.across[1],
    selectedListViewClue: puzzleData.clues.across[1],
    orientation: "across",
    selected: true,
    listView: true,
  },
};

export const ExampleTwoWithAutoCheck = {
  args: {
    clue: puzzleData.clues.across[1],
    answer: puzzleData.answers.across[1],
    orientation: "across",
    autoCheck: true,
    listView: true,
  },
};
