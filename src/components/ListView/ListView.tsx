import { useState } from "react";
import { ListViewItem } from "../ListViewItem/ListViewItem";

export interface ListViewProps {
  clues: string[];
  answers: string[];
}

export const ListView = ({ clues, answers }: ListViewProps) => {
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
    <div>
      {cluesAndAnswers.map((obj, index) => {
        return (
          <ListViewItem
            key={index}
            index={index}
            clue={obj.clue}
            answer={obj.answer}
            autoCheck={false}
            selected={selectedIndex === index}
            handleSelect={handleSelect}
          />
        );
      })}
    </div>
  );
};
