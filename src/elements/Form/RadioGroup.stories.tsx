import { Meta, StoryObj } from "@storybook/react";
import Radio, { IRadioGroupProps } from "./Radio";
import React from "react";

const meta = {
  component: Radio.RadioGroup,
  args: {
    children: undefined,
    size: "md",
    orientation: "vertical",
    labelColor: "contentPrimary",
    isDisabled: false,
    // isInvalid: true,
    label: "Label",
    description: "Description",
    errorMessage: "Error Message",
  },
  argTypes: {
    orientation: {
      options: ["vertical", "horizontal"],
      control: { type: "radio" },
    },
    // isInvalid: { type: "boolean" },
    isDisabled: { type: "boolean" },
    children: { control: false },
    description: { type: "string" },
    errorMessage: { type: "string" },
    label: { type: "string" },
    size: { control: "select" },
    labelColor: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IRadioGroupProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <Radio.RadioGroup {...props}>
        <Radio size={props.size} value="1">
          Opção 1
        </Radio>
        <Radio size={props.size} value="2">
          Opção 2
        </Radio>
        <Radio size={props.size} value="3">
          Opção 3
        </Radio>
      </Radio.RadioGroup>
    );
  },
};

