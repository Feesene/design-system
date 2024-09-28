import { Meta, StoryObj } from "@storybook/react";
import Illustration, { IIllustrationProps } from "./Illustration";

const meta = {
  component: Illustration,
  args: {
    image: "error-401",
  },
  argTypes: {
    image: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IIllustrationProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

