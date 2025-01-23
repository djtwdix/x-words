import { PuzzleCell } from "../components/PuzzleCell/PuzzleCell";
import "../index.css";

const meta = {
  title: "Components/PuzzleCell",
  component: PuzzleCell,
};

export default meta;

export const Empty = {
  args: {
    guess: "",
  },
};

export const WithLetter = {
  args: {
    guess: "D",
  },
};

export const Highlighted = {
  args: {
    guess: "D",
    highlighted: true,
  },
};

export const Selected = {
  args: {
    guess: "D",
    selected: true,
  },
};

export const Blank = {
  args: {
    blank: true,
  },
};

export const WithClueNumber = {
  args: {
    clueNumber: 6,
    guess: "D",
  },
};

export const AutoCheckCorrect = {
  args: {
    clueNumber: 6,
    guess: "D",
    autoCheck: true,
    answer: "D",
  },
};

export const AutoCheckCorrectHighlighted = {
  args: {
    clueNumber: 6,
    guess: "D",
    autoCheck: true,
    answer: "D",
    highlighted: true,
  },
};

export const AutoCheckCorrectSelected = {
  args: {
    clueNumber: 6,
    guess: "D",
    autoCheck: true,
    answer: "D",
    selected: true,
  },
};

export const AutoCheckWrong = {
  args: {
    clueNumber: 6,
    guess: "D",
    autoCheck: true,
    answer: "T",
  },
};

export const AutoCheckWrongHighlighted = {
  args: {
    clueNumber: 6,
    guess: "D",
    autoCheck: true,
    answer: "T",
    highlighted: true,
  },
};

export const AutoCheckWrongSelected = {
  args: {
    clueNumber: 6,
    guess: "D",
    autoCheck: true,
    answer: "T",
    selected: true,
  },
};
