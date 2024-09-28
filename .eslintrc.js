const { configure, presets } = require("eslint-kit");

module.exports = configure({
  presets: [
    presets.imports({ sort: { newline: true } }),
    presets.node(),
    presets.prettier({ printWidth: 120 }),
    presets.react(),
    presets.typescript({ root: __dirname }),
  ],
});
export const extends = ["plugin:storybook/recommended"];
