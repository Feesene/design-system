import { Meta, StoryObj } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { IOverlayProps } from "./Overlay";
import OverlayProvider, { useOverlay } from "../../hooks/OverlayProvider";
import Button from "../../elements/Form/Button";
import Overlay from "./Overlay";
import Text from "../../elements/Typography/Text";
import TextField from "../../elements/Form/TextField";

const meta = {
  component: Overlay,
  args: {
    title: "Title",
    size: "md",
    animation: true,
    noClose: false,
    colorSuccess: "primary",
    colorCancel: "error",
    cancelLabel: "Cancelar",
    successLabel: "Confirmar",
    className: "",
    body: undefined,
  },
  decorators: [
    (Story) => (
      <OverlayProvider>
        <Story />
      </OverlayProvider>
    ),
  ],
  argTypes: {
    title: { type: "string" },
    size: { control: "select" },
    noClose: { type: "boolean" },
    colorSuccess: { control: "select" },
    colorCancel: { control: "select" },
    cancelLabel: { type: "string" },
    successLabel: { type: "string" },
    body: { control: false },
    state: { control: false },
  },

  tags: ["autodocs"],
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<IOverlayProps>;

export const Example: Story = {
  render: (props) => {
    const { showModal } = useOverlay();
    return (
      <Button
        variant="solid"
        color="primary"
        onPress={() => {
          showModal({
            ...props,
            body: () => {
              return (
                <Text className="max-w-lg">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled
                </Text>
              );
            },
          });
        }}
      >
        Show Modal
      </Button>
    );
  },
};

/**
 * ```tsx
 *   <Button
 *        variant="solid"
 *        color="primary"
 *        onPress={() => {
 *          showModal({
 *            ...props,
 *            successLabel: "Enviar",
 *            cancelLabel: "Fechar",
 *            onClickSucess: ({state, values, setErrorMessage}) => {
 *              if (!values.input) {
 *                setErrorMessage("Preencher o nome !");
 *                return false;
 *              }
 *              console.log("success", values);
 *            },
 *            body: ({state, setValues, errorMessage}) => {
 *              const [input, setInput] = useState("");
 *
 *              useEffect(() => {
 *                setValues({ input: input });
 *              }, [input]);
 *
 *              return (
 *                <>
 *                  <TextField
 *                    value={input}
 *                    label="Nome"
 *                    onChange={(value) => setInput(value)}
 *                    placeholder="Fulano da Silva"
 *                    errorMessage={errorMessage}
 *                    className="w-3/4"
 *                  />
 *                </>
 *              );
 *            },
 *          });
 *        }}
 *      >
 *        Show Modal
 *   </Button>
 * ```
 */
export const ExampleInput: Story = {
  args: {
    title: "Coloque seu nome:",
  },
  render: (props) => {
    const { showModal } = useOverlay();
    return (
      <Button
        variant="solid"
        color="primary"
        onPress={() => {
          showModal({
            ...props,
            successLabel: "Enviar",
            cancelLabel: "Fechar",
            onClickSucess: ({ state, values, setErrorMessage }) => {
              if (!values.input) {
                setErrorMessage("Preencher o nome !");
                return false;
              }
            },
            body: ({ state, setValues, errorMessage }) => {
              const [input, setInput] = useState("");

              useEffect(() => {
                setValues({ input: input });
              }, [input]);

              return (
                <>
                  <TextField
                    value={input}
                    autoFocus
                    label="Nome"
                    onChange={(value) => setInput(value)}
                    placeholder="Fulano da Silva"
                    errorMessage={errorMessage}
                    className="w-3/4"
                  />
                </>
              );
            },
          });
        }}
      >
        Show Modal
      </Button>
    );
  },
};
