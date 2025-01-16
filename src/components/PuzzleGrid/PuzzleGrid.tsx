import { useEffect, useRef, useState } from "react";
import { PuzzleCell } from "../PuzzleCell/PuzzleCell";
import { PuzzleCellData } from "../../puzzleData";
import "./PuzzleGrid.css";

type Orientation = "across" | "down";

export interface PuzzleGridProps {
  letterGrid: PuzzleCellData[];
  autoCheck: boolean;
  inListView: boolean;
  size: number; //number that corresponds to the amount of columns in the grid
}

export const PuzzleGrid = ({
  letterGrid,
  autoCheck,
  size,
  inListView,
}: PuzzleGridProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedClue, setSelectedClue] = useState<number | undefined>(0);
  const [orientation, setOrientation] = useState("across");
  const [puzzleGrid, setPuzzleGrid] = useState(letterGrid);
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
          orientation === "down" ? selectedIndex + size : selectedIndex + 1;

        if (newIndex <= letterGrid.length - 1) setSelectedIndex(newIndex);

        if (newIndex > puzzleGrid.length - 1) {
          setSelectedIndex(selectedIndex - (puzzleGrid.length - 1));
        }
      }

      //handle arrow navigation, delete and enter
      switch (e.key) {
        case "Backspace":
          orientation === "across"
            ? setSelectedIndex(selectedIndex - 1)
            : setSelectedIndex(selectedIndex - size);

          cellData.guess = "";
          break;
        case "ArrowLeft":
          const isFirstColumn = selectedIndex % size === 0;
          if (!isFirstColumn) setSelectedIndex(selectedIndex - 1);
          break;
        case "ArrowRight":
          const isLastColumn = (selectedIndex + 1) % size === 0;
          if (!isLastColumn)
            setSelectedIndex(
              Math.min(selectedIndex + 1, puzzleGrid.length - 1)
            );
          break;
        case "ArrowDown":
          setSelectedIndex(selectedIndex + size);
          break;
        case "ArrowUp":
          setSelectedIndex(selectedIndex - size);
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

      if (orientation === "down") setSelectedIndex(selectedIndex + size);
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
      style={{ maxWidth: size * 75 }}
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
            inListView={inListView}
            highlighted={
              cellData.clues?.[orientation as Orientation] === selectedClue
            }
          />
        );
      })}
    </div>
  );
};
