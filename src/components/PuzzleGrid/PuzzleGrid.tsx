import { useEffect, useRef, useState } from "react";
import { PuzzleCell } from "../PuzzleCell/PuzzleCell";
import { PuzzleCellData } from "../../puzzleData";
import "./PuzzleGrid.css";
import { usePuzzleContext } from "../../contexts/PuzzleContext";

type Orientation = "across" | "down";

export interface PuzzleGridProps {
  letterGrid: PuzzleCellData[];
  selectedInListView?: boolean | undefined;
  size: number; //number that corresponds to the amount of columns in the grid
}

export const PuzzleGrid = ({
  letterGrid,
  size,
  selectedInListView,
}: PuzzleGridProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [puzzleGrid, setPuzzleGrid] = useState(letterGrid);
  const gridRef = useRef<HTMLDivElement>(null);

  const {
    setSelectedClueNumber,
    selectedClueNumber,
    orientation,
    changeOrientation,
    listView,
    arrowNavIndex,
  } = usePuzzleContext();

  const handleCellClick = (index: number, clickCount: number) => {
    setSelectedIndex(index);
    if (listView) return;
    if (clickCount > 1) changeOrientation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const alpha = "abcdefghifklmnopqrstuvwxyz".split("");
    const isLastColumn = (selectedIndex + 1) % size === 0;
    const isFirstColumn = selectedIndex % size === 0;

    puzzleGrid.forEach((cellData, index) => {
      if (index !== selectedIndex) return;

      //if alphabet key is pressed set it as guess for the cell
      if (alpha.includes(e.key)) {
        cellData.guess = e.key.toUpperCase();

        //after you make a guess we want to navigate to the next cell
        //add 1 if orientation is down and add size (start of next row) if it's across
        const newIndex =
          orientation === "down" ? selectedIndex + size : selectedIndex + 1;

        if (newIndex <= letterGrid.length - 1) setSelectedIndex(newIndex);

        if (newIndex > puzzleGrid.length - 1 && !listView) {
          setSelectedIndex(selectedIndex - (puzzleGrid.length - 1));
        }
      }

      //handle arrow navigation, delete and enter
      switch (e.key) {
        case "Backspace":
          if (!isFirstColumn)
            orientation === "across" || listView
              ? setSelectedIndex(selectedIndex - 1)
              : setSelectedIndex(selectedIndex - size);

          cellData.guess = "";
          break;
        case "ArrowLeft":
          if (!isFirstColumn) setSelectedIndex(selectedIndex - 1);
          break;
        case "ArrowRight":
          if (!isLastColumn)
            setSelectedIndex(
              Math.min(selectedIndex + 1, puzzleGrid.length - 1)
            );
          break;
        case "ArrowDown":
          if (selectedIndex + size <= puzzleGrid.length - 1)
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

    if (!listView) {
      setSelectedClueNumber(
        puzzleGrid[selectedIndex]?.clues?.[orientation as Orientation]
      );
    }

    return () => {};
  }, [puzzleGrid, selectedIndex, orientation]);

  useEffect(() => {
    arrowNavIndex !== undefined && setSelectedIndex(arrowNavIndex);
  }, [arrowNavIndex]);

  return (
    <div
      ref={gridRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="puzzleGrid"
      style={{ maxWidth: size * (listView ? 30 : 75) }}
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
            selectedInListView={selectedInListView}
            highlighted={
              cellData.clues?.[orientation as Orientation] ===
              selectedClueNumber
            }
          />
        );
      })}
    </div>
  );
};
