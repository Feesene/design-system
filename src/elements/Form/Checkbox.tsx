"use client";

import React from "react";
import { useCheckbox, AriaCheckboxProps, VisuallyHidden } from "react-aria";
import { useToggleState } from "react-stately";
import { tv } from "tailwind-variants";

const checkbox = tv({
  slots: {
    base: "group flex w-fit cursor-pointer items-center gap-2",
    input:
      "flex items-center justify-center rounded-sm border border-default-200 bg-white transition-all duration-300 hover:border-default-300 hover:shadow-md dark:border-dark-500 dark:bg-dark-700 dark:hover:border-dark-400",
    check: "stroke-current",
    label: "text-default-content dark:text-dark-100",
  },
  variants: {
    elevated: {
      true: { input: "shadow-md dark:shadow-dark-800" },
    },
    size: {
      xs: {
        input: "h-2 w-2",
        label: "text-2xs",
        check: "h-1 w-1",
      },
      sm: {
        input: "h-3 w-3",
        label: "text-xs",
        check: "h-2 w-2",
      },
      md: {
        input: "h-4 w-4",
        label: "text-sm",
        check: "h-2.5 w-2.5",
      },
      lg: {
        input: "h-5 w-5",
        label: "text-base",
        check: "h-3 w-3",
      },
      xl: {
        input: "h-6 w-6",
        label: "text-lg",
        check: "h-3.5 w-3.5",
      },
    },
    color: {
      contentPrimary: { check: "text-content-primary dark:text-dark-100", input: "" },
      contentSecondary: { check: "text-content-secondary dark:text-dark-200", input: "" },
      contentTernary: { check: "text-content-ternary dark:text-dark-300", input: "" },
      default: { check: "text-default-content dark:text-dark-100", input: "" },
      primary: { check: "text-primary dark:text-primary-300", input: "" },
      secondary: { check: "text-secondary dark:text-secondary-400", input: "" },
      info: { check: "text-info-600 dark:text-info-400", input: "" },
      success: { check: "text-success-500 dark:text-success-400", input: "" },
      warning: { check: "text-warning-500 dark:text-warning-400", input: "" },
      error: { check: "text-error-500 dark:text-error-400", input: "" },
    },
    isSelected: { true: {}, false: {} },
    labelColor: {
      contentPrimary: { label: "text-content-primary" },
      contentSecondary: { label: "text-content-secondary" },
      contentTernary: { label: "text-content-ternary" },
      default: { label: "text-default-content" },
      primary: { label: "text-primary" },
      secondary: { label: "text-secondary" },
      info: { label: "text-info-600" },
      success: { label: "text-success-500" },
      warning: { label: "text-warning-500" },
      error: { label: "text-error-500" },
    },
    variant: {
      outline: {},
      solid: { check: "text-white dark:text-white" },
    },
    isDisabled: {
      true: { input: "bg-default-50 dark:bg-dark-600" },
    },
    isReadOnly: {
      true: {
        base: "cursor-default",
      },
      false: {
        input: "outline-focused-group",
      },
    },
  },
  compoundSlots: [
    {
      slots: ["input"],
      variant: "outline",
      isSelected: true,
      color: "primary",
      class: "border-primary dark:border-primary-300",
    },
    {
      slots: ["input"],
      variant: "outline",
      isSelected: true,
      color: "secondary",
      class: "border-secondary dark:border-secondary-400",
    },
    {
      slots: ["input"],
      variant: "outline",
      isSelected: true,
      color: "info",
      class: "border-info-600 dark:border-info-400",
    },
    {
      slots: ["input"],
      variant: "outline",
      isSelected: true,
      color: "success",
      class: "border-success-500 dark:border-success-400",
    },
    {
      slots: ["input"],
      variant: "outline",
      isSelected: true,
      color: "warning",
      class: "border-warning-500 dark:border-warning-400",
    },
    {
      slots: ["input"],
      variant: "outline",
      isSelected: true,
      color: "error",
      class: "border-error-500 dark:border-error-400",
    },

    {
      slots: ["input"],
      variant: "solid",
      isDisabled: true,
      class: "opacity-50",
    },
    {
      slots: ["input"],
      variant: "solid",
      isSelected: true,
      color: "primary",
      class: "bg-primary dark:bg-primary-400",
    },
    {
      slots: ["input"],
      variant: "solid",
      isSelected: true,
      color: "secondary",
      class: "bg-secondary dark:bg-secondary-600",
    },
    {
      slots: ["input"],
      variant: "solid",
      isSelected: true,
      color: "info",
      class: "bg-info-600 dark:bg-info-500",
    },
    {
      slots: ["input"],
      variant: "solid",
      isSelected: true,
      color: "success",
      class: "bg-success-400 dark:bg-success-400",
    },
    {
      slots: ["input"],
      variant: "solid",
      isSelected: true,
      color: "warning",
      class: "bg-warning-400 dark:bg-warning-400",
    },
    {
      slots: ["input"],
      variant: "solid",
      isSelected: true,
      color: "error",
      class: "bg-error-400 dark:bg-error-400",
    },
    {
      slots: ["input"],
      variant: "solid",
      isSelected: true,
      color: "default",
      class: "bg-default-400 dark:bg-dark-900",
    },
  ],
});

const { base, input, label, check } = checkbox();

export interface ICheckboxProps extends AriaCheckboxProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?:
    | "contentPrimary"
    | "contentSecondary"
    | "contentTernary"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "default";
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
  classNames?: { input?: string; label?: string; check?: string };
  variant?: "solid" | "outline";
  elevated?: boolean;
}

/**
 * O componente CheckBox é um elemento de entrada em uma aplicação React que permite aos usuários selecionar ou desselecionar uma opção. Ele é representado visualmente por uma caixa pequena que pode ser marcada (selecionada) ou desmarcada (não selecionada).
 */
const Checkbox = ({
  children,
  size = "md",
  color = "contentPrimary",
  labelColor = "contentPrimary",
  className,
  classNames,
  elevated = false,
  variant = "outline",
  ...props
}: ICheckboxProps) => {
  const ref = React.useRef(null);
  let state = useToggleState(props);
  const { inputProps, isSelected } = useCheckbox(
    { ...props, "aria-label": String(label) || props["aria-label"] || "check" },
    state,
    ref,
  );

  return (
    <label className={base({ class: className, isReadOnly: !!props.isReadOnly })}>
      <VisuallyHidden>
        <input {...inputProps} ref={ref} />;
      </VisuallyHidden>
      <div
        aria-hidden="true"
        className={input({
          size,
          color,
          isSelected,
          class: classNames?.input,
          elevated,
          isDisabled: props.isDisabled,
          isReadOnly: !!props.isReadOnly,
          variant,
        })}
      >
        <svg
          className={check({
            size,
            color,
            isSelected,
            class: classNames?.check,
            variant,
            isDisabled: props.isDisabled,
          })}
          viewBox="0 0 18 18"
        >
          <polyline
            points="1 9 7 14 15 4"
            fill="none"
            strokeWidth={3}
            strokeDasharray={22}
            strokeDashoffset={state.isSelected ? 44 : 66}
            style={{
              transition: "all 400ms",
            }}
          />
        </svg>
      </div>
      {children && (
        <span className={label({ size, labelColor, isReadOnly: !!props.isReadOnly, class: classNames?.label })}>
          {children}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
