import "./Clue.css";

export interface ClueProps {
  clue: string;
}

export const Clue = ({ clue }: ClueProps) => {
  return (
    <div className="clue">
      <h4>{"<"}</h4>
      <h4>{clue}</h4>
      <h4>{">"}</h4>
    </div>
  );
};
