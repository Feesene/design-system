import { Meta, StoryObj } from "@storybook/react";
import ButtonTheme, { IButtonThemeProps } from "./ButtonTheme";
import React, { useState } from "react";
import HStack from "../Layout/HStack";

const meta = {
  component: ButtonTheme,
  args: {
    isDisabled: false,
    children: "",
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<IButtonThemeProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: () => {
    const [theme, changeTheme] = useState("light");

    return (
      <HStack
        justifyContent="center"
        alignItems="center"
        className={theme == "dark" ? "h-96 bg-dark-800" : "h-96 bg-default-50"}
      >
        <ButtonTheme
          theme={theme}
          onPress={({ newTheme }) => {
            changeTheme(newTheme);
          }}
        />
      </HStack>
    );
  },
};

