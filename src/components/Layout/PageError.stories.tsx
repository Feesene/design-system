import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Error, { IPageError } from "./PageError";

const meta = {
  component: Error,
  args: {
    title: "",
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  argTypes: {
    title: { control: "text" },
  },
  tags: ["autodocs"],
} satisfies Meta<IPageError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <Error {...props}></Error>;
  },
};
