import { Meta, StoryObj } from "@storybook/react";
import SelectField, { ISelectFieldProps } from "./SelectField";
import React from "react";
import { allIconNames } from "../../stories/components/CardIcon";

const meta = {
  component: SelectField,
  args: {
    children: undefined,
    placeholder: "Selecione uma opção",
    label: "Label",
    size: "md",
    loading: false,
    isDisabled: false,
    isBlock: false,
    elevated: false,
    leftIcon: "PiUser",
    description: "Description",
    errorMessage: "Error Message",
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
  },
  tags: ["autodocs"],
} satisfies Meta<ISelectFieldProps<any>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <SelectField {...props} className="w-1/2" popoverProps={{ offset: -28 }}>
        <SelectField.Option key={"Primeira opção"}>Primeira opção</SelectField.Option>
        <SelectField.Option key={"Segunda opção"}>Segunda opção</SelectField.Option>
        <SelectField.Option key={"Terceira opção"}>Terceira opção</SelectField.Option>
        <SelectField.Option key={"Quarta opção"}>Quarta opção</SelectField.Option>
        <SelectField.Option key={"Quinta opção"}>Quinta opção</SelectField.Option>
        <SelectField.Option key={"Sexta opção"}>Sexta opção</SelectField.Option>
      </SelectField>
    );
  },
};

