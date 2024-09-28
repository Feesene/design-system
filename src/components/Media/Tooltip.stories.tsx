import { Meta, StoryObj } from "@storybook/react";
import Tooltip, { ITooltipProps, TooltipTrigger } from "./Tooltip";
import React from "react";
import Button from "../../elements/Form/Button";
import HStack from "../../elements/Layout/HStack";

const meta = {
  component: Tooltip,
  args: {
    children: "Tooltip",
    placement: "top",
    arrow: false,
    color: "default",
    size: "md",
    shapes: "rounded",
    className: "",
  },
  argTypes: {
    children: { control: "text" },
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
    color: { control: "select" },
    shapes: { control: "select" },
    size: { control: "select" },
    className: { type: "string" },
  },
  tags: ["autodocs"],
} satisfies Meta<ITooltipProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <HStack justifyContent="center" alignItems="center" style={{ height: 150 }}>
        <TooltipTrigger delay={0}>
          <Button color="primary">HOVER ME</Button>
          <Tooltip {...props} />
        </TooltipTrigger>
      </HStack>
    );
  },
};

