import { PuzzleGrid } from "../PuzzleGrid/PuzzleGrid";
import "./ListViewItem.css";

export interface ListViewItemProps {
  clue: string;
  answer: string;
  autoCheck: boolean;
  selected: boolean;
}

export const ListViewItem = ({
  clue,
  answer,
  autoCheck,
  selected,
}: ListViewItemProps) => {
  const letterGrid = answer
    .toUpperCase()
    .split("")
    .map((letter) => {
      return { answer: letter };
    });

  let className = "listViewItem";
  if (selected) className += " selected";

  return (
    <div className={className}>
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
