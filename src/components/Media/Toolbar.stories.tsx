import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Toolbar, { IToolbarProps } from "./Toolbar";

const meta = {
  component: Toolbar,
  args: {
    size: "md",
    orientation: "horizontal",
    rounded: true,
    className: "",
    items: [],
  },
  argTypes: {
    color: { control: "select" },
    size: { control: "select" },
    items: { control: false },
  },
  tags: ["autodocs"],
} satisfies Meta<IToolbarProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <Toolbar
        {...props}
        items={[
          { icon: "PiBus", tooltip: "Onibus" },
          { icon: "PiCar", tooltip: "Carro" },
          { icon: "PiFinnTheHuman", tooltip: "Humano" },
          { icon: "PiBus", tooltip: "Van" },
        ]}
      />
    );
  },
};
