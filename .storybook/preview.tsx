import type { Preview } from "@storybook/react";
import { PuzzleProvider } from "../src/contexts/PuzzleContext";
import React from "react";
import { puzzleData } from "../src/puzzleData";

const preview: Preview = {
  decorators: (Story, context) => {
    const overrides = {
      autoCheck: context.args.autoCheck,
      pencil: context.args.pencil,
      listView: context.args.listView,
      selectedListViewClue: context.args.selectedListViewClue,
    };
    return (
      <PuzzleProvider puzzleData={puzzleData} overrides={overrides}>
        <Story />
      </PuzzleProvider>
    );
  },
  parameters: {
    measure: {
      disable: true, // This disables the Measure Addon functionality.
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
