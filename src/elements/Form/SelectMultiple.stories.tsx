import { Meta, StoryObj } from "@storybook/react";
import SelectMultiple, { ISelectMultipleProps } from "./SelectMultiple";
import React, { useState } from "react";
import { allIconNames } from "../../stories/components/CardIcon";

const meta = {
  component: SelectMultiple,
  args: {
    children: undefined,
    placeholder: "Selecione várias opções",
    label: "Label",
    size: "md",
    loading: false,
    isDisabled: false,
    isBlock: false,
    leftIcon: "PiUser",
    elevated: false,
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
} satisfies Meta<ISelectMultipleProps<Object>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    const [values, setValues] = useState<string[]>(["Primeira opção", "Segunda opção"]);

    return (
      <SelectMultiple
        {...props}
        description={`${values.length} selecionados`}
        className="w-1/2"
        selectedKeys={values}
        onChange={(value) => {
          setValues(value.map((key) => String(key)));
          console.log({ value });
        }}
      >
        <SelectMultiple.Section title="Selecione várias">
          <SelectMultiple.Option key={"Primeira opção"}>Primeira opção</SelectMultiple.Option>
          <SelectMultiple.Option key={"Segunda opção"}>Segunda opção</SelectMultiple.Option>
          <SelectMultiple.Option key={"Terceira opção"}>Terceira opção</SelectMultiple.Option>
          <SelectMultiple.Option key={"Quarta opção"}>Quarta opção</SelectMultiple.Option>
          <SelectMultiple.Option key={"Quinta opção"}>Quinta opção</SelectMultiple.Option>
          <SelectMultiple.Option key={"Sexta opção"}>Sexta opção</SelectMultiple.Option>
          <SelectMultiple.Option key={"Sétima opção"}>Sétima opção</SelectMultiple.Option>
          <SelectMultiple.Option key={"Oitava opção"}>Oitava opção</SelectMultiple.Option>
          <SelectMultiple.Option key={"Nona opção"}>Nona opção</SelectMultiple.Option>
          <SelectMultiple.Option key={"10"}>Decima opção</SelectMultiple.Option>
        </SelectMultiple.Section>
      </SelectMultiple>
    );
  },
};

