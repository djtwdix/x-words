import { GamePage } from "../pages/GamePage/GamePage";
import { puzzleData } from "../puzzleData";

const meta = {
  title: "Pages/GamePage",
  component: GamePage,
};

export default meta;

export const Default = {
  args: {
    puzzleData: puzzleData,
  },
};
