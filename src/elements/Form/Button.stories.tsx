import { Meta, StoryObj } from "@storybook/react";
import Button, { IButtonProps } from "./Button";
import React from "react";
import { allIconNames } from "../../stories/components/CardIcon";

const meta = {
  component: Button,
  args: {
    children: "Button",
    variant: "solid",
    color: "primary",
    size: "md",
    isRaised: true,
    isDisabled: false,
    isBlock: false,
    isLoading: false,
    leftIcon: undefined,
    rightIcon: undefined,
  },
  argTypes: {
    variant: { control: "select", options: ["solid", "outline"] },
    color: { control: "select", options: ["default", "primary", "secondary", "info", "success", "warning", "error"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    leftIcon: { control: "select", options: allIconNames },
    rightIcon: { control: "select", options: allIconNames },
  },
  tags: ["autodocs"],
} satisfies Meta<IButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return <Button {...props} />;
  },
};
