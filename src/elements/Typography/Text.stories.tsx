import { Meta, StoryObj } from "@storybook/react";
import Text, { ITextProps } from "./Text";

const meta = {
  component: Text,
  args: {
    children: "Text",
    size: "md",
    weight: "normal",
    color: "default",
  },
  argTypes: {
    size: { control: "select" },
    weight: { control: "select" },
    color: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<ITextProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

