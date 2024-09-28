import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Dropdown, { IDropdownProps } from "./Dropdown";

const meta = {
  component: Dropdown,
  args: {
    isRaised: true,
    placement: "bottom left",
    size: "md",
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
} satisfies Meta<IDropdownProps<object>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <Dropdown
        onAction={(e) => {
          console.log(e);
          alert(e);
        }}
        {...props}
      >
        Dropdown
      </Dropdown>
    );
  },
};

