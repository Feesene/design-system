"use client";

import React from "react";
import { AriaRadioGroupProps, AriaRadioProps, useRadio, useRadioGroup } from "react-aria";
import { tv } from "tailwind-variants";
import { useFocusRing, VisuallyHidden } from "react-aria";
import { useRadioGroupState } from "react-stately";
import HStack from "../Layout/HStack";
import VStack from "../Layout/VStack";

const RadioContext = React.createContext<any>(null);

const useRadioContext = () => {
  const context = React.useContext(RadioContext);

  if (!context) throw new Error("Radio must be used within an Radio.RadioGroup");

  return context;
};

const radio = tv({
  slots: {
    base: "group flex w-fit cursor-pointer items-center gap-2 text-content-primary dark:text-dark-200",
    input:
      "outline-focused-group flex items-center justify-center border border-default-200 bg-white transition-all duration-300 hover:shadow-[#a1a1a1] group-hover:shadow-md dark:border-dark-500 dark:bg-black/20",
    check: "rounded-full transition-all duration-300",
  },
  variants: {
    variant: {
      outline: "",
      solid: "",
    },
    isRounded: {
      true: { input: "rounded-full" },
      false: { input: "rounded-sm" },
    },
    isDisabled: {
      true: {
        input: "opacity-80",
      },
      false: "",
    },
    size: {
      xs: {
        input: "h-3 w-3",
        base: "text-2xs",
        check: "h-[4px] w-[4px]",
      },
      sm: {
        input: "h-3 w-3",
        base: "text-xs",
        check: "h-[4px] w-[4px]",
      },
      md: {
        input: "h-4 w-4",
        base: "text-sm",
        check: "h-[6px] w-[6px]",
      },
      lg: {
        input: "h-5 w-5",
        base: "text-base",
        check: "h-[8px] w-[8px]",
      },
      xl: {
        input: "h-6 w-6",
        base: "text-lg",
        check: "h-[10px] w-[10px]",
      },
    },
    color: {
      default: { check: "bg-default-content dark:bg-dark-100" },
      primary: { check: "border-primary bg-primary dark:border-primary-300 dark:bg-primary-300" },
      secondary: { check: "bg-secondary dark:bg-secondary-500" },
      info: { check: "bg-info-600 dark:bg-info-400" },
      success: { check: "bg-success-500 dark:bg-success-400" },
      warning: { check: "bg-warning-500 dark:bg-warning-400" },
      error: { check: "bg-error-500 dark:bg-error-400" },
    },
    isSelected: {
      true: { check: "" },
      false: { check: "h-0 w-0" },
    },
  },
  compoundSlots: [
    {
      slots: ["input"],
      color: "default",
      variant: "outline",
      isSelected: true,
      class: "border-default-content dark:border-dark-100",
    },
    {
      slots: ["input"],
      color: "primary",
      variant: "outline",
      isSelected: true,
      class: "border-primary dark:border-primary-400",
    },
    {
      slots: ["input"],
      color: "secondary",
      variant: "outline",
      isSelected: true,
      class: "border-secondary dark:border-secondary-500",
    },
    {
      slots: ["input"],
      color: "info",
      variant: "outline",
      isSelected: true,
      class: "border-info-600 dark:border-info-400",
    },
    {
      slots: ["input"],
      color: "success",
      variant: "outline",
      isSelected: true,
      class: "border-success-500 dark:border-success-400",
    },
    {
      slots: ["input"],
      color: "warning",
      variant: "outline",
      isSelected: true,
      class: "border-warning-500 dark:border-warning-400",
    },
    {
      slots: ["input"],
      color: "error",
      variant: "outline",
      isSelected: true,
      class: "border-error-500 dark:border-error-400",
    },

    {
      slots: ["input"],
      color: "default",
      variant: "solid",
      class: "bg-default-content",
    },
    {
      slots: ["input"],
      color: "primary",
      variant: "solid",
      class: "bg-primary dark:bg-primary-300",
    },
    {
      slots: ["input"],
      color: "secondary",
      variant: "solid",
      class: "bg-secondary dark:bg-primary-400",
    },
    {
      slots: ["input"],
      color: "info",
      variant: "solid",
      class: "bg-info-600 dark:bg-info-300",
    },
    {
      slots: ["input"],
      color: "success",
      variant: "solid",
      class: "bg-success-500 dark:bg-success-300",
    },
    {
      slots: ["input"],
      color: "warning",
      variant: "solid",
      class: "bg-warning-500 dark:bg-warning-300",
    },
    {
      slots: ["input"],
      color: "error",
      variant: "solid",
      class: "bg-error-500 dark:bg-error-300",
    },
    {
      slots: ["check"],
      variant: "solid",
      isSelected: true,
      class: "bg-white dark:bg-dark-700",
    },
  ],
});

