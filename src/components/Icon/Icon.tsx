import "material-icons/iconfont/material-icons.css";
import "./Icon.css";

export interface IconProps {
  selected?: boolean;
  iconName: string;
}

export const Icon = ({ selected, iconName }: IconProps) => {
  let className = "material-icons icon";
  if (selected) className += " selected";
  return <span className={className}>{iconName}</span>;
};
