import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Stack, { IStackProps } from "./Stack";

const meta = {
  component: Stack,
  args: {
    flex: true,
    flexDirection: "col",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    className: "w-[400px] h-[400px]",
    bg: undefined,
  },
  argTypes: {
    flex: { control: "select" },
    flexDirection: { control: "select" },
    justifyContent: { control: "select" },
    alignItems: { control: "select" },
    gap: { control: "select" },
    bg: { control: "select" },
  },
  render: (props) => (
    <Stack {...props} className={`relative border border-dashed border-primary-400 ${props.className}`}>
      <p className="absolute -top-5 left-0 text-primary-500">VStack</p>
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
    </Stack>
  ),
  tags: ["autodocs"],
} satisfies Meta<IStackProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

