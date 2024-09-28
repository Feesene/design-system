import { Meta, StoryObj } from "@storybook/react";
import Slider, { ISliderProps } from "./Slider";
import React from "react";
import VStack from "../Layout/VStack";

const meta = {
  component: Slider,
  args: {
    label: "Label",
    color: "primary",
    size: "md",
    orientation: "horizontal",
    isDisabled: false,
    step: 1,
    maxValue: 100,
    minValue: 0,
    labelValue: true,
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
} satisfies Meta<ISliderProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <VStack className={`${props.orientation == "vertical" ? "h-64" : ""}`}>
        <Slider {...props} className="w-64" />
      </VStack>
    );
  },
};

