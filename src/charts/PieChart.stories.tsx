import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import PieChart, { IPieChartProps } from "./PieChart";
import { useDarkMode } from "storybook-dark-mode";

const meta = {
  component: PieChart,
  args: {
    title: "Título",
    elevated: true,
    toolbar: true,
    hasCard: true,
    className: "",
    options: {},
    xAxis: ["Jan", "Fev", "Mar", "Abr"],
    isDark: false,
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<IPieChartProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<number[] | undefined>([80, 30, 40, 20]);

    return <PieChart data={series} {...props} isDark={dark} />;
  },
};

