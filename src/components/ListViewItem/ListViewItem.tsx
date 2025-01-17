import { PuzzleGrid } from "../PuzzleGrid/PuzzleGrid";
import "./ListViewItem.css";

export interface ListViewItemProps {
  index: number;
  clue: string;
  answer: string;
  autoCheck: boolean;
  handleSelect: (index: number) => void;
  selected: boolean;
}

export const ListViewItem = ({
  index,
  clue,
  answer,
  autoCheck,
  handleSelect,
  selected,
}: ListViewItemProps) => {
  let className = "listViewItem";
  if (selected) className += " selected";

  const letterGrid = answer
    .toUpperCase()
    .split("")
    .map((letter) => {
      return { answer: letter };
    });

  return (
    <div className={className} onClick={() => handleSelect(index)}>
      <h2>{clue}</h2>
      {
        <PuzzleGrid
          letterGrid={letterGrid}
          size={answer.length}
          autoCheck={autoCheck}
          inListView={true}
          selectedInListView={selected}
        />
      }
    </div>
  );
};
