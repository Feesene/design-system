import { useDarkMode } from "storybook-dark-mode";
import { AreaChart } from "../../charts";
import React from "react";

export const ChartExample = () => {
  const dark = useDarkMode();

  return (
    <AreaChart
      isDark={dark}
      data={[
        { name: "Desktops", data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
        { name: "PC", data: [41, 35, 51, 49, 62, 69, 91, 148, 10] },
        { name: "Geladeiras", data: [60, 70, 20, 10, 16, 30, 40, 60, 80] },
      ]}
      xAxis={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"]}
    />
  );
};