const { base, input, check } = radio();

export interface IRadioProps extends AriaRadioProps {
  children?: React.ReactNode;
  variant?: "outline" | "solid";
  isRounded?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  className?: string;
}

/**
 * O componente Radio é um elemento de interface de usuário que permite aos usuários selecionar uma opção única de um conjunto de opções disponíveis. Ele é frequentemente usado em formulários e em situações onde os usuários precisam escolher uma única opção de um conjunto de opções mutuamente exclusivas.
 *
 * ```tsx
 *<Radio.RadioGroup>
 *  <Radio value="1">
 *    Opção 1
 *  </Radio>
 *  <Radio value="2">
 *    Opção 2
 *  </Radio>
 *</Radio.RadioGroup>
 * ```
 */
const Radio = ({
  children,
  variant = "outline",
  isRounded = true,
  size = "md",
  color = "primary",
  className,
  ...props
}: IRadioProps) => {
  const context = useRadioContext();
  let ref = React.useRef(null);
  let { inputProps, isSelected, isDisabled } = useRadio(
    { ...props, "aria-label": props["aria-label"] || "opção" },
    context,
    ref,
  );
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label
      className={base({ class: className, isDisabled, size })}
      style={{
        display: "flex",
        alignItems: "center",
        opacity: isDisabled ? 0.4 : 1,
      }}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div aria-hidden="true" className={input({ color, isSelected, isDisabled, isRounded, variant, size })}>
        <div className={check({ isSelected, color, size, isDisabled, variant })}></div>
      </div>
      {children}
    </label>
  );
};

const radiogroup = tv({
  slots: {
    base: "",
    label: "",
    input: "ml-2",
    description: "mt-1 text-default-400 dark:text-dark-400",
    errorMessage: "text-error",
  },
  variants: {
    orientation: {
      horizontal: { input: "gap-4" },
      vertical: { input: "gap-1" },
    },
    size: {
      xs: {
        label: "text-2xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
      },
      sm: {
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
      },
      md: {
        label: "text-sm",
        description: "text-xs",
        errorMessage: "text-xs",
      },
      lg: {
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
      },
      xl: {
        label: "text-lg",
        description: "text-sm",
        errorMessage: "text-sm",
      },
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
  },
});

const { base: b, label: l, input: i, description: d, errorMessage: em } = radiogroup();

export interface IRadioGroupProps extends AriaRadioGroupProps {
  children?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
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
  classNames?: { description?: string; label?: string; errorMessage?: string; input?: string };
  errorMessage?: string;
}

const RadioGroup = ({
  children,
  label,
  description,
  errorMessage,
  orientation = "vertical",
  size = "md",
  labelColor = "contentPrimary",
  className,
  classNames,
  ...props
}: IRadioGroupProps) => {
  let state = useRadioGroupState(props);
  let { radioGroupProps, labelProps, descriptionProps, errorMessageProps } = useRadioGroup(
    { ...props, "aria-label": String(label) || props["aria-label"] || "radio group" },
    state,
  );

  return (
    <RadioContext.Provider value={state}>
      <div {...radioGroupProps} className={b({ class: className })}>
        {label && (
          <span {...labelProps} className={l({ class: classNames?.label, size, labelColor })}>
            {label}
          </span>
        )}
        {orientation == "horizontal" ? (
          <HStack className={i({ size, orientation, class: classNames?.input })}>{children}</HStack>
        ) : (
          <VStack className={i({ size, orientation, class: classNames?.input })}>{children}</VStack>
        )}
        {description && (
          <div {...descriptionProps} className={d({ class: classNames?.description, size })}>
            {description}
          </div>
        )}
        {errorMessage && state.isInvalid && (
          <div {...errorMessageProps} className={em({ class: classNames?.errorMessage, size })}>
            {errorMessage}
          </div>
        )}
      </div>
    </RadioContext.Provider>
  );
};

Radio.RadioGroup = RadioGroup;

export default Radio;
