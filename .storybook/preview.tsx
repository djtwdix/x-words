import type { Preview } from "@storybook/react";
import { PuzzleProvider } from "../src/contexts/PuzzleContext";
import React from "react";
import { puzzleData } from "../src/puzzleData";

const preview: Preview = {
  decorators: (Story) => {
    return (
      <PuzzleProvider puzzleData={puzzleData}>
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
