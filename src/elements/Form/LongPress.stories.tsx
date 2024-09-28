import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import LongPress, { ILongPressProps } from "./LongPress";
import Button from "./Button";

const meta = {
  component: LongPress,
  args: {
    delay: 500,
    hasFocus: true,
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<ILongPressProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <LongPress
        onPress={() => {
          alert("Click normal");
        }}
        onLongPress={() => {
          alert("Click com delay !!!");
        }}
        onLongPressEnd={(event) => {
          console.log(event);
        }}
        {...props}
      >
        <Button color="primary" useButton={false}>
          LongPress
        </Button>
      </LongPress>
    );
  },
};
