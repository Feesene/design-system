import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import PageNotFound, { IPageNotFound } from "./PageNotFound";

const meta = {
  component: PageNotFound,
  args: {
    href: "/",
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<IPageNotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <PageNotFound {...props}></PageNotFound>;
  },
};
