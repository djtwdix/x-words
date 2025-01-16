import { useEffect, useState } from "react";
import { PuzzleCell } from "../PuzzleCell/PuzzleCell";
import { PuzzleData } from "../../puzzleData";
import "./PuzzleGrid.css";

type Orientation = "across" | "down";

export interface PuzzleGridProps {
  puzzleData: PuzzleData;
  autoCheck: boolean;
}

export const PuzzleGrid = ({ puzzleData, autoCheck }: PuzzleGridProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedClue, setSelectedClue] = useState<number | undefined>(0);
  const [orientation, setOrientation] = useState("across");
  const [puzzleGrid, setPuzzleGrid] = useState(puzzleData.grid);

  const handleCellClick = (index: number, clickCount: number) => {
    setSelectedIndex(index);

    if (clickCount > 1)
      setOrientation((prev) => (prev === "across" ? "down" : "across"));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const alpha = "abcdefghifklmnopqrstuvwxyz".split("");
      puzzleGrid.map((cellData, index) => {
        const isSelectedCell = index === selectedIndex;
        if (!isSelectedCell) return;
        if (alpha.includes(e.key)) {
          cellData.guess = e.key.toUpperCase();
          const newIndex =
            orientation === "down"
              ? selectedIndex + puzzleData.size.rows
              : selectedIndex + 1;

          setSelectedIndex(newIndex);
        }

        if (e.key === "Backspace") {
          cellData.guess = "";
          return;
        }
      });

      setPuzzleGrid([...puzzleGrid]);
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  useEffect(() => {
    setSelectedClue(
      puzzleGrid[selectedIndex]?.clues?.[orientation as Orientation]
    );
  }, [selectedIndex, orientation]);

  return (
    <div className="puzzleGrid" style={{ maxWidth: puzzleData.size.rows * 75 }}>
      {puzzleGrid.map((cellData, index) => {
        return (
          <PuzzleCell
            index={index}
            key={index}
            letter={cellData.guess}
            handleCellClick={handleCellClick}
            clueNumber={cellData.clueNumber}
            answer={cellData.letter}
            blank={!cellData.letter}
            selected={selectedIndex === index}
            autoCheck={autoCheck}
            highlighted={
              cellData.clues?.[orientation as Orientation] === selectedClue
            }
          />
        );
      })}
    </div>
  );
};
