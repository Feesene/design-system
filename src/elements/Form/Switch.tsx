"use client";

import React from "react";
import { AriaSwitchProps, VisuallyHidden, useSwitch, useFocusRing } from "react-aria";
import { useToggleState } from "react-stately";
import { tv } from "tailwind-variants";

const switchVar = tv({
  slots: {
    base: "group flex w-fit cursor-pointer items-center gap-2",
    input:
      "outline-focused-group flex items-center rounded-full border border-white transition-all duration-300 dark:border-dark-500",
    check: "flex items-center justify-center rounded-full bg-white shadow-lg duration-300 dark:bg-dark-200 ",
    label: "text-default-content",
  },
  variants: {
    colorFalse: {
      default: {},
      primary: { check: "dark:bg-white" },
      secondary: { check: "dark:bg-white" },
      info: { check: "dark:bg-white" },
      success: { check: "dark:bg-white" },
      warning: { check: "dark:bg-white" },
      error: { check: "dark:bg-white" },
    },
    elevated: {
      true: { input: "shadow-md dark:shadow-dark-800" },
    },
    size: {
      xs: {
        input: "h-4 w-8 px-[0.2rem]",
        label: "text-2xs",
        check: "h-2 w-2",
      },
      sm: {
        input: "h-6 w-12 px-[0.25rem]",
        label: "text-xs",
        check: "h-4 w-4",
      },
      md: {
        input: "h-8 w-16 px-1",
        label: "text-sm",
        check: "h-6 w-6",
      },
      lg: {
        input: "h-10 w-20 px-1",
        label: "text-base",
        check: "h-8 w-8",
      },
      xl: {
        input: "h-12 w-24 px-1",
        label: "text-lg",
        check: "h-10 w-10",
      },
    },
    checked: {
      true: { check: "dark:bg-white" },
    },
    color: {
      default: {},
      primary: {},
      secondary: {},
      info: {},
      success: {},
      warning: {},
      error: {},
    },
    labelColor: {
      contentPrimary: { label: "text-content-primary dark:text-dark-100" },
      contentSecondary: { label: "text-content-secondary dark:text-dark-200" },
      contentTernary: { label: "text-content-ternary dark:text-dark-300" },
      default: { label: "text-default-content dark:text-dark-100" },
      primary: { label: "text-primary dark:text-primary-300" },
      secondary: { label: "text-secondary dark:text-secondary-500" },
      info: { label: "text-info-600 dark:text-info-400" },
      success: { label: "text-success-500 dark:text-success-400" },
      warning: { label: "text-warning-500 dark:text-warning-400" },
      error: { label: "text-error-500 dark:text-error-400" },
    },
    isDisabled: {
      true: {
        input: "opacity-50",
      },
    },
  },
  compoundSlots: [
    {
      slots: ["check"],
      checked: true,
      size: "xs",
      class: "translate-x-[16px]",
    },
    {
      slots: ["check"],
      checked: true,
      size: "sm",
      class: "translate-x-[22px]",
    },
    {
      slots: ["check"],
      checked: true,
      size: "md",
      class: "translate-x-[30px]",
    },

    {
      slots: ["check"],
      checked: true,
      size: "lg",
      class: "translate-x-[38px]",
    },
    {
      slots: ["check"],
      checked: true,
      size: "xl",
      class: "translate-x-[46px]",
    },
    {
      slots: ["input"],
      checked: true,
      color: "primary",
      class: "bg-primary dark:bg-primary-400",
    },
    {
      checked: true,
      color: "secondary",
      slots: ["input"],
      class: "bg-secondary dark:bg-secondary-500",
    },
    {
      checked: true,
      color: "info",
      slots: ["input"],
      class: "bg-info-600 dark:bg-info-500",
    },
    {
      checked: true,
      color: "warning",
      slots: ["input"],
      class: "bg-warning-500 dark:bg-warning-400",
    },
    {
      checked: true,
      color: "success",
      slots: ["input"],
      class: "bg-success-500 dark:bg-success-400",
    },
    {
      checked: true,
      color: "error",
      slots: ["input"],
      class: "bg-error-500 dark:bg-error-400",
    },
    {
      slots: ["input"],
      checked: true,
      color: "default",
      class: "bg-default-600 dark:bg-dark-500",
    },

    {
      slots: ["input"],
      checked: false,
      colorFalse: "primary",
      class: "bg-primary dark:bg-primary-400",
    },
    {
      checked: false,
      colorFalse: "secondary",
      slots: ["input"],
      class: "bg-secondary dark:bg-secondary-500",
    },
    {
      checked: false,
      colorFalse: "info",
      slots: ["input"],
      class: "bg-info-500 dark:bg-info-500",
    },
    {
      checked: false,
      colorFalse: "warning",
      slots: ["input"],
      class: "bg-warning-400 dark:bg-warning-400",
    },
    {
      checked: false,
      colorFalse: "success",
      slots: ["input"],
      class: "bg-success-400 dark:bg-success-400",
    },
    {
      checked: false,
      colorFalse: "error",
      slots: ["input"],
      class: "bg-error-400 dark:bg-error-400",
    },
    {
      slots: ["input"],
      checked: false,
      colorFalse: "default",
      class: "bg-default-200 dark:bg-dark-800",
    },
  ],
});

const { base, input, label, check } = switchVar();

export interface ISwitchProps extends AriaSwitchProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  colorFalse?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  labelColor?:
    | "contentPrimary"
    | "contentSecondary"
    | "contentTernary"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error";
  className?: string;
  elevated?: boolean;
  classNames?: { input?: string; label?: string; check?: string };
  icon?: React.ReactElement;
}

/**
 * O componente Switch é uma interface interativa em uma aplicação React que permite aos usuários alternar entre dois estados
 */
const Switch = ({
  children,
  size = "md",
  color = "primary",
  labelColor = "contentPrimary",
  colorFalse = "default",
  className,
  classNames,
  icon,
  elevated = false,
  ...props
}: ISwitchProps) => {
  let state = useToggleState(props);
  let ref = React.useRef(null);
  let { inputProps } = useSwitch({ ...props, "aria-label": props["aria-label"] || "switch" }, state, ref);
  let { focusProps } = useFocusRing();

  // useEffect(() => {
  //   console.log(isFocusVisible, "teste");
  // }, [isFocusVisible]);

  return (
    <label className={base({ class: className })}>
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div
        aria-hidden="true"
        className={input({
          size,
          checked: state.isSelected,
          color,
          isDisabled: props.isDisabled,
          colorFalse,
          class: classNames?.input,
          elevated,
        })}
      >
        <div
          className={check({
            size,
            colorFalse,
            class: classNames?.check,
            color,
            checked: state.isSelected,
          })}
        >
          {icon}
        </div>
      </div>
      <span className={label({ size, labelColor, class: classNames?.label })}>{children}</span>
    </label>
  );
};

export default Switch;
