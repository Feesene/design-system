import { Meta, StoryObj } from "@storybook/react";
import Progress, { IProgressProps } from "./Progress";
import React from "react";
import VStack from "../../elements/Layout/VStack";

const meta = {
  component: Progress,
  args: {
    label: "Label",
    color: "primary",
    size: "md",
    isIndeterminate: false,
    value: 50,
    maxValue: 100,
    minValue: 0,
  },
  argTypes: {
    orientation: {
      options: ["vertical", "horizontal"],
      control: { type: "radio" },
    },
    color: { control: "select" },
    label: { type: "string" },
    size: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IProgressProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <VStack>
        <Progress {...props} className="w-64" />
      </VStack>
    );
  },
};

export const Indeterminate: Story = {
  args: {
    value: undefined,
    label: "Loading...",
  },
  render: (props) => {
    return (
      <VStack>
        <Progress {...props} isIndeterminate className="w-64" />
      </VStack>
    );
  },
};

