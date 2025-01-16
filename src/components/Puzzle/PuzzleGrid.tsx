import { useEffect, useRef, useState } from "react";
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
  const gridRef = useRef<HTMLDivElement>(null);

  //helper function that flips the orientation state
  const changeOrientation = () => {
    setOrientation((prev) => (prev === "across" ? "down" : "across"));
  };

  const handleCellClick = (index: number, clickCount: number) => {
    setSelectedIndex(index);

    if (clickCount > 1) changeOrientation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const alpha = "abcdefghifklmnopqrstuvwxyz".split("");
    puzzleGrid.map((cellData, index) => {
      if (index !== selectedIndex) return;

      //if alphabet key is pressed set it as guess for the cell
      if (alpha.includes(e.key)) {
        cellData.guess = e.key.toUpperCase();
        const newIndex =
          orientation === "down"
            ? selectedIndex + puzzleData.size.cols
            : selectedIndex + 1;

        setSelectedIndex(newIndex);
      }

      //handle arrow navigation, delete and enter
      switch (e.key) {
        case "Backspace":
          cellData.guess = "";
          break;
        case "ArrowLeft":
          const isFirstColumn = selectedIndex % puzzleData.size.cols === 0;
          if (!isFirstColumn) setSelectedIndex(selectedIndex - 1);
          break;
        case "ArrowRight":
          const isLastColumn = (selectedIndex + 1) % puzzleData.size.cols === 0;
          if (!isLastColumn)
            setSelectedIndex(
              Math.min(selectedIndex + 1, puzzleGrid.length - 1)
            );
          break;
        case "ArrowDown":
          setSelectedIndex(selectedIndex + puzzleData.size.cols);
          break;
        case "ArrowUp":
          setSelectedIndex(selectedIndex - puzzleData.size.cols);
          break;
        case "Enter":
          changeOrientation();
          break;
      }
    });

    setPuzzleGrid([...puzzleGrid]);
  };

  useEffect(() => {
    gridRef.current?.focus();
    //if selected cell is blank move to the next one
    if (
      !puzzleGrid[selectedIndex]?.answer &&
      selectedIndex < puzzleGrid.length - 1
    ) {
      if (orientation === "across") setSelectedIndex(selectedIndex + 1);

      if (orientation === "down")
        setSelectedIndex(selectedIndex + puzzleData.size.cols);
    }

    //if you navigate down beyond the grid length set index to start of next column
    if (selectedIndex > puzzleGrid.length - 1) {
      setSelectedIndex(selectedIndex - (puzzleGrid.length - 1));
    }

    setSelectedClue(
      puzzleGrid[selectedIndex]?.clues?.[orientation as Orientation]
    );

    return () => {};
  }, [puzzleGrid, selectedIndex, orientation]);

  return (
    <div
      ref={gridRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="puzzleGrid"
      style={{ maxWidth: puzzleData.size.rows * 75 }}
    >
      {puzzleGrid.map((cellData, index) => {
        return (
          <PuzzleCell
            index={index}
            key={index}
            guess={cellData.guess}
            handleCellClick={handleCellClick}
            clueNumber={cellData.clueNumber}
            answer={cellData.answer}
            blank={!cellData.answer}
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
