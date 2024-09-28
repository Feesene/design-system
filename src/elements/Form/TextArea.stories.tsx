import { Meta, StoryObj } from "@storybook/react";
import TextArea, { ITextAreaProps } from "./TextArea";

const meta = {
  component: TextArea,
  args: {
    label: "Label",
    placeholder: "Placeholder",
    description: "Description",
    errorMessage: "Error Message",
    size: "md",
    isBlock: false,
    isReadOnly: false,
    isDisabled: false,
    elevated: false,
  },
  argTypes: {
    label: { type: "string" },
    placeholder: { type: "string" },
    description: { type: "string" },
    errorMessage: { type: "string" },
    size: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<ITextAreaProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

