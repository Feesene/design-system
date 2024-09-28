import { Meta, StoryObj } from "@storybook/react";
import Image, { IImageProps } from "./Image";


const meta = {
  component: Image,
  args: {
    src: "/theming.png",
    width: 300,
  },
  argTypes: {
    src: { type: "string" },
    width: { type: "number" },
    height: { type: "number" },
  },
  tags: ["autodocs"],
} satisfies Meta<IImageProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

