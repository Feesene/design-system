import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MeterGauge, { IMeterGaugeProps } from "./MeterGauge";

const meta = {
  component: MeterGauge,
  args: {
    size: "md",
    color: "primary",
    formatOptions: { style: "unit", unit: "kilometer-per-hour" },
    value: 70,
    maxValue: 100,
    valueLabel: "",
  },
  argTypes: {
    size: { contrl: "select" },
    color: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IMeterGaugeProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return <MeterGauge {...props} />;
  },
};

// formatOptions={{ style: "unit", unit: "mile-per-hour" }}
// aria-label="Speed"
// maxValue={150}
// value={45}
