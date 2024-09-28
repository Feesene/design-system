import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Card, { ICardProps } from "./Card";
import Heading from "../../elements/Typography/Heading";
import Text from "../../elements/Typography/Text";

const meta = {
  component: Card,
  args: {
    bg: "surface",
    rounded: "sm",
    animation: false,
    elevated: true,
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quibusnam praeteritis? At multis se probavit. Quoniam, si dis placet, ab Epicuro loqui discimus. Et ille ridens.",
  },
  argTypes: {
    bg: { control: "select" },
    rounded: { control: "select" },
    elevated: { control: "boolean" },
    animation: { type: "boolean" },
  },
  tags: ["autodocs"],
} satisfies Meta<ICardProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return (
      <Card {...props}>
        <Card.Header>
          <Heading className="mb-2 text-lg font-semibold">Card Header</Heading>
        </Card.Header>
        <Card.Content>
          <Heading className="mb-2 text-lg font-semibold">Card Content</Heading>
          <Text>{String(props.children)}</Text>
        </Card.Content>
        <Card.Footer>
          <Heading className="mb-2 text-lg font-semibold"> Card Footer</Heading>
        </Card.Footer>
      </Card>
    );
  },
};

