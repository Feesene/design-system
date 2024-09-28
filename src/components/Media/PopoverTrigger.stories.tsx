import { Meta, StoryObj } from "@storybook/react";
import PopoverTrigger, { IPopoverTriggerProps } from "./PopoverTrigger";
import React, { useRef } from "react";
import HStack from "../../elements/Layout/HStack";
import Button from "../../elements/Form/Button";

const meta = {
  component: PopoverTrigger,
  args: {
    children: undefined,
    popover: undefined,
    placement: "bottom",
    arrow: false,
  },
  argTypes: {
    placement: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IPopoverTriggerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    const ref = useRef<any>();
    return (
      <HStack ref={ref} justifyContent="center" alignItems="center" style={{ height: 150 }}>
        <PopoverTrigger asChild {...props} className="" popover={<div>Popover</div>}>
          <Button useButton={false} color="primary">
            CLICK ME
          </Button>
        </PopoverTrigger>
      </HStack>
    );
  },
};

