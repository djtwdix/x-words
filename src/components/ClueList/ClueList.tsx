import { ClueListItem } from "../ClueListItem/ClueListItem";
import "./ClueList.css";
import { Orientation } from "../../contexts/PuzzleContext";

export interface ClueListProps {
  clues: string[];
  answers: string[];
  orientation: Orientation;
}

export const ClueList = ({ clues, answers, orientation }: ClueListProps) => {
  const cluesAndAnswers = clues.map((clue) => {
    return { clue, answer: "" };
  });

  answers.forEach((answer, index) => {
    cluesAndAnswers[index].answer = answer;
  });

  return (
    <div className="clueList">
      <h4 className="clueListTitle">
        {orientation[0].toUpperCase() +
          orientation.slice(1, orientation.length)}
      </h4>
      {cluesAndAnswers.map((obj, index) => {
        return (
          <ClueListItem
            key={index}
            index={index}
            clue={obj.clue}
            autoCheck={false}
            orientation={orientation}
          />
        );
      })}
    </div>
  );
};
