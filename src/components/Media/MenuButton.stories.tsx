import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MenuButton, { IMenuButtonProps } from "./MenuButton";

const meta = {
  component: MenuButton,
  args: {
    isRaised: false,
    placement: "bottom left",
    size: "md",
    sizeButton: "md",
    isDisabled: false,
    values: [
      { label: "Recarregar", value: 1, description: "Recarregar informações", icon: "PiArrowClockwise" },
      { label: "Configurar", value: 2, description: "Configurar perfil", icon: "PiGear" },
      {
        label: "Remover",
        value: 3,
        description: "Remover da pasta",
        icon: "PiTrash",
        iconColor: "error",
        hasDivider: true,
      },
    ],
    children: undefined,
  },
  argTypes: {
    placement: { control: "select" },
    children: { control: false },
  },
  tags: ["autodocs"],
} satisfies Meta<IMenuButtonProps<object>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <MenuButton
        onAction={(e) => {
          console.log(e);
          alert(e);
        }}
        {...props}
      />
    );
  },
};

