import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Button from "../../elements/Form/Button";
import toast, { ToasterProvider } from "./ToastSonner";
import delay from "../../utils/delay";
import { ToasterProps } from "sonner";
import HStack from "../../elements/Layout/HStack";

const meta = {
  component: ToasterProvider,
  args: {},
  decorators: [
    (Story) => (
      <HStack justifyContent="center" alignItems="center" className="h-[300px] py-10">
        <ToasterProvider />
        <Story />
      </HStack>
    ),
  ],
  argTypes: {},

  tags: ["autodocs"],
} satisfies Meta<ToasterProps>;

export default meta;
type Story = StoryObj<any>;

export const Example: Story = {
  render: (props) => {
    return (
      <>
        <Button
          variant="solid"
          color="primary"
          onPress={() => {
            toast.info("Informação", {
              position: "top-left",
              description: "Descrição do evento",
            });
            toast.promise(
              async () => {
                await delay(2000);
                return "Enviado com sucesso !";
              },
              {
                loading: "Enviando...",
                success: (data) => {
                  return data;
                },
                error: (value) => value.message,
              },
            );
            toast.error("Erro", {
              position: "bottom-left",
              dismissible: false,
              closeButton: false,
            });
            toast.warning("Atenção", {
              action: { label: "OK", onClick: () => {} },
              duration: Infinity,
              position: "bottom-right",
            });
          }}
        >
          Show toast
        </Button>
      </>
    );
  },
};

