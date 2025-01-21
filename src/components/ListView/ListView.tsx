import { ListViewItem } from "../ListViewItem/ListViewItem";
import { usePuzzleContext } from "../../contexts/PuzzleContext";

export interface ListViewProps {
  clues: string[];
  answers: string[];
}

export const ListView = ({ clues, answers }: ListViewProps) => {
  const cluesAndAnswers = clues.map((clue) => {
    return { clue, answer: "" };
  });

  const { setSelectedIndex, selectedIndex, setSelectedClueNumber } =
    usePuzzleContext();

  answers.forEach((answer, index) => {
    cluesAndAnswers[index].answer = answer;
  });

  const handleSelect = (index: number, clueNumber: number) => {
    setSelectedIndex(index);
    setSelectedClueNumber(clueNumber);
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
