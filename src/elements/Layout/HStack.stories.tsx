import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Stack from "./Stack";
import HStack, { IHStackProps } from "./HStack";

const meta = {
  component: HStack,
  args: {
    flex: true,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    className: "min-h-[100px] w-full bg-primary-50",
  },
  argTypes: {
    flex: { control: "select" },
    justifyContent: { control: "select" },
    alignItems: { control: "select" },
    gap: { control: "select" },
  },
  render: (props) => (
    <HStack {...props} className={`relative border border-dashed border-primary-400 ${props.className}`}>
      <p className="absolute -top-5 left-0 text-primary-500">HStack</p>
      <Stack className="border border-dashed border-warning-400 bg-warning-100 p-4 text-warning-800">Stack 1</Stack>
      <Stack className="border border-dashed border-warning-400 bg-warning-100 p-4 text-warning-800">Stack 2</Stack>
      <Stack className="border border-dashed border-warning-400 bg-warning-100 p-4 text-warning-800">Stack 3</Stack>
      <Stack className="border border-dashed border-warning-400 bg-warning-100 p-4 text-warning-800">Stack 4</Stack>
    </HStack>
  ),
  tags: ["autodocs"],
} satisfies Meta<IHStackProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

