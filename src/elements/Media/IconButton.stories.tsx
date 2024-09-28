import { Meta, StoryObj } from "@storybook/react";
import IconButton, { IIconButtonProps } from "./IconButton";
import { allIconNames } from "../../stories/components/CardIcon";

const meta = {
  component: IconButton,
  args: {
    variant: "ghost",
    color: "primary",
    icon: "PiTwitterLogoFill",
    outline: true,
    isDisabled: false,
    circle: false,
    size: "md",
    isRaised: false,
    children: "",
  },
  argTypes: {
    variant: { control: "select", options: ["light", "ghost"] },
    color: { control: "select", options: ["default", "primary", "secondary", "info", "success", "warning", "error"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    icon: { control: "select", options: allIconNames },
  },
  tags: ["autodocs"],
} satisfies Meta<IIconButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

