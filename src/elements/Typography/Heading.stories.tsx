import { Meta, StoryObj } from "@storybook/react";
import Heading, { IHeadingProps } from "./Heading";

const meta = {
  component: Heading,
  args: {
    children: "Heading",
    size: "md",
    weight: "bold",
    color: "default",
  },
  argTypes: {
    size: { control: "select" },
    weight: { control: "select" },
    color: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IHeadingProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

