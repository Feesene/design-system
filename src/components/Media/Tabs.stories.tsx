import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Tabs, { ITabsData, ITabsProps } from "./Tabs";

const dataTeste: ITabsData[] = [
  {
    title: "Produtos",
    content:
      " 1 - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.",

    icon: "PiGearDuotone",
  },
  {
    title: "Lojas",
    content: () => (
      <>
        2 - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
        it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
        sheets.
      </>
    ),
    icon: "PiStorefront",
  },
  {
    title: "Estoque",
    content: () => (
      <>
        3 - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
        it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
        sheets
      </>
    ),
    icon: "PiTelevision",
  },
];

const meta = {
  component: Tabs,
  args: {
    color: "primary",
    size: "md",
    alignTabs: "left",
    items: dataTeste,
  },
  argTypes: {
    color: { control: "select" },
    size: { control: "select" },
    alignTabs: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<ITabsProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return <Tabs {...props} items={dataTeste} />;
  },
};

