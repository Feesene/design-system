import { Meta, StoryObj } from "@storybook/react";
import React, { useRef } from "react";
import HStack from "../../elements/Layout/HStack";
import ModalTrigger, { IModalTriggerProps } from "./ModalTrigger";
import Heading from "../../elements/Typography/Heading";
import Text from "../../elements/Typography/Text";

const meta = {
  component: ModalTrigger,
  args: {
    children: undefined,
    title: "Title",
    size: "md",
    noClose: false,
    colorSuccess: "primary",
    colorCancel: "error",
    cancelLabel: "Cancelar",
    successLabel: "Confirmar",
    className: "",
  },
  argTypes: {
    title: { type: "string" },
    size: { control: "select" },
    noClose: { type: "boolean" },
    colorSuccess: { control: "select" },
    colorCancel: { control: "select" },
    cancelLabel: { type: "string" },
    successLabel: { type: "string" },
  },
  tags: ["autodocs"],
} satisfies Meta<IModalTriggerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    const ref = useRef<any>();
    return (
      <HStack ref={ref} justifyContent="center" alignItems="center" style={{ height: 150, padding: 10 }}>
        <ModalTrigger label={<Text>click here</Text>} {...props}>
          <>
            <Heading size="xs" color="default">
              Lorem Ipsum
            </Heading>
            <Text className="max-w-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled
            </Text>
          </>
        </ModalTrigger>
      </HStack>
    );
  },
};

