import { Meta, StoryObj } from "@storybook/react";
import TextField, { ITextFieldProps } from "./TextField";
import React from "react";
import { allIconNames } from "../../stories/components/CardIcon";

const meta = {
  component: TextField,
  args: {
    label: "Label",
    isReadOnly: false,
    type: "text",
    isDisabled: false,
    placeholder: "Placeholder",
    description: "Description",
    errorMessage: "Error Message",
    isLoading: false,
    size: "md",
    rounded: false,
    leftIcon: undefined,
    rightIcon: undefined,
    isBlock: false,
    elevated: false,
    showPassword: true,
  },
  argTypes: {
    label: {
      type: "string",
      description: "O rótulo associado ao campo de texto",
    },
    type: {
      control: "select",
      options: [
        "color",
        "date",
        "datetime-local",
        "email",
        "month",
        "number",
        "password",
        "range",
        "search",
        "tel",
        "text",
        "time",
        "url",
        "week",
      ],
      description: "O tipo de entrada do campo de texto, definindo o formato esperado do dado",
    },
    placeholder: {
      type: "string",
      description:
        "Um texto de substituição que aparece no campo de texto quando ele está vazio, orientando o usuário sobre o que deve ser inserido",
    },
    description: {
      type: "string",
      description:
        "Uma descrição adicional para o campo de texto, geralmente usada para fornecer instruções ou informações extras ao usuário",
    },
    errorMessage: {
      type: "string",
      description: "Mensagem de erro exibida quando há um problema com a entrada do usuário",
    },
    size: {
      control: "select",
      description:
        "Define o tamanho do campo de texto. Os tamanhos disponíveis podem ser especificados dentro do componente TextField",
    },
    leftIcon: {
      control: "select",
      options: allIconNames,
      description: "Ícone exibido à esquerda do campo de texto",
    },
    rightIcon: {
      control: "select",
      options: allIconNames,
      description: "Ícone exibido à direita do campo de texto",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<ITextFieldProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return <TextField {...props} />;
  },
};
