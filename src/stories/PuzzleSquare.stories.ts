import { PuzzleSquare } from "../components/PuzzleSquare/PuzzleSquare";

const meta = {
  title: "Square",
  component: PuzzleSquare,
};

export default meta;

export const Empty = {
  args: {
    letter: "",
  },
};

export const WithLetter = {
  args: {
    letter: "D",
  },
};

export const Highlighted = {
  args: {
    letter: "D",
    highlighted: true,
  },
};

export const Selected = {
  args: {
    letter: "D",
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
    letter: "D",
  },
};

export const AutoCheckCorrect = {
  args: {
    clueNumber: 6,
    letter: "D",
    autoCheck: true,
    answer: "D",
  },
};

export const AutoCheckCorrectHighlighted = {
  args: {
    clueNumber: 6,
    letter: "D",
    autoCheck: true,
    answer: "D",
    highlighted: true,
  },
};

export const AutoCheckCorrectSelected = {
  args: {
    clueNumber: 6,
    letter: "D",
    autoCheck: true,
    answer: "D",
    selected: true,
  },
};

export const AutoCheckWrong = {
  args: {
    clueNumber: 6,
    letter: "D",
    autoCheck: true,
    answer: "T",
  },
};

export const AutoCheckWrongHighlighted = {
  args: {
    clueNumber: 6,
    letter: "D",
    autoCheck: true,
    answer: "T",
    highlighted: true,
  },
};

export const AutoCheckWrongSelected = {
  args: {
    clueNumber: 6,
    letter: "D",
    autoCheck: true,
    answer: "T",
    selected: true,
  },
};
