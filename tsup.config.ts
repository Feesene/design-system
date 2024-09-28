import { defineConfig } from "tsup";

export default defineConfig([
  //-> COMPONENTS CJS
  {
    entry: ["src/**/!(*.stories).tsx", "!src/**/stories/**", "src/utils/**/*.ts", "!src/map/**/*"],
    format: "cjs",
    bundle: true,
    splitting: false,
    legacyOutput: true,
    minify: true,
    external: [
      "react",
      "react-aria",
      "react-apexcharts",
      "@react-aria",
      "@react-stately",
      "tailwind-variants",
      "react-stately",
      "date-fns",
      "jspdf",
      "jspdf-autotable",
    ],
  },
  //-> MAPA
  {
    entry: ["src/map/index.ts"],
    format: "cjs",
    minify: true,
    external: ["react", "react-aria", "@turf/turf", "tailwind-variants", "mapbox-gl"],
    outDir: "./dist/map",
  },
  //-> INDEX CJS
  {
    entry: ["src/**/index.ts", "src/charts/index.ts", "src/widgets/index.ts", "src/hooks/ThemeProvider.tsx"],
    legacyOutput: true,
    dts: true,
    format: "cjs",
    bundle: false,
    splitting: false,
  },
  //-> COLORS CJS
  {
    entry: ["src/colors.ts"],
    legacyOutput: true,
    dts: true,
    format: "cjs",
    bundle: false,
    splitting: false,
  },
  //-> CSS CJS
  {
    entry: ["src/index.css"],
    format: "cjs",
    bundle: true,
    minify: true,
  },
]);
