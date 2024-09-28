import { Meta, StoryObj } from "@storybook/react";
import ComboBox, { IComboBoxProps } from "./ComboBox";
import React from "react";
import { allIconNames } from "../../stories/components/CardIcon";

const meta = {
  component: ComboBox,
  args: {
    children: undefined,
    placeholder: "Selecione uma opção",
    label: "Label",
    size: "md",
    loading: false,
    isDisabled: false,
    isReadOnly: false,
    isBlock: false,
    leftIcon: "PiUser",
    description: "Description",
    errorMessage: "Error Message",
    elevated: false,
  },
  argTypes: {
    children: { control: false },
    placeholder: { type: "string" },
    label: { type: "string" },
    size: { control: "select" },
    isDisabled: { type: "boolean" },
    loading: { type: "boolean" },
    isBlock: { type: "boolean" },
    leftIcon: { control: "select", options: allIconNames },
    description: { type: "string" },
    errorMessage: { type: "string" },
    listBoxProps: { control: false },
    popoverProps: { control: false },
  },
  tags: ["autodocs"],
} satisfies Meta<IComboBoxProps<any>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <ComboBox {...props} className="w-1/2" popoverProps={{ crossOffset: 0 }}>
        <ComboBox.Option key={"Primeira opção"}>Primeira opção</ComboBox.Option>
        <ComboBox.Option key={"Segunda opção"}>Segunda opção</ComboBox.Option>
        <ComboBox.Option key={"Terceira opção"}>Terceira opção</ComboBox.Option>
        <ComboBox.Option key={"Quarta opção"}>Quarta opção</ComboBox.Option>
        <ComboBox.Option key={"Quinta opção"}>Quinta opção</ComboBox.Option>
        <ComboBox.Option key={"Sexta opção"}>Sexta opção</ComboBox.Option>
      </ComboBox>
    );
  },
};

