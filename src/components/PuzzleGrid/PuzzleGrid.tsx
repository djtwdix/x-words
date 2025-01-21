import { useEffect, useRef, useState } from "react";
import { PuzzleCell } from "../PuzzleCell/PuzzleCell";
import { PuzzleCellData } from "../../puzzleData";
import "./PuzzleGrid.css";
import { usePuzzleContext, Orientation } from "../../contexts/PuzzleContext";

export interface PuzzleGridProps {
  letterGrid: PuzzleCellData[];
  autoCheck?: boolean;
  inListView?: boolean | undefined;
  selectedInListView?: boolean | undefined;
  size: number; //number that corresponds to the amount of columns in the grid
}

export const PuzzleGrid = ({
  letterGrid,
  autoCheck,
  size,
  inListView,
  selectedInListView,
}: PuzzleGridProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const {
    selectedClueNumber,
    setSelectedClueNumber,
    puzzleInfo,
    setPuzzleInfo,
    orientation,
    changeOrientation,
  } = usePuzzleContext();

  const handleCellClick = (index: number, clickCount: number) => {
    setSelectedIndex(index);

    if (clickCount > 1) changeOrientation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const alpha = "abcdefghifklmnopqrstuvwxyz".split("");
    letterGrid.map((cellData, index) => {
      if (index !== selectedIndex) return;

      //if alphabet key is pressed set it as guess for the cell
      if (alpha.includes(e.key)) {
        cellData.guess = e.key.toUpperCase();
        const newIndex =
          orientation === "down" ? selectedIndex + size : selectedIndex + 1;

        if (newIndex <= letterGrid.length - 1) setSelectedIndex(newIndex);

        if (newIndex > letterGrid.length - 1) {
          setSelectedIndex(selectedIndex - (letterGrid.length - 1));
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
              Math.min(selectedIndex + 1, letterGrid.length - 1)
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

    setPuzzleInfo((prev) => {
      return { ...prev, grid: [...letterGrid] };
    });
  };

  useEffect(() => {
    gridRef.current?.focus();
    //if selected cell is blank move to the next one
    if (
      !letterGrid[selectedIndex]?.answer &&
      selectedIndex < letterGrid.length - 1
    ) {
      if (orientation === "across") setSelectedIndex(selectedIndex + 1);

      if (orientation === "down") setSelectedIndex(selectedIndex + size);
    }

    //if you reach the end of a column, stop navigating
    if (selectedIndex > letterGrid.length - 1) {
      setSelectedIndex(selectedIndex - size);
    }

    setSelectedClueNumber(
      letterGrid[selectedIndex]?.clues?.[orientation as Orientation]
    );

    return () => {};
  }, [letterGrid, selectedIndex, orientation]);

  return (
    <div
      ref={gridRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="puzzleGrid"
      style={{ maxWidth: size * (inListView ? 30 : 75) }}
    >
      {letterGrid.map((cellData, index) => {
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
