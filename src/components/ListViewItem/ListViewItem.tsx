import { PuzzleGrid } from "../PuzzleGrid/PuzzleGrid";
import "./ListViewItem.css";

export interface ListViewItemProps {
  clue: string;
  answer: string;
  autoCheck: boolean;
}

export const ListViewItem = ({
  clue,
  answer,
  autoCheck,
}: ListViewItemProps) => {
  const letterGrid = answer
    .toUpperCase()
    .split("")
    .map((letter) => {
      return { answer: letter };
    });

  return (
    <div>
      <h1>{clue}</h1>
      {
        <PuzzleGrid
          letterGrid={letterGrid}
          size={answer.length}
          autoCheck={autoCheck}
          inListView={true}
        />
      }
    </div>
  );
};
