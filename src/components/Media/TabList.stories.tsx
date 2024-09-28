import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import TabList, { ITabListProps } from "./TabList";

const meta = {
  component: TabList,
  args: {
    color: "primary",
    size: "sm",
    isBlock: false,
    type: "boxed",
    isDisabled: false,
    children: undefined,
  },
  argTypes: {
    children: { control: false },
  },
  tags: ["autodocs"],
} satisfies Meta<ITabListProps<Object>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <TabList
        {...props}
        onSelectionChange={(e) => {
          console.log(e);
        }}
      >
        <TabList.Item key="0">Team</TabList.Item>
        <TabList.Item key="1">Projects</TabList.Item>
        <TabList.Item key="2">Tasks</TabList.Item>
      </TabList>
    );
  },
};

