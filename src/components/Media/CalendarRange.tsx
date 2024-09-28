"use client";

import React, { useState } from "react";
import { tv } from "tailwind-variants";
import {
  DateValue,
  RangeCalendarProps,
  mergeProps,
  useCalendarCell,
  useCalendarGrid,
  useDateFormatter,
  useFocusRing,
  useLocale,
  useRangeCalendar,
} from "react-aria";
import { RangeCalendarState, useRangeCalendarState } from "react-stately";
import {
  createCalendar,
  getWeeksInMonth,
  CalendarDate,
  getDayOfWeek,
  isSameDay,
  today,
  getLocalTimeZone,
  isSameMonth,
} from "@internationalized/date";
import HStack from "../../elements/Layout/HStack";
import IconButton from "../../elements/Media/IconButton";
import Text from "../../elements/Typography/Text";
import ActionButton from "../../elements/Form/ActionButton";
import VStack from "../../elements/Layout/VStack";
import PopoverTrigger from "./PopoverTrigger";

export interface ICalendarRangeProps extends RangeCalendarProps<any> {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  startDate?: CalendarDate;
  endDate?: CalendarDate;
  weekdayStyle?: "narrow" | "short" | "long";
  classNames?: {
    header?: string;
    daysWeek?: string;
    dayInner?: string;
    dayLabel?: string;
  };
  isDateHighlighted?: ((date: DateValue) => boolean) | undefined;
}

const calendarRange = tv({
  slots: { base: "flex flex-col justify-center gap-2", header: "px-2" },
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
 * O componente "Calendar Range" é uma interface que permite aos usuários selecionar um intervalo de datas em um calendário. Geralmente, é usado em aplicações onde os usuários precisam selecionar um período de tempo, como ao planejar eventos, agendar compromissos, ou ao visualizar dados históricos.
 *
 * ```tsx
 * import { today, getLocalTimeZone } from "@internationalized/date";
 *
 *  return (
 *   <RangeCalendar
 *     aria-label="Trip dates"
 *     value={{
 *       start: today(getLocalTimeZone()),
 *       end: today(getLocalTimeZone()).add({ weeks: 1 })
 *     }}
 *   />
 *  );
 * ```
 *
 * `Funções de calendário e tempo:`
 * [https://react-spectrum.adobe.com/internationalized/date/index.html](https://react-spectrum.adobe.com/internationalized/date/index.html)
 */
const CalendarRange = ({ size = "md", isDateHighlighted, classNames, className, ...props }: ICalendarRangeProps) => {
  let { locale } = useLocale();
  let state = useRangeCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = React.useRef(null);
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useRangeCalendar(props, state, ref);

  return (
    <div ref={ref} {...calendarProps} className={calendarRange.base({ class: className, size })}>
      <HStack
        alignItems="center"
        justifyContent="between"
        className={calendarRange.header({ class: classNames?.header, size })}
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
        isDateHighlighted={isDateHighlighted}
        classNames={classNames}
        {...props}
      />
    </div>
  );
};

function MonthDropdown({ state, size }: { state: RangeCalendarState; size: "xs" | "sm" | "md" | "lg" }) {
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

export interface ICalendarRangeGridProps extends ICalendarRangeProps {
  state: RangeCalendarState;
  isDateHighlighted?: ((date: DateValue) => boolean) | undefined;
  offset?: any;
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

function CalendarGrid({ state, size, isDateHighlighted, classNames, offset = {}, ...props }: ICalendarRangeGridProps) {
  let { locale } = useLocale();
  let { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);
  let startDate = state.visibleRange.start.add(offset);
  let weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} cellPadding="0" className="flex-1">
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index} className={calendargrid({ class: "", size })}>
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
              .getDatesInWeek(weekIndex, startDate)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={i}
                    state={state}
                    currentMonth={startDate}
                    isDateHighlighted={isDateHighlighted}
                    date={date}
                    size={size}
                    classNames={classNames}
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

const calendarRangecell = tv({
  slots: {
    dayInner: "group outline-none",
    dayLabel: "flex h-full w-full items-center justify-center rounded-full text-content-primary dark:text-dark-200",
  },
  variants: {
    size: {
      xs: { dayInner: "h-5 w-full", dayLabel: "text-2xs" },
      sm: { dayInner: "h-7 w-full", dayLabel: "text-xs" },
      md: { dayInner: "h-8 w-full", dayLabel: "text-xs" },
      lg: { dayInner: "h-10 w-full", dayLabel: "text-xs" },
    },
    isHighlighted: {
      true: { dayLabel: "font-black text-success-400 dark:text-success-400" },
    },
    isUnavailable: {
      false: {},
      true: { dayLabel: "" },
    },
    isToday: {
      true: { dayLabel: "font-black text-default-900 dark:text-white" },
    },
    isSelected: {
      true: { dayLabel: "text-primary-950 dark:text-primary-950" },
      false: { dayLabel: "" },
    },
    isDisabled: {
      true: { dayLabel: "cursor-default text-default-200 dark:text-dark-300" },
      false: "",
    },
  },
})();

export interface ICalendarRangeCellProps extends ICalendarRangeProps {
  state: RangeCalendarState;
  date: any;
  currentMonth: any;
  isDateHighlighted?: ((date: DateValue) => boolean) | undefined;
}

function CalendarCell({ state, currentMonth, isDateHighlighted, date, size, classNames }: ICalendarRangeCellProps) {
  let ref = React.useRef(null);
  const [isHighlighted] = useState(isDateHighlighted ? isDateHighlighted(date) : false);

  let { cellProps, buttonProps, isSelected, isDisabled, formattedDate } = useCalendarCell({ date }, state, ref);
  let isOutsideMonth = !isSameMonth(currentMonth, date);

  const isToday = isSameDay(date, today(getLocalTimeZone()));

  let isSelectionStart = state.highlightedRange ? isSameDay(date, state.highlightedRange.start) : isSelected;
  let isSelectionEnd = state.highlightedRange ? isSameDay(date, state.highlightedRange.end) : isSelected;

  let { locale } = useLocale();
  let dayOfWeek = getDayOfWeek(date, locale);
  let isRoundedLeft = isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1);
  let isRoundedRight =
    isSelected && (isSelectionEnd || dayOfWeek === 6 || date.day === date.calendar.getDaysInMonth(date));

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td {...cellProps} className={`relative py-0.5 ${isFocusVisible ? "z-10" : "z-0"}`}>
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideMonth}
        className={calendarRangecell.dayInner({
          class: `${isRoundedLeft && "rounded-l-full"} ${isRoundedRight && "rounded-r-full"} ${
            isSelected ? "bg-primary-200 dark:bg-primary-200/80" : ""
          }   ${classNames?.dayInner}`,
          size,
        })}
      >
        <div
          className={calendarRangecell.dayLabel({
            class: `${isFocusVisible && "group-focus:z-2 ring-1 ring-primary-500 ring-offset-2"} ${
              isSelectionStart || isSelectionEnd ? "bg-primary-400 !text-white hover:bg-primary-500" : ""
            } ${isSelected && !(isSelectionStart || isSelectionEnd) ? "hover:bg-primary-200" : ""} ${
              !isSelected && !isDisabled ? "hover:bg-primary-50 dark:hover:bg-primary-500/40" : ""
            } ${classNames?.dayLabel}`,
            size,
            isToday,
            isDisabled,
            isSelected,
            isHighlighted,
          })}
          color={"default"}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  );
}

export default CalendarRange;
