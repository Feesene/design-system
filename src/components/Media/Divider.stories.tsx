import { Meta, StoryObj } from "@storybook/react";
import Divider, { IDividerProps } from "./Divider";
import HStack from "../../elements/Layout/HStack";
import React from "react";
import VStack from "../../elements/Layout/VStack";
import Text from "../../elements/Typography/Text";

const meta = {
  component: Divider,
  args: {
    orientation: "horizontal",
    color: "contentTernary",
    size: "sm",
  },
  argTypes: {
    orientation: {
      options: ["vertical", "horizontal"],
      control: { type: "radio" },
    },
    color: { control: "select" },
    size: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IDividerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    if (props.orientation == "vertical") {
      return (
        <HStack className="h-6">
          <Text>EXEMPLO 1</Text>
          <Divider {...props} />
          <Text>EXEMPLO 2</Text>
        </HStack>
      );
    } else {
      return (
        <VStack>
          <Text>EXEMPLO 1</Text>
          <Divider {...props} />
          <Text>EXEMPLO 2</Text>
        </VStack>
      );
    }
  },
};

