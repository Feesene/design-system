import { Meta, StoryObj } from "@storybook/react";
import Link, { ILinkProps } from "./Link";

const meta = {
  component: Link,
  args: {
    children: "Link",
    href: "/",
    size: "md",
  },
  argTypes: {
    href: { type: "string" },
    size: { control: "select" },
    color: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<ILinkProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

