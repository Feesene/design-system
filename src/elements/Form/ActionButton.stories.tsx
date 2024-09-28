import { Meta, StoryObj } from "@storybook/react";
import ActionButton, { IActionButtonProps } from "./ActionButton";
import React from "react";
import Text from "../Typography/Text";

const meta = {
  component: ActionButton,
  args: {
    children: "ActionButton",
    hasFocus: true,
    isDisabled: false,
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<IActionButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <ActionButton {...props} onPress={() => console.log("Click")}>
        <Text>{props.children}</Text>
      </ActionButton>
    );
  },
};

