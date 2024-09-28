import { Meta, StoryObj } from "@storybook/react";
import Avatar, { IAvatarProps } from "./Avatar";



const meta = {
  component: Avatar,
  args: {
    initials: "EX",
    src: "/theming.png",
    color: "default",
    size: "md",
    isSquare: false,
    isOutline: false,
  },
  argTypes: {
    initials: { type: "string" },
    src: { type: "string" },
    size: { control: "select" },
    isSquare: { type: "boolean" },
    isOutline: { type: "boolean" },
  },
  tags: ["autodocs"],
} satisfies Meta<IAvatarProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

