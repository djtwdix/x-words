import { Icon } from "../components/Icon/Icon";
import { userEvent, within } from "@storybook/test";
import "../index.css";
interface PlayArgs {
  canvasElement: HTMLCanvasElement;
}

const meta = {
  title: "Components/Icon",
  component: Icon,
};

export default meta;

export const Support = {
  args: {
    iconName: "support",
  },
};

export const SupportSelected = {
  args: {
    iconName: "support",
    selected: true,
  },
  play: async ({ canvasElement }: PlayArgs) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("support"));
  },
};

export const Pencil = {
  args: {
    iconName: "edit",
  },
};

export const PencilSelected = {
  args: {
    iconName: "edit",
    selected: true,
  },
  play: async ({ canvasElement }: PlayArgs) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("edit"));
  },
};

export const List = {
  args: {
    iconName: "list",
  },
};

export const ListSelected = {
  args: {
    iconName: "list",
    selected: true,
  },
  play: async ({ canvasElement }: PlayArgs) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("list"));
  },
};

export const Info = {
  args: {
    iconName: "info",
  },
};

export const InfoSelected = {
  args: {
    iconName: "info",
    selected: true,
  },
  play: async ({ canvasElement }: PlayArgs) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("info"));
  },
};
