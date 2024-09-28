import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Steps, { IStepsProps } from "./Steps";

const meta = {
  component: Steps,
  args: {
    color: "primary",
    step: 1,
    steps: 4,
    showStepNumber: false,
    size: "md",
    sizeDot: "md",
    orientation: "vertical",
    labels: [
      { title: "STEP1", description: "Pessoal" },
      { title: "STEP2", description: "Endereço" },
      { title: "STEP3", description: "Entrega" },
      { title: "STEP4", description: "Pagamento" },
    ],
    onPress: (value) => {
      console.log(value);
    },
  },
  argTypes: {
    color: { control: "select" },
    size: { control: "select" },
    sizeDot: { control: "select" },
    orientation: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IStepsProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

