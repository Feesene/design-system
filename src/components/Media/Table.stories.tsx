import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Table, { ITableProps } from "./Table";

const meta = {
  component: Table,
  args: {
    striped: true,
    children: undefined,
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<ITableProps<any>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <Table aria-label="Example static collection table" className="h-fit w-[500px]" {...props}>
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Type</Table.Column>
          <Table.Column>Date Modified</Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row key={1}>
            <Table.Cell>Games</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>6/7/2020</Table.Cell>
          </Table.Row>
          <Table.Row key={2}>
            <Table.Cell>Program Files</Table.Cell>
            <Table.Cell>File folder</Table.Cell>
            <Table.Cell>4/7/2021</Table.Cell>
          </Table.Row>
          <Table.Row key={3}>
            <Table.Cell>bootmgr</Table.Cell>
            <Table.Cell>System file</Table.Cell>
            <Table.Cell>11/20/2010</Table.Cell>
          </Table.Row>
          <Table.Row key={4}>
            <Table.Cell>bootmgr</Table.Cell>
            <Table.Cell>System file</Table.Cell>
            <Table.Cell>11/20/2010</Table.Cell>
          </Table.Row>
          <Table.Row key={5}>
            <Table.Cell>bootmgr</Table.Cell>
            <Table.Cell>System file</Table.Cell>
            <Table.Cell>11/20/2010</Table.Cell>
          </Table.Row>
          <Table.Row key={6}>
            <Table.Cell>bootmgr</Table.Cell>
            <Table.Cell>System file</Table.Cell>
            <Table.Cell>11/20/2010</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  },
};

