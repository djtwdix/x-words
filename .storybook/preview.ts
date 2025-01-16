import type { Preview } from "@storybook/react";

const preview: Preview = {
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
