export interface PuzzleData {
  clues: {
    across: string[];
    down: string[];
  };
  answers: {
    across: string[];
    down: string[];
  };
  grid: PuzzleCellData[];
  size: {
    rows: number;
    cols: number;
  };
}

export interface PuzzleCellData {
  clueNumber?: number;
  answer: string | null;
  guess?: string;
  clues?: {
    across: number;
    down: number;
  };
  penciled?: boolean;
}

export const puzzleData: PuzzleData = {
  clues: {
    across: [
      "1. Raygun or Moo Deng, in 2024",
      "5. Avoid, as ones taxes",
      "7. Sotomayor of the Supreme Court",
      "8. Comical routines in a school talent show",
      "9. 'I only eat unleavened breadnow; I'm on the path of ___ resistance!' (groaner)",
    ],
    down: [
      "1. Like a roommate who leaves dishes in the sink and socks on the sofa.",
      "2. Bring to mind",
      "3. With ego, pyro- or klepto-",
      "4. Polishes, as an article",
      "6. '___ of Eden' Steinbeck Novel",
    ],
  },
  answers: {
    across: ["Meme", "Evade", "Sonia", " Skits", "Yeast"],
    down: ["Messy", "Evoke", "Mania", "Edits", "East"],
  },
  grid: [
    {
      answer: "M",
      clueNumber: 1,
      clues: {
        across: 1,
        down: 1,
      },
    },
    {
      answer: "E",
      clueNumber: 2,
      clues: {
        across: 1,
        down: 2,
      },
    },
    {
      answer: "M",
      clueNumber: 3,
      clues: {
        across: 1,
        down: 3,
      },
    },
    {
      answer: "E",
      clueNumber: 4,
      clues: {
        across: 1,
        down: 4,
      },
    },
    {
      answer: null,
    },
    {
      answer: "E",
      clueNumber: 5,
      clues: {
        across: 5,
        down: 1,
      },
    },
    {
      answer: "V",
      clues: {
        across: 5,
        down: 2,
      },
    },
    {
      answer: "A",
      clues: {
        across: 5,
        down: 3,
      },
    },
    {
      answer: "D",
      clues: {
        across: 5,
        down: 4,
      },
    },
    {
      answer: "E",
      clueNumber: 6,
      clues: {
        across: 5,
        down: 6,
      },
    },
    {
      answer: "S",
      clueNumber: 7,
      clues: {
        across: 7,
        down: 1,
      },
    },
    {
      answer: "O",
      clues: {
        across: 7,
        down: 2,
      },
    },
    {
      answer: "N",
      clues: {
        across: 7,
        down: 3,
      },
    },
    {
      answer: "I",
      clues: {
        across: 7,
        down: 4,
      },
    },
    {
      answer: "A",
      clues: {
        across: 7,
        down: 6,
      },
    },
    {
      answer: "S",
      clueNumber: 8,
      clues: {
        across: 8,
        down: 1,
      },
    },
    {
      answer: "K",
      clues: {
        across: 8,
        down: 2,
      },
    },
    {
      answer: "I",
      clues: {
        across: 8,
        down: 3,
      },
    },
    {
      answer: "T",
      clues: {
        across: 8,
        down: 4,
      },
    },
    {
      answer: "S",
      clues: {
        across: 8,
        down: 6,
      },
    },
    {
      answer: "Y",
      clueNumber: 9,
      clues: {
        across: 9,
        down: 1,
      },
    },
    {
      answer: "E",
      clues: {
        across: 9,
        down: 2,
      },
    },
    {
      answer: "A",
      clues: {
        across: 9,
        down: 3,
      },
    },
    {
      answer: "S",
      clues: {
        across: 9,
        down: 4,
      },
    },
    {
      answer: "T",
      clues: {
        across: 9,
        down: 6,
      },
    },
  ],
  size: { rows: 5, cols: 5 },
};
