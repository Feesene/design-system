import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import GaugeChart, { IGaugeChartProps } from "./GaugeChart";
import { useDarkMode } from "storybook-dark-mode";

const meta = {
  component: GaugeChart,
  args: {
    title: "Título",
    data: 50,
    showLabel: true,
    elevated: true,
    toolbar: true,
    hasCard: true,
    className: "h-64",
    options: {},
    isDark: false,
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<IGaugeChartProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    const dark = useDarkMode();
    return <GaugeChart {...props} isDark={dark} />;
  },
};

