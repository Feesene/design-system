import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import DonutChart, { IDonutChartProps } from "./DonutChart";
import { useDarkMode } from "storybook-dark-mode";

const meta = {
  component: DonutChart,
  args: {
    title: "Porcentagem de vendas",
    elevated: true,
    toolbar: true,
    hasCard: true,
    className: "",
    options: {},
    xAxis: ["Jan", "Fev", "Mar", "Abr"],
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<IDonutChartProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<number[] | undefined>([80, 30, 40, 20]);

    return <DonutChart data={series} {...props} isDark={dark} />;
  },
};

