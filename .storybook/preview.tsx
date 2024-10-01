import "../src/index.css";
import "./storybook.css";
import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import React from "react";
import { addons } from "@storybook/preview-api";
import { DocsContainer } from "@storybook/addon-docs";
import { light, dark } from "./manager";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import colors from "../src/colors";

const channel = addons.getChannel();

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        // LIGHT
        { name: "Light Background", value: colors.default[50] },
        { name: "Light Surface", value: colors.primary.content },
        // DARK
        { name: "Dark Background", value: colors.dark[800] },
        { name: "Dark Surface", value: colors.dark[700] },
      ],
    },
    // actions: { argTypesRegex: "^on[A-Z].*" },
    darkMode: {
      stylePreview: true,
      darkClass: "dark",
      current: "light",
      dark: { ...themes.dark, ...dark },
      light: { ...themes.normal, ...light },
    },
    docs: {
      container: ({ children, ...props }: any) => {
        const [isDark, setDark] = React.useState<boolean>();

        // const onChangeHandler = () => {
        //   channel.emit(UPDATE_DARK_MODE_EVENT_NAME);
        // };

        React.useEffect(() => {
          channel.on(DARK_MODE_EVENT_NAME, setDark);
          return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
        }, [channel, setDark]);

        return (
          <div>
            <DocsContainer {...props} theme={isDark ? { ...themes.dark, ...dark } : { ...themes.light, ...light }}>
              <div className={isDark ? "dark" : "light"}>{children}</div>
            </DocsContainer>
          </div>
        );
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Getting Started",
          "Styles",
          ["How to use", "Pallete", "Icons", "Theme dark"],
          "elements",
          "components",
          "Charts",
          "Map",
          "Widgets",
          "*",
        ],
      },
    },
  },
};

export default preview;

