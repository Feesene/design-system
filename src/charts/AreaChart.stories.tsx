import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import AreaChart, { IAreaChartProps } from "./AreaChart";
import { IChartDataProps } from "./interfaces";
import { useDarkMode } from "storybook-dark-mode";

const meta = {
  component: AreaChart,
  args: {
    title: "Vendas do ano",
    xAxisTitle: "",
    yAxisTitle: "",
    elevated: true,
    grid: false,
    toolbar: true,
    zoom: true,
    hasCard: true,
    sparkline: false,
    className: "",
    options: {},
    xAxis: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Aug", "Set"],
    isDark: false,
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<IAreaChartProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<IChartDataProps[] | undefined>([
      { name: "Desktops", data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
      { name: "PC", data: [41, 35, 51, 49, 62, 69, 91, 148, 10] },
      { name: "Geladeiras", data: [60, 70, 20, 10, 16, 30, 40, 60, 80] },
    ]);

    return <AreaChart data={series} {...props} isDark={dark} />;
  },
};

