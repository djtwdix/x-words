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

  //helper function that flips the orientation state
  const changeOrientation = () => {
    setOrientation((prev) => (prev === "across" ? "down" : "across"));
  };

  const handleCellClick = (index: number, clickCount: number) => {
    setSelectedIndex(index);

    if (clickCount > 1) changeOrientation();
  };

  useEffect(() => {});

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const alpha = "abcdefghifklmnopqrstuvwxyz".split("");
      puzzleGrid.map((cellData, index) => {
        const isSelectedCell = index === selectedIndex;
        if (!isSelectedCell) return;

        //if alphabet key is pressed set it as guess for the cell
        if (alpha.includes(e.key)) {
          cellData.guess = e.key.toUpperCase();
          const newIndex =
            orientation === "down"
              ? selectedIndex + puzzleData.size.cols
              : selectedIndex + 1;

          setSelectedIndex(newIndex);
        }

        //handle arrow navigation and delete
        switch (e.key) {
          case "Backspace":
            cellData.guess = "";
            break;
          case "ArrowLeft":
            setSelectedIndex(selectedIndex - 1);
            break;
          case "ArrowRight":
            setSelectedIndex(selectedIndex + 1);
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

    //if selected cell is blank move to the next one
    if (!puzzleGrid[selectedIndex].letter) setSelectedIndex(selectedIndex + 1);

    document.addEventListener("keydown", handleKeyPress);

    setSelectedClue(
      puzzleGrid[selectedIndex]?.clues?.[orientation as Orientation]
    );

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [puzzleGrid, selectedIndex, orientation]);

  return (
    <div className="puzzleGrid" style={{ maxWidth: puzzleData.size.rows * 75 }}>
      {puzzleGrid.map((cellData, index) => {
        return (
          <PuzzleCell
            index={index}
            key={index}
            guess={cellData.guess}
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
