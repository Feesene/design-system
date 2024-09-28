import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Alert, { IAlertProps } from "./Alert";

const meta = {
  component: Alert,
  args: {
    color: "info",
    rounded: "md",
  },
  argTypes: {
    color: { control: "select" },
    rounded: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IAlertProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <Alert {...props}>
        <h1 className="mb-2 text-lg font-semibold">Iam an Alert</h1>
        <p>Lorem ipsum dolor sit amet</p>
      </Alert>
    );
  },
};

