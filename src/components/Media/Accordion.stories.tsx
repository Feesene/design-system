import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Accordion, { IAccordionData, IAccordionProps } from "./Accordion";

const dataTeste: IAccordionData[] = [
  { title: "Accordion Item 1", content: "Sed ut perspiciatis unde omnis iste ..." },
  { title: "Accordion Item 2", content: "Sed ut perspiciatis unde omnis iste ..." },
  { title: "Accordion Item 3", content: "Sed ut perspiciatis unde omnis iste ... " },
];

const meta = {
  component: Accordion,
  args: {
    color: "primary",
    size: "md",
    items: dataTeste,
  },
  argTypes: {
    color: { control: "select" },
    size: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IAccordionProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return <Accordion {...props} items={dataTeste} />;
  },
};

