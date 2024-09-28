import { Meta, StoryObj } from "@storybook/react";
import Checkbox, { ICheckboxProps } from "./Checkbox";
import React from "react";

const meta = {
  component: Checkbox,
  args: {
    children: "Checkbox",
    variant: "outline",
    size: "md",
    isDisabled: false,
    isReadOnly: false,
    color: "contentPrimary",
    elevated: false,
    className: "",
  },
  argTypes: {
    variant: { control: "radio" },
    children: { type: "string" },
    size: { control: "select" },
    color: { control: "select" },
    labelColor: { control: "select" },
    className: { type: "string" },
    classNames: { control: false },
  },
  tags: ["autodocs"],
} satisfies Meta<ICheckboxProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return <Checkbox {...props} />;
  },
};

