import { useState } from "react";
import { ClueListItem } from "../ClueListItem/ClueListItem";
import "./ClueList.css";

export interface ClueListProps {
  clues: string[];
  answers: string[];
}

export const ClueList = ({ clues, answers }: ClueListProps) => {
  const cluesAndAnswers = clues.map((clue) => {
    return { clue, answer: "" };
  });

  answers.forEach((answer, index) => {
    cluesAndAnswers[index].answer = answer;
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="clueList">
      {cluesAndAnswers.map((obj, index) => {
        return (
          <ClueListItem
            key={index}
            index={index}
            clue={obj.clue}
            autoCheck={false}
            selected={selectedIndex === index}
            handleSelect={handleSelect}
          />
        );
      })}
    </div>
  );
};
