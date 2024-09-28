import { Meta, StoryObj } from "@storybook/react";
import Fab, { IFabProps } from "./Fab";

const meta = {
  component: Fab,
  args: {
    children: "",
    variant: "solid",
    color: "primary",
    size: "md",
    isRaised: false,
    isDisabled: false,
    icon: undefined,
  },
  argTypes: {
    variant: { control: "select" },
    color: { control: "select" },
    size: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IFabProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

