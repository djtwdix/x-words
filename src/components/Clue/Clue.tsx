import "./Clue.css";

export interface ClueProps {
  clue: string;
}

export const Clue = ({ clue }: ClueProps) => {
  return (
    <div className="clue">
      <span className="material-icons icon">arrow_back_ios</span>
      <h4>{clue}</h4>
      <span className="material-icons icon">arrow_forward_ios</span>
    </div>
  );
};
