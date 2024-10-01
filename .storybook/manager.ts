import { addons } from "@storybook/manager-api";
import { ThemeVars, themes } from "@storybook/theming";
import colors from "../src/colors";

export const light: ThemeVars = {
  ...themes.light,
  appBorderRadius: 10,
  colorPrimary: colors.secondary.DEFAULT,
  colorSecondary: colors.primary.DEFAULT,
  appBg: "#fff",
  appContentBg: colors.default[50],
};

export const dark: ThemeVars = {
  ...themes.dark,
  appBorderRadius: 10,
  colorPrimary: colors.secondary[300],
  colorSecondary: colors.primary.DEFAULT,
  appBg: colors.dark[700],
  appContentBg: colors.dark[800],
  inputBg: colors.dark[700],
  barBg: colors.dark[700],
};

addons.setConfig({
  theme: light,
});
