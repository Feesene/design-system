"use client";

import React from "react";
import { AriaDateRangePickerProps, useDateRangePicker } from "react-aria";
import { useDateRangePickerState } from "react-stately";
import Popover from "../../components/Media/Popover";
import CalendarRange, { ICalendarRangeProps } from "../../components/Media/CalendarRange";
import DateField from "./DateField";
import HStack from "../Layout/HStack";
import VStack from "../Layout/VStack";
import IconButton from "../Media/IconButton";
import { tv } from "tailwind-variants";
import Text from "../Typography/Text";
import { IconNames } from "../Media/Icon";
import { CalendarDate, CalendarDateTime, ZonedDateTime } from "@internationalized/date";

const dateRangePicker = tv({
  slots: {
    base: "flex w-fit flex-col gap-[0.10rem]",
    label: "!font-normal text-default-700 dark:text-dark-100",
    inner:
      "outline-focused group relative flex w-full flex-row items-center justify-start overflow-hidden rounded border border-default-200 bg-white px-3 dark:border-dark-500 dark:bg-dark-700",
    description: "text-default-400 dark:text-dark-300",
    errorMessage: "text-error dark:text-error-300",
    icon: "text-default-400 group-focus-within:text-primary dark:group-focus-within:text-primary-400",
    input: "",
  },
  variants: {
    elevated: {
      true: { inner: "shadow-md dark:shadow-dark-800" },
    },
    size: {
      xs: {
        inner: "h-6",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
        icon: "h-3 w-3",
      },
      sm: {
        inner: "h-8",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
        icon: "h-4 w-4",
      },
      md: {
        inner: "h-10",
        label: "text-sm",
        description: "text-xs",
        errorMessage: "text-xs",
        icon: "h-5 w-5",
      },
      lg: {
        inner: "h-12",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
        icon: "h-6 w-6",
      },
      xl: {
        inner: "h-14",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
        icon: "h-7 w-7",
      },
    },
    isDisabled: {
      true: {
        inner: "bg-default-50 dark:bg-dark-600",
        input: "cursor-default text-default-400 dark:text-dark-300",
      },
      false: {
        inner:
          "transition-all duration-300 hover:border-default-300 hover:focus-within:border-default-200 dark:hover:border-dark-400 dark:hover:focus-within:border-dark-400",
      },
    },
    isReadOnly: {
      true: {
        label: "font-semibold text-default-900 dark:text-white",
        input: "cursor-default bg-transparent text-default-800 dark:bg-transparent",
        inner: "border-none bg-transparent dark:bg-transparent",
      },
      false: {
        inner: "outline-focused",
      },
    },
    isBlock: {
      true: { base: "w-full" },
    },
    isInvalid: {
      true: {
        inner: "!border-error-300",
      },
    },
  },
});

const { base, input, label: l, inner, description: d, errorMessage: em, icon: i } = dateRangePicker();

export type IDateRangePickerValue = {
  start: ZonedDateTime | CalendarDateTime | CalendarDate;
  end: ZonedDateTime | CalendarDateTime | CalendarDate;
};

export interface IDateRangePickerProps extends AriaDateRangePickerProps<any> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  description?: string;
  errorMessage?: string;
  calendarProps?: ICalendarRangeProps;
  icon?: IconNames;
  elevated?: boolean;
  isBlock?: boolean;
  classNames?: {
    input?: string;
    description?: string;
    errorMessage?: string;
    label?: string;
    inner?: string;
    icon?: string;
  };
}

/**
 * Um componente DatePickerRange em React é utilizado para selecionar um intervalo de datas, ou seja, uma data de início e uma data de término. Sua função principal é permitir ao usuário escolher um período de tempo de maneira intuitiva e visual.
 *
 * ```tsx
 * import { today, getLocalTimeZone } from "@internationalized/date";
 *
 * const [value, setValue] = useState<IDateRangePickerValue>();
 *
 *  return (
 *    <DataRangePicker
 *      value={value}
 *      onChange={(v) => {
 *        console.log(v);
 *        setValue(v)
 *      }}
 *    />
 *  );
 * ```
 *
 * `Mais funções de calendário e tempo:`
 * [https://react-spectrum.adobe.com/internationalized/date/index.html](https://react-spectrum.adobe.com/internationalized/date/index.html)
 */
function DateRangePicker({
  className,
  calendarProps: IcalendarProps,
  description,
  errorMessage,
  classNames,
  size = "md",
  elevated = false,
  icon = "PiCalendar",
  isBlock,
  ...props
}: IDateRangePickerProps) {
  let state = useDateRangePickerState(props);
  let ref = React.useRef(null);
  let {
    labelProps,
    groupProps,
    isInvalid,
    startFieldProps,
    descriptionProps,
    errorMessageProps,
    endFieldProps,
    buttonProps,
    calendarProps,
  } = useDateRangePicker(props, state, ref);

  return (
    <VStack className={base({ size, class: className, isBlock })}>
      {props.label && (
        <span {...labelProps} className={l({ size, class: classNames?.label, isReadOnly: !!calendarProps.isReadOnly })}>
          {props.label}
        </span>
      )}
      <div
        {...groupProps}
        ref={ref}
        className={inner({
          size,
          isInvalid,
          isDisabled: calendarProps.isDisabled,
          isReadOnly: !!calendarProps.isReadOnly,
          class: classNames?.inner,
          elevated,
        })}
      >
        <IconButton
          excludeFromTabOrder={!!calendarProps.isDisabled}
          outline={false}
          isDisabled={calendarProps.isDisabled}
          icon={icon}
          className={i({ size, isReadOnly: !!calendarProps.isReadOnly, class: classNames?.icon })}
          {...buttonProps}
        />
        <HStack alignItems="center">
          <DateField
            size={size}
            {...startFieldProps}
            classNames={{
              text: input({
                class: classNames?.input,
                isDisabled: calendarProps.isDisabled,
                isReadOnly: !!calendarProps.isReadOnly,
              }),
            }}
          />
          <Text>–</Text>
          <DateField
            size={size}
            {...endFieldProps}
            classNames={{ text: input({ class: classNames?.input, isReadOnly: !!calendarProps.isReadOnly }) }}
          />
        </HStack>
      </div>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} arrow placement="bottom start" className="rounded-md p-4">
          <CalendarRange size="sm" {...IcalendarProps} {...calendarProps} />
        </Popover>
      )}
      {description && (
        <span {...descriptionProps} className={d({ size, class: classNames?.description })}>
          {description}
        </span>
      )}
      {errorMessage && (
        <span {...errorMessageProps} className={em({ size, class: classNames?.errorMessage })}>
          {errorMessage}
        </span>
      )}
    </VStack>
  );
}

export default DateRangePicker;
