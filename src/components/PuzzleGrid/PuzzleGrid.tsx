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
    setPuzzleInfo,
  } = usePuzzleContext();

  const handleCellClick = (index: number, clickCount: number) => {
    setSelectedIndex(index);
    if (listView) return;
    if (clickCount > 1) changeOrientation();
  };

  const navToNextCell = () => {
    const newIndex =
      orientation === "down" ? selectedIndex + size : selectedIndex + 1;

    if (newIndex <= letterGrid.length - 1 && letterGrid[selectedIndex].answer)
      setSelectedIndex(newIndex);

    if (newIndex >= letterGrid.length - 1 && !listView) {
      setSelectedIndex(selectedIndex - (letterGrid.length - 1));
    }
  };

  const updateCellGuess = (guess: string) => {
    const updatedGrid = [...letterGrid];
    const selectedCell = updatedGrid[selectedIndex];
    selectedCell.guess = guess.toUpperCase();
    selectedCell.penciled = pencil;
    selectedCell.autoChecked = autoCheck;
    setPuzzleInfo((prev) => {
      return { ...prev, grid: updatedGrid };
    });
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
        orientation === "across"
          ? setSelectedIndex(selectedIndex - 1)
          : setSelectedIndex(selectedIndex - size);
        break;
      case "ArrowLeft":
        if (!isFirstColumn && letterGrid[selectedIndex - 1].answer)
          setSelectedIndex(selectedIndex - 1);
        break;
      case "ArrowRight":
        if (!isLastColumn && letterGrid[selectedIndex + 1].answer)
          setSelectedIndex(selectedIndex + 1);
        break;
      case "ArrowDown":
        if (
          selectedIndex + size <= letterGrid.length - 1 &&
          letterGrid[selectedIndex + size].answer
        )
          setSelectedIndex(selectedIndex + size);
        break;
      case "ArrowUp":
        if (
          selectedIndex - size >= 0 &&
          letterGrid[selectedIndex - size].answer
        )
          setSelectedIndex(selectedIndex - size);
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
      !letterGrid[selectedIndex]?.answer &&
      selectedIndex < letterGrid.length - 1
    ) {
      if (orientation === "across") setSelectedIndex(selectedIndex + 1);

      if (orientation === "down") setSelectedIndex(selectedIndex + size);
    }

    if (!listView) {
      setSelectedClueNumber(
        letterGrid[selectedIndex]?.clues?.[orientation as Orientation]
      );
    }

    return () => {};
  }, [letterGrid, selectedIndex, orientation]);

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
