import { Meta, StoryObj } from "@storybook/react";
import Pagination, { IPaginationProps } from "./Pagination";
import React from "react";

const meta = {
  component: Pagination,
  args: {
    color: "primary",
    size: "md",
    control: false,
    currentPage: 1,
    totalPages: 12,
  },
  argTypes: {
    color: { control: "select" },
    size: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IPaginationProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <Pagination
        {...props}
        onChange={(page) => {
          console.log(page);
        }}
      />
    );
  },
};

