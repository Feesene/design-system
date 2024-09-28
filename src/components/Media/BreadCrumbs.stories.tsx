import { Meta, StoryObj } from "@storybook/react";
import BreadCrumbs, { IBreadCrumbsProps, IItemsBreadCrumb } from "./BreadCrumbs";
import React from "react";

const items: IItemsBreadCrumb[] = [
  { hideLabel: true, icon: "PiHouse", label: "Home", to: "/" },
  { hideLabel: false, icon: "PiAddressBook", label: "Components", to: "/teste" },
  { hideLabel: false, icon: "PiBluetooth", label: "Media", to: "/teste" },
  { hideLabel: false, label: "BreadCrumbs" },
];

const meta = {
  component: BreadCrumbs,
  args: {
    size: "md",
    color: "primary",
    items: items,
    className: "",
    separator: "PiDotOutlineFill",
  },
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "radio" },
    },
    color: { control: "select" },
    className: { type: "string" },
    separator: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IBreadCrumbsProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    return <BreadCrumbs {...props} items={items} />;
  },
};

