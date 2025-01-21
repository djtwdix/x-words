import { Icon } from "../Icon/Icon";
import { Timer } from "../Timer/Timer";
import "./SettingsBar.css";

export interface SettingsBarProps {
  icons: string[];
}

export const SettingsBar = ({ icons }: SettingsBarProps) => {
  return (
    <div className="settingsBar">
      <Timer />
      <div className="icons">
        {icons.map((icon, index) => {
          return <Icon key={index} iconName={icon} />;
        })}
      </div>
    </div>
  );
};
