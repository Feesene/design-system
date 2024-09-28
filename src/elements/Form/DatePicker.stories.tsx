import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import DatePicker, { IDatePickerProps, IDatePickerValue } from "./DatePicker";

const meta = {
  component: DatePicker,
  args: {
    size: "md",
    label: "Data",
    isDisabled: false,
    isReadOnly: false,
    description: "description",
    errorMessage: "errorMessage",
    icon: "PiCalendar",
    granularity: "day",
    elevated: false,
    isBlock: false,
  },
  argTypes: {
    size: { control: "select" },
    description: { type: "string" },
    errorMessage: { type: "string" },
    icon: { control: "select" },
    granularity: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<IDatePickerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    const [value, setValue] = useState<IDatePickerValue>();

    return <DatePicker {...props} value={value} onChange={setValue} />;
  },
};

