"use client";

import React from "react";
import { useDateField, AriaDateFieldProps, useDateSegment, useLocale } from "react-aria";
import { DateFieldState, DateSegment as Idatesegment, useDateFieldState } from "react-stately";
import { createCalendar } from "@internationalized/date";
import Text from "../Typography/Text";
import VStack from "../Layout/VStack";
import { tv } from "tailwind-variants";

export interface IDateFieldProps extends AriaDateFieldProps<any> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  classNames?: {
    inner?: string;
    text?: string;
  };
}

const dateField = tv({
  slots: {
    base: "flex w-fit flex-col",
    inner: "relative flex w-full flex-row items-center justify-center px-2 py-1 outline-none",
  },
});

const { base, inner } = dateField();

const DateField = ({ classNames, size, ...props }: IDateFieldProps) => {
  let { locale } = useLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = React.useRef(null);
  let { fieldProps } = useDateField(props, state, ref);

  return (
    <VStack className={base({})}>
      <div {...fieldProps} ref={ref} className={inner({ class: classNames?.inner })}>
        {state.segments.map((segment, i) => (
          <DateSegment key={i} size={size} segment={segment} state={state} className={classNames?.text} />
        ))}
      </div>
    </VStack>
  );
};

const datesegment = tv({
  slots: {
    base: "px-[1px] text-xs text-default-content outline-none focus-within:bg-primary-400 focus-within:!text-white dark:text-default-100",
    text: "!font-normal",
  },
  variants: {
    isPlaceholder: {
      true: { base: "text-content-ternary dark:text-dark-300" },
    },
    type: {
      hour: { base: "ml-1" },
      day: {},
      minute: {},
      second: {},
      era: {},
      year: {},
      month: {},
      dayPeriod: {},
      literal: { base: "text-content-primary dark:text-dark-100" },
      timeZoneName: {},
    },
  },
});

const { base: b, text } = datesegment();

export function DateSegment({
  segment,
  state,
  size,
  className,
}: {
  segment: Idatesegment;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  state: DateFieldState;
  className?: string;
}) {
  let ref = React.useRef(null);
  let { segmentProps } = useDateSegment(segment, state, ref);
  //`segment ${segment.isPlaceholder ? "placeholder" : ""

  const { type } = segment;

  return (
    <div {...segmentProps} ref={ref} className={b({ class: "", isPlaceholder: segment.isPlaceholder, type })}>
      <Text size={size} className={text({ class: className })} color="empty">
        {segment.text}
      </Text>
    </div>
  );
}

export default DateField;
