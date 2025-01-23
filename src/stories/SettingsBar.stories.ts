import { SettingsBar } from "../components/SettingsBar/SettingsBar";
import "../index.css";

const meta = {
  title: "Components/SettingsBar",
  component: SettingsBar,
};

export default meta;

const icons = ["list", "edit", "support", "info"];

export const Default = {
  args: {
    icons,
  },
};
