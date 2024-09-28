import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Title, { ITitle } from "./Title";
import IconButton from "../../elements/Media/IconButton";

const meta = {
  component: Title,
  args: {
    title: "Título da página",
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<ITitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return (
      <Title {...props}>
        <IconButton isRaised circle outline color="default" className="h-8 w-8" icon={"PiBellBold"} />
        <IconButton isRaised circle outline color="warning" className="h-8 w-8" icon={"PiSunFill"} />
      </Title>
    );
  },
};
