import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Spinner, { ISpinnerProps } from "./Spinner";

const meta = {
  component: Spinner,
  args: {
    color: "primary",
    size: "md",
    isActive: true,
    duration: "medium",
    variant: "outline",
  },
  argTypes: {
    color: { control: "select" },
    variant: { control: "select" },
    size: { control: "select" },
    duration: { control: "select" },
    isActive: { control: "boolean" },
  },
  tags: ["autodocs"],
} satisfies Meta<ISpinnerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

