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
  const isLastColumn = (selectedIndex + 1) % size === 0;
  const isFirstColumn = selectedIndex % size === 0;

  const {
    setSelectedClueNumber,
    selectedClueNumber,
    orientation,
    changeOrientation,
    listView,
    arrowNavIndex,
    pencil,
    autoCheck,
  } = usePuzzleContext();

  const handleCellClick = (index: number, clickCount: number) => {
    setSelectedIndex(index);
    if (listView) return;
    if (clickCount > 1) changeOrientation();
  };

  const navToNextCell = () => {
    const newIndex =
      orientation === "across" || listView
        ? selectedIndex + 1
        : selectedIndex + size;

    if (newIndex <= puzzleGrid.length - 1 && puzzleGrid[selectedIndex].answer)
      setSelectedIndex(newIndex);

    if (newIndex >= puzzleGrid.length - 1 && !listView) {
      setSelectedIndex(selectedIndex - (puzzleGrid.length - 1));
    }
  };

  const updateCellGuess = (guess: string) => {
    const updatedGrid = [...puzzleGrid];
    const selectedCell = updatedGrid[selectedIndex];
    selectedCell.guess = guess.toUpperCase();
    selectedCell.penciled = pencil;
    selectedCell.autoChecked = autoCheck;
    setPuzzleGrid(updatedGrid);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const alpha = "abcdefghifklmnopqrstuvwxyz".split("");

    if (alpha.includes(e.key)) {
      updateCellGuess(e.key);
      navToNextCell();
    }

    //handle arrow navigation, delete and enter
    switch (e.key) {
      case "Backspace":
        updateCellGuess("");
        orientation === "across" || listView
          ? setSelectedIndex(Math.max(selectedIndex - 1, 0))
          : setSelectedIndex(selectedIndex - size);
        break;
      case "ArrowLeft":
        if (!isFirstColumn) setSelectedIndex(selectedIndex - 1);
        break;
      case "ArrowRight":
        if (!isLastColumn) setSelectedIndex(selectedIndex + 1);
        break;
      case "ArrowDown":
        if (selectedIndex + size <= puzzleGrid.length - 1)
          setSelectedIndex(selectedIndex + size);
        break;
      case "ArrowUp":
        if (selectedIndex - size >= 0) setSelectedIndex(selectedIndex - size);
        break;
      case "Enter":
        changeOrientation();
        break;
    }
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
            penciled={cellData.penciled}
            autoChecked={cellData.autoChecked}
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
