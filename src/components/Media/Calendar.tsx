"use client";

import React, { useState } from "react";
import { tv } from "tailwind-variants";
import VStack from "../../elements/Layout/VStack";
import HStack from "../../elements/Layout/HStack";
import {
  CalendarProps,
  useCalendarGrid,
  useCalendar,
  useLocale,
  useCalendarCell,
  DateValue,
  useDateFormatter,
} from "react-aria";
import { CalendarState, useCalendarState } from "react-stately";
import {
  createCalendar,
  getWeeksInMonth,
  CalendarDate,
  isSameDay,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import Text from "../../elements/Typography/Text";
import IconButton from "../../elements/Media/IconButton";
import PopoverTrigger from "./PopoverTrigger";
import ActionButton from "../../elements/Form/ActionButton";

export interface ICalendarProps extends CalendarProps<any> {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  classNames?: {
    header?: string;
    daysWeek?: string;
    dayInner?: string;
    dayLabel?: string;
  };
  startDate?: CalendarDate;
  endDate?: CalendarDate;
  weekdayStyle?: "narrow" | "short" | "long";
  isDateHighlighted?: ((date: DateValue) => boolean) | undefined;
}

const calendar = tv({
  slots: { base: "gap-2", header: "px-2" },
  variants: {
    size: {
      xs: { base: "w-40" },
      sm: { base: "w-52" },
      md: { base: "w-64" },
      lg: { base: "w-72" },
    },
  },
})();

/**
 * Um componente de calendário React é um elemento de interface de usuário que permite aos desenvolvedores integrar funcionalidades de calendário em suas aplicações React. Esse componente geralmente exibe um calendário visual que os usuários podem interagir para visualizar e selecionar datas.
 *
 *
 * ```tsx
 * import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
 *
 *  let now = today(getLocalTimeZone());
 *  let disabledRanges = [
 *    [now, now.add({ days: 5 })],
 *    [now.add({ days: 14 }), now.add({ days: 16 })],
 *    [now.add({ days: 23 }), now.add({ days: 24 })],
 *  ];
 *
 *  let { locale } = useLocale();
 *  let isDateUnavailable = (date: any) =>
 *    isWeekend(date, locale) ||
 *    disabledRanges.some((interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0);
 *
 *  return (
 *    <Calendar
 *      isDisabled
 *      // value={today(getLocalTimeZone())}
 *      isDateUnavailable={isDateUnavailable}
 *      onChange={(value) => {
 *        console.log(value);
 *      }}
 *    />
 *  );
 * ```
 *
 * `Funções de calendário e tempo:`
 * [https://react-spectrum.adobe.com/internationalized/date/index.html](https://react-spectrum.adobe.com/internationalized/date/index.html)
 */
const Calendar = ({ size = "md", isDateHighlighted, classNames, className, ...props }: ICalendarProps) => {
  let { locale } = useLocale();

  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(props, state);

  return (
    <VStack justifyContent="center" {...calendarProps} className={calendar.base({ class: className, size })}>
      <HStack
        alignItems="center"
        justifyContent="between"
        className={calendar.header({ class: classNames?.header, size })}
      >
        <IconButton classNames={{ icon: "ml-1" }} size="xs" icon="MdArrowBackIos" {...prevButtonProps} />

        <PopoverTrigger
          arrow
          showFocus
          classNames={{ button: "rounded-sm px-2" }}
          popover={
            <HStack alignItems="center" justifyContent="center" gap={1} className="w-36 flex-wrap">
              <MonthDropdown state={state} size={size} />
            </HStack>
          }
        >
          <Text size={size == "xs" ? "sm" : "md"} weight="bold" color="default" className="text-nowrap text-center">
            {title}
          </Text>
        </PopoverTrigger>

        <IconButton size="xs" icon="MdArrowForwardIos" {...nextButtonProps} />
      </HStack>
      <CalendarGrid
        state={state}
        size={size}
        classNames={classNames}
        isDateHighlighted={isDateHighlighted}
        {...props}
      />
    </VStack>
  );
};

function MonthDropdown({ state, size }: { state: CalendarState; size: "xs" | "sm" | "md" | "lg" }) {
  const [year, setYear] = useState(state.focusedDate.year);
  let months = [];
  let formatter = useDateFormatter({
    month: "short",
    timeZone: state.timeZone,
  });

  let numMonths = state.focusedDate.calendar.getMonthsInYear(state.focusedDate);
  for (let i = 1; i <= numMonths; i++) {
    let date = state.focusedDate.set({ month: i });
    months.push(formatter.format(date.toDate(state.timeZone)));
  }

  let onChange = (value: number) => {
    let date = state.focusedDate.set({ month: value, year });
    state.setFocusedDate(date);
  };

  return (
    <VStack alignItems="center">
      <HStack justifyContent="between" alignItems="center" className="w-full px-4">
        <IconButton
          size="xs"
          icon="MdArrowBackIos"
          onPress={() => {
            setYear(year - 1);
          }}
        />
        <Text weight="bold" color="default" className="py-1">
          {year}
        </Text>
        <IconButton
          size="xs"
          icon="MdArrowForwardIos"
          onPress={() => {
            setYear(year + 1);
          }}
        />
      </HStack>
      <HStack className="w-full flex-wrap justify-center gap-2">
        {months.map((value, i) => {
          const selected =
            state.focusedDate.month == Number(i + 1)
              ? "bg-primary-400 text-white dark:text-white hover:text-white"
              : "";

          return (
            <ActionButton
              onPress={() => onChange(i + 1)}
              autoFocus={state.focusedDate.month == Number(i + 1) ? true : false}
              className={`w-1/4 rounded-sm p-1 text-content-primary hover:text-default-900 dark:text-dark-100 hover:dark:text-default-50 ${selected}`}
            >
              <Text color={"empty"} className={`text-center uppercase`}>
                {value}
              </Text>
            </ActionButton>
          );
        })}
      </HStack>
    </VStack>
  );
}

export interface ICalendarGridProps extends ICalendarProps {
  state: CalendarState;
  isDateHighlighted?: ((date: DateValue) => boolean) | undefined;
}

const calendargrid = tv({
  base: "",
  variants: {
    size: {
      xs: "h-4",
      sm: "h-6",
      md: "h-6",
      lg: "h-6",
    },
  },
});

function CalendarGrid({ state, size, isDateHighlighted, classNames, ...props }: ICalendarGridProps) {
  let { locale } = useLocale();
  let { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  let weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th className={calendargrid({ class: classNames?.daysWeek, size })} key={index}>
              <Text size={size == "xs" ? "xs" : "sm"} weight="bold" color="contentPrimary">
                {day}
              </Text>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i: number) =>
                date ? (
                  <CalendarCell
                    key={i}
                    state={state}
                    date={date}
                    size={size}
                    isDateHighlighted={isDateHighlighted}
                    classNames={classNames}
                    {...props}
                  />
                ) : (
                  <td key={i} />
                ),
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const calendarcell = tv({
  slots: {
    dayInner: "flex items-center justify-center text-center outline-none",
    dayLabel: "flex items-center justify-center rounded-full text-content-primary dark:text-dark-200",
  },
  variants: {
    size: {
      xs: { dayInner: "h-4", dayLabel: "h-4 w-4 text-2xs" },
      sm: { dayInner: "h-6", dayLabel: "h-6 w-6 text-xs" },
      md: { dayInner: "h-6", dayLabel: "h-6 w-6 text-xs" },
      lg: { dayInner: "h-6", dayLabel: "h-6 w-6 text-xs" },
    },
    isHighlighted: {
      true: {},
    },
    isToday: {
      true: { dayLabel: "font-black text-default-900 dark:text-white" },
    },
    isSelected: {
      true: { dayLabel: "bg-primary-400 text-white dark:text-white" },
      false: { dayLabel: "" },
    },
    isDisabled: {
      true: { dayLabel: "text-default-100 dark:text-dark-600" },
      false: "",
    },
    isUnavailable: {
      false: {},
      true: { dayLabel: "text-default-200 dark:text-dark-500" },
    },
  },
  compoundSlots: [
    {
      class: "font-black text-success-400 dark:text-success-400",
      slots: ["dayLabel"],
      isUnavailable: false,
      isDisabled: false,
      isSelected: false,
      isHighlighted: true,
    },
    {
      class: "hover:bg-default-100 dark:hover:bg-dark-500",
      slots: ["dayLabel"],
      isUnavailable: false,
      isDisabled: false,
      isSelected: false,
    },
    {
      class:
        "rounded-full focus-within:outline-dashed focus-within:outline-1 focus-within:outline-offset-[1px] focus-within:outline-default-300 dark:outline-default-100 dark:focus-within:outline-dark-400",
      slots: ["dayLabel"],
      isUnavailable: false,
      isDisabled: false,
    },
  ],
})();

export interface ICalendarCellProps extends ICalendarProps {
  state: CalendarState;
  date: CalendarDate;
  isDateHighlighted?: ((date: DateValue) => boolean) | undefined;
}

function CalendarCell({ state, isDateHighlighted, date, size, classNames }: ICalendarCellProps) {
  let ref = React.useRef(null);
  let { cellProps, buttonProps, isUnavailable, isSelected, isOutsideVisibleRange, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref);

  const [isHighlighted] = useState(isDateHighlighted ? isDateHighlighted(date) : false);

  const isToday = isSameDay(date, today(getLocalTimeZone()));

  return (
    <td {...cellProps}>
      <div
        className={calendarcell.dayInner({
          class: classNames?.dayInner,
          isDisabled,
          size,
        })}
      >
        <div
          {...buttonProps}
          ref={ref}
          hidden={isOutsideVisibleRange}
          color="default"
          className={calendarcell.dayLabel({
            size,
            isToday,
            isDisabled,
            isSelected,
            isHighlighted,
            isUnavailable: !!isUnavailable,
            class: classNames?.dayLabel,
          })}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  );
}

export default Calendar;
