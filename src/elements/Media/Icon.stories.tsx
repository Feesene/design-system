import { Meta, StoryObj } from "@storybook/react";
import Icon, { IIconProps } from "./Icon";
import { allIconNames } from "../../stories/components/CardIcon";

const meta = {
  component: Icon,
  args: {
    name: "PiVanFill",
    size: "md",
    color: "default",
  },
  argTypes: {
    name: { control: "select", options: allIconNames },
    size: { control: "select" },
    color: { control: "select" },
    className: { type: "string" },
  },
  tags: ["autodocs"],
} satisfies Meta<IIconProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

