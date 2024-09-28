import { Meta, StoryObj } from "@storybook/react";
import Switch, { ISwitchProps } from "./Switch";

const meta = {
  component: Switch,
  args: {
    children: "Switch",
    size: "md",
    color: "primary",
    labelColor: "primary",
    className: "",
    isDisabled: false,
    elevated: false,
    colorFalse: "default",
  },
  argTypes: {
    children: { type: "string" },
    size: { control: "select" },
    color: { control: "select" },
    labelColor: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<ISwitchProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

