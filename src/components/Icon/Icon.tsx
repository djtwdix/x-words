import "material-icons/iconfont/material-icons.css";
import "./Icon.css";
import { usePuzzleContext } from "../../contexts/PuzzleContext";
import { useState } from "react";

export interface IconProps {
  iconName: string;
}

export const Icon = ({ iconName }: IconProps) => {
  const [selected, setSelected] = useState(false);
  let className = "material-icons icon";
  if (selected) className += " selected";

  const { setListView, listView, setAutoCheck, autoCheck, setPencil, pencil } =
    usePuzzleContext();

  const handleClick = (iconName: string) => {
    switch (iconName) {
      case "list":
        setListView(!listView);
        break;
      case "support":
        setAutoCheck(!autoCheck);
        break;
      case "edit":
        setPencil(!pencil);
        break;
    }

    setSelected(!selected);
  };
  return (
    <span onClick={() => handleClick(iconName)} className={className}>
      {iconName}
    </span>
  );
};
