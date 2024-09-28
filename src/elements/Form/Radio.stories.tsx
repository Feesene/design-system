import { Meta, StoryObj } from "@storybook/react";
import Radio, { IRadioProps } from "./Radio";
import React from "react";

const meta = {
  component: Radio,
  args: {
    size: "md",
    variant: "outline",
    isDisabled: false,
    isRounded: true,
    color: "primary",
    children: undefined,
    value: undefined,
  },
  argTypes: {
    variant: {
      options: ["outline", "solid"],
      control: { type: "radio" },
    },
    children: { control: false },
    isDisabled: { type: "boolean" },
    isRounded: { type: "boolean" },
    value: { control: false },
    size: { control: "select" },
    color: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IRadioProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <Radio.RadioGroup>
        <Radio {...props} value="1">
          Opção 1
        </Radio>
        <Radio {...props} value="2">
          Opção 2
        </Radio>
      </Radio.RadioGroup>
    );
  },
};

