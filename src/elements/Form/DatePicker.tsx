"use client";

import React from "react";
import { AriaDatePickerProps, useDatePicker } from "react-aria";
import { useDatePickerState } from "react-stately";
import Popover from "../../components/Media/Popover";
import Calendar, { ICalendarProps } from "../../components/Media/Calendar";
import DateField from "./DateField";
import VStack from "../Layout/VStack";
import IconButton from "../Media/IconButton";
import { tv } from "tailwind-variants";
import { IconNames } from "../Media/Icon";
import { CalendarDate, CalendarDateTime, ZonedDateTime } from "@internationalized/date";

const datePicker = tv({
  slots: {
    base: "flex w-fit flex-col gap-[0.10rem]",
    label: "!font-normal text-default-700 dark:text-dark-100",
    inner:
      "group relative flex w-full flex-row items-center justify-start overflow-hidden rounded border border-default-200 bg-white px-3 dark:border-dark-500 dark:bg-dark-700",
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
  },
});

const { base, label: l, input, inner, description: d, errorMessage: em, icon: i } = datePicker();

export type IDatePickerValue = ZonedDateTime | CalendarDateTime | CalendarDate;

export interface IDatePickerProps extends AriaDatePickerProps<any> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  description?: string;
  errorMessage?: string;
  calendarProps?: ICalendarProps;
  icon?: IconNames;
  isBlock?: boolean;
  elevated?: boolean;
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
 * Um componente DatePicker em React é usado para selecionar datas em uma interface de usuário. Sua função principal é permitir que o usuário escolha uma data de forma intuitiva e visual.
 *
 *
 * ```tsx
 * import { today, getLocalTimeZone } from "@internationalized/date";
 *
 * const [value, setValue] = useState<IDatePickerValue>(today(getLocalTimeZone()));
 *
 *  return (
 *    <DatePicker
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
function DatePicker({
  className,
  calendarProps: IcalendarProps,
  description,
  errorMessage,
  classNames,
  size = "md",
  icon = "PiCalendar",
  elevated = false,
  isBlock,
  ...props
}: IDatePickerProps) {
  let state = useDatePickerState(props);
  let ref = React.useRef(null);
  let { groupProps, descriptionProps, errorMessageProps, labelProps, fieldProps, buttonProps, calendarProps } =
    useDatePicker(props, state, ref);

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
          isDisabled: calendarProps.isDisabled,
          isReadOnly: !!calendarProps.isReadOnly,
          elevated,
          class: classNames?.inner,
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
        <DateField
          size={size}
          {...fieldProps}
          classNames={{
            text: input({
              class: classNames?.input,
              isDisabled: calendarProps.isDisabled,
              isReadOnly: !!calendarProps.isReadOnly,
            }),
          }}
        />
      </div>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} arrow className="rounded-md p-4">
          <Calendar size="sm" {...calendarProps} />
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

export default DatePicker;
