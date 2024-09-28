import { Meta, StoryObj } from "@storybook/react";
import ToggleButton, { IToggleButtonProps } from "./ToggleButton";
import React, { useState } from "react";
import { allIconNames } from "../../stories/components/CardIcon";

const meta = {
  component: ToggleButton,
  args: {
    isSelected: false,
    children: "Button",
    variant: "solid",
    color: "primary",
    size: "md",
    isRaised: false,
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
} satisfies Meta<IToggleButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    const [state, setState] = useState(false);

    return <ToggleButton {...props} isSelected={state} onPress={() => setState(!state)} />;
  },
};

