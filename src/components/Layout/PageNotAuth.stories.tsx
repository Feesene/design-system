import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import PageNotAuth, { IPageNotAuth } from "./PageNotAuth";

const meta = {
  component: PageNotAuth,
  args: {
    children: <></>,
    message: "",
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<IPageNotAuth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <PageNotAuth {...props}></PageNotAuth>;
  },
};
