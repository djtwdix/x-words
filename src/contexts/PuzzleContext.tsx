import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { PuzzleCellData, PuzzleData } from "../puzzleData";

export type Orientation = "across" | "down";

export interface PuzzleContextType {
  puzzleInfo: PuzzleData;
  setPuzzleInfo: Dispatch<SetStateAction<PuzzleData>>;
  selectedClueNumber?: number;
  setSelectedClueNumber: (index: number | undefined) => void;
  /*   puzzleGrid: PuzzleCellData[];
  setPuzzleGrid: (cellData: PuzzleCellData[]) => void; */
  orientation: Orientation;
  setOrientation: Dispatch<SetStateAction<"across" | "down">>;
  changeOrientation: () => void;
  clues: { across: string[]; down: string[] };
  answers: { across: string[]; down: string[] };
  selectedClue: string;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
}

export interface PuzzleProviderProps {
  children: ReactNode;
  puzzleData: PuzzleData;
}

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

export const PuzzleProvider = ({
  children,
  puzzleData,
}: PuzzleProviderProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedClueNumber, setSelectedClueNumber] = useState<
    number | undefined
  >(1);
  const [puzzleInfo, setPuzzleInfo] = useState(puzzleData);
  //const [puzzleGrid, setPuzzleGrid] = useState(puzzleData.grid);
  const [orientation, setOrientation] = useState("across" as Orientation);
  const clues = puzzleInfo.clues;
  const answers = puzzleInfo.answers;

  const [selectedClue, setSelectedClue] = useState("");

  useEffect(() => {
    puzzleData.clues[orientation].forEach((clue) => {
      if (Number(clue[0]) === selectedClueNumber) setSelectedClue(clue);
    });
  }, [selectedClueNumber, orientation]);

  //helper function that flips the orientation state
  const changeOrientation = () => {
    setOrientation((prev) => (prev === "across" ? "down" : "across"));
  };

  return (
    <PuzzleContext.Provider
      value={{
        puzzleInfo,
        setPuzzleInfo,
        /*      puzzleGrid,
        setPuzzleGrid, */
        orientation,
        setOrientation,
        changeOrientation,
        clues,
        answers,
        selectedClueNumber,
        setSelectedClueNumber,
        selectedClue,
        selectedIndex,
        setSelectedIndex,
      }}
    >
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzleContext = () => {
  const context = useContext(PuzzleContext);
  if (!context) {
    throw new Error("usePuzzleContext must be used within a PuzzleProvider");
  }
  return context;
};
