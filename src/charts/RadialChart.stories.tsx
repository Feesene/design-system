import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RadialChart, { IRadialChartProps } from "./RadialChart";
import { useDarkMode } from "storybook-dark-mode";

const meta = {
  component: RadialChart,
  args: {
    title: "Título",
    elevated: true,
    toolbar: true,
    hasCard: true,
    className: "",
    options: {},
    xAxis: ["Jan", "Fev", "Mar", "Abr"],
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<IRadialChartProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<number[] | undefined>([80, 30, 40, 20]);

    return <RadialChart data={series} {...props} isDark={dark} />;
  },
};

