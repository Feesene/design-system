import { Meta, StoryObj } from "@storybook/react";
import ListView, { IListViewProps } from "./ListView";
import React from "react";

const meta = {
  component: ListView,
  args: {
    size: "md",
  },
  argTypes: {
    size: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IListViewProps<any>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <ListView
        selectionMode="multiple"
        onSelectionChange={(e) => {
          console.log("1", e);
        }}
        {...props}
      >
        <ListView.Option key={1}>Primeira opção</ListView.Option>
        <ListView.Option key={"Segunda opção"}>Segunda opção</ListView.Option>
        <ListView.Option key={"Terceira opção"}>Terceira opção</ListView.Option>
        <ListView.Option key={"Quarta opção"}>Quarta opção</ListView.Option>
        <ListView.Option key={"Quinta opção"}>Quinta opção</ListView.Option>
        <ListView.Option key={"Sexta opção"}>Sexta opção</ListView.Option>
      </ListView>
    );
  },
};

