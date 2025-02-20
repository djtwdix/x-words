import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { PuzzleCellData, PuzzleData } from "../puzzleData";

export const PuzzleContext = createContext<PuzzleContextType | undefined>(
  undefined
);

export type Orientation = "across" | "down";

export interface PuzzleContextType {
  puzzleInfo: PuzzleData;
  setPuzzleInfo: Dispatch<SetStateAction<PuzzleData>>;
  selectedClueNumber: number | undefined;
  setSelectedClueNumber: Dispatch<SetStateAction<number | undefined>>;
  selectedClue: string;
  selectedListViewClue: string;
  setSelectedListViewClue: Dispatch<SetStateAction<string>>;
  orientation: Orientation;
  changeOrientation: () => void;
  listView: boolean;
  setListView: Dispatch<SetStateAction<boolean>>;
  autoCheck: boolean;
  setAutoCheck: Dispatch<SetStateAction<boolean>>;
  pencil: boolean;
  setPencil: Dispatch<SetStateAction<boolean>>;
  handleArrowNav: (dir: string) => void;
  arrowNavIndex: number | undefined;
}
interface PuzzleProviderType {
  children: ReactNode;
  puzzleData: PuzzleData;
  overrides: Partial<PuzzleContextType>;
}

export const PuzzleProvider = ({
  children,
  puzzleData,
  overrides,
}: PuzzleProviderType) => {
  const [puzzleInfo, setPuzzleInfo] = useState(puzzleData);
  const [selectedClue, setSelectedClue] = useState("");
  const [selectedClueNumber, setSelectedClueNumber] = useState<
    number | undefined
  >(0);
  const [selectedListViewClue, setSelectedListViewClue] = useState(
    overrides.selectedListViewClue || ""
  );
  const [orientation, setOrientation] = useState("across" as Orientation);
  const [listView, setListView] = useState(overrides.listView || false);
  const [autoCheck, setAutoCheck] = useState(overrides.autoCheck || false);
  const [pencil, setPencil] = useState(overrides.pencil || false);
  const [arrowNavIndex, setArrowNavIndex] = useState<undefined | number>(
    undefined
  );

  useEffect(() => {
    //when selected clue number changes we update the selectedClue
    puzzleData.clues[orientation].forEach((clue: string) => {
      if (Number(clue[0]) === selectedClueNumber) setSelectedClue(clue);
    });
  }, [selectedClueNumber, orientation]);

  //helper function that flips the orientation state
  const changeOrientation = () => {
    setOrientation((prev) => (prev === "across" ? "down" : "across"));
  };

  const handleArrowNav = (dir: string) => {
    if (!selectedClueNumber) return;
    puzzleInfo.clues[orientation].forEach((clue: string, index: number) => {
      const clueNumberAtCurrentIndex = Number(clue[0]);

      const indexAdjust = dir === "forward" ? 1 : -1;

      //if there is no next or previous clue return
      if (
        index + indexAdjust < 0 ||
        index + indexAdjust > puzzleInfo.clues[orientation].length - 1
      ) {
        return;
      }

      if (clueNumberAtCurrentIndex === selectedClueNumber) {
        const clueNumberToNavTo = Number(
          puzzleInfo.clues[orientation][index + indexAdjust][0]
        );

        puzzleInfo.grid.forEach((letterObj: PuzzleCellData, index: number) => {
          if (letterObj.clueNumber === clueNumberToNavTo) {
            setArrowNavIndex(index);
          }
        });
        setSelectedClueNumber(clueNumberToNavTo);
      }
    });
  };

  return (
    <PuzzleContext.Provider
      value={{
        puzzleInfo,
        setPuzzleInfo,
        selectedClueNumber,
        setSelectedClueNumber,
        selectedClue,
        setSelectedListViewClue,
        selectedListViewClue,
        orientation,
        changeOrientation,
        listView,
        setListView,
        autoCheck,
        setAutoCheck,
        pencil,
        setPencil,
        handleArrowNav,
        arrowNavIndex,
      }}
    >
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzleContext = () => {
  const puzzleContext = useContext(PuzzleContext);

  if (!puzzleContext)
    throw new Error("Puzzle context must be used inside of a provider");

  return puzzleContext;
};
