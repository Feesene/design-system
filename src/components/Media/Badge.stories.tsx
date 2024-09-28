import { Meta, StoryObj } from "@storybook/react";
import Badge, { IBadgeProps } from "./Badge";

const meta = {
  component: Badge,
  args: {
    variant: "light",
    children: "Badge",
    color: "primary",
    size: "md",
    isBlock: false,
  },
  argTypes: {
    variant: { control: "select" },
    color: { control: "select" },
    size: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IBadgeProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

