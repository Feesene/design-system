import { Meta, StoryObj } from "@storybook/react";
import Placeload, { IPlaceloadProps } from "./Placeload";
import React from "react";

const meta = {
  component: Placeload,
  args: {
    color: "default",
  },
  argTypes: {
    color: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IPlaceloadProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return <Placeload className="h-20 w-64" {...props} />;
  },
};

