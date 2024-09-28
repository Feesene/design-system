import { Meta, StoryObj } from "@storybook/react";
import SearchField, { ISearchFieldProps } from "./SearchField";

const meta = {
  component: SearchField,
  args: {
    label: "Label",
    placeholder: "Placeholder",
    description: "Description",
    errorMessage: "Error Message",
    isLoading: false,
    size: "md",
    isDisabled: false,
    rounded: false,
    leftIcon: undefined,
    isBlock: false,
    elevated: false,
  },
  argTypes: {
    label: { type: "string" },
    placeholder: { type: "string" },
    description: { type: "string" },
    errorMessage: { type: "string" },
    size: { control: "select" },
    leftIcon: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<ISearchFieldProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

