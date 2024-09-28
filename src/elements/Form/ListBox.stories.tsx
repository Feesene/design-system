import { Meta, StoryObj } from "@storybook/react";
import ListBox, { IListBoxProps } from "./ListBox";
import React, { useState } from "react";

const meta = {
  component: ListBox,
  args: {
    size: "md",
    label: "Selecionar Vários",
    selectionMode: "multiple",
    selectionBehavior: "replace",
    description: "Mantenha o 'Ctrl' pressionado para selecionar outro",
    errorMessage: "errorMessage",
    hasBorder: true,
    elevated: false,
    hoverBg: false,
  },
  argTypes: {
    selectionMode: { control: "select" },
    selectionBehavior: { control: "select" },
    listBoxRef: { control: false },
    state: { control: false },
  },
  tags: ["autodocs"],
} satisfies Meta<IListBoxProps<any>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Partial<Story> = {
  render: (props) => {
    const [values, setValues] = useState<string[]>(["pri", "oit"]);

    return (
      <ListBox
        {...props}
        selectedKeys={values}
        onChange={(value) => {
          setValues(value.map((key) => String(key)));
        }}
        disabledKeys={["set"]}
      >
        <ListBox.Item key={"pri"}>1º Item</ListBox.Item>
        <ListBox.Item key={"seg"}>2º Item</ListBox.Item>
        <ListBox.Item key={"ter"}>3º Item</ListBox.Item>
        <ListBox.Item key={"qua"}>4º Item</ListBox.Item>
        <ListBox.Section title="Últimos">
          <ListBox.Item key={"qui"}>5º Item</ListBox.Item>
          <ListBox.Item key={"sex"}>6º Item</ListBox.Item>
          <ListBox.Item key={"set"}>7º Item</ListBox.Item>
          <ListBox.Item key={"oit"}>8º Item</ListBox.Item>
        </ListBox.Section>
      </ListBox>
    );
  },
};

