import { Meta, StoryObj } from "@storybook/react";
import DropZone, { IDropZoneProps } from "./DropZone";

const meta = {
  component: DropZone,
  args: {
    label: "Label",
    description: "Description",
    errorMessage: "Error Message",
    size: "md",
    isDisabled: false,
    rounded: false,
    leftIcon: "MdCloudUpload",
    isBlock: false,
    elevated: false,
  },
  argTypes: {
    label: { type: "string" },
    description: { type: "string" },
    errorMessage: { type: "string" },
    size: { control: "select" },
    leftIcon: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IDropZoneProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};

