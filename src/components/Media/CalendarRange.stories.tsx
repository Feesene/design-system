import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import CalendarRange, { ICalendarRangeProps } from "./CalendarRange";
// import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";

const meta = {
  component: CalendarRange,
  args: {
    size: "md",
    isDisabled: false,
  },
  argTypes: {
    size: { control: "select" },
  },
  tags: ["autodocs"],
} satisfies Meta<ICalendarRangeProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    // let now = today(getLocalTimeZone());
    // let disabledRanges = [
    //   [now, now.add({ days: 5 })],
    //   [now.add({ days: 14 }), now.add({ days: 16 })],
    //   [now.add({ days: 23 }), now.add({ days: 24 })],
    // ];

    // let { locale } = useLocale();
    // let isDateUnavailable = (date: any) =>
    //   isWeekend(date, locale) ||
    //   disabledRanges.some((interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0);

    return (
      <CalendarRange
        isDisabled
        // value={today(getLocalTimeZone())}
        onChange={(value) => {
          console.log(value);
        }}
        {...props}
      />
    );
  },
};

