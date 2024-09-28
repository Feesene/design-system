import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import DataRangePicker, { IDateRangePickerProps, IDateRangePickerValue } from "./DateRangePicker";
import { IDatePickerValue } from "./DatePicker";
const meta = {
  component: DataRangePicker,
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
} satisfies Meta<IDateRangePickerProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    const [value, setValue] = useState<IDateRangePickerValue>();

    return <DataRangePicker {...props} value={value} onChange={setValue} />;
  },
};

