import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ScrollWrapper, { IScrollWrapperProps } from "./ScrollWrapper";
import Stack from "./Stack";

const meta = {
  component: ScrollWrapper,
  args: {
    orientation: "vertical",
  },
  argTypes: {
    orientation: { control: "select" },
  },
  render: (props) => {
    return (
      <ScrollWrapper
        {...props}
        className={`relative max-h-36 border border-dashed border-primary-400 p-2 ${props.className}`}
      >
        <Stack bg="surface" className="border border-dashed border-warning-400 p-4 text-warning-800">
          Stack 1
        </Stack>
        <Stack bg="surface" className="border border-dashed border-warning-400 p-4 text-warning-800">
          Stack 2
        </Stack>
        <Stack bg="surface" className="border border-dashed border-warning-400 p-4 text-warning-800">
          Stack 3
        </Stack>
        <Stack bg="surface" className="border border-dashed border-warning-400 p-4 text-warning-800">
          Stack 4
        </Stack>
        <Stack bg="surface" className="border border-dashed border-warning-400 p-4 text-warning-800">
          Stack 5
        </Stack>
        <Stack bg="surface" className="border border-dashed border-warning-400 p-4 text-warning-800">
          Stack 6
        </Stack>
        <Stack bg="surface" className="border border-dashed border-warning-400 p-4 text-warning-800">
          Stack 7
        </Stack>
        <Stack bg="surface" className="border border-dashed border-warning-400 p-4 text-warning-800">
          Stack 8
        </Stack>
      </ScrollWrapper>
    );
  },
  tags: ["autodocs"],
} satisfies Meta<IScrollWrapperProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

