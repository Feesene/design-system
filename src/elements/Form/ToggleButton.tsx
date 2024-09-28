"use client";

import React, { useImperativeHandle } from "react";
import { useToggleButton, AriaToggleButtonProps, useFocusRing, mergeProps } from "react-aria";
import { tv } from "tailwind-variants";
import Spinner, { ISpinnerProps } from "../../components/Media/Spinner";
import Icon, { IIconProps, IconNames } from "../Media/Icon";
import { useToggleState } from "react-stately";

const toggleButton = tv({
  slots: {
    base: "group relative flex w-fit select-none items-center justify-center gap-2 rounded px-5 py-2 outline-[0] transition-all duration-300",
    leftIcon: "",
    rightIcon: "",
  },

  variants: {
    variant: {
      solid: { base: "active:shadow-none" },
      outline: { base: "border" },
    },
    color: {
      default: "",
      primary: "",
      secondary: "",
      info: "",
      success: "",
      warning: "",
      error: "",
    },
    size: {
      xs: { base: "h-6 py-1 text-2xs" },
      sm: { base: "h-8 text-xs" },
      md: { base: "h-10 text-sm" },
      lg: { base: "h-12 text-base" },
      xl: { base: "h-14 text-lg" },
    },
    isFocusVisible: {
      true: {
        base: "outline-focused",
      },
      false: {
        base: "outline-[0] outline-default-950 dark:outline-white",
      },
    },
    isFocused: {
      true: {
        base: "outline-[0]",
      },
    },
    isRaised: {
      true: "",
    },
    isDisabled: {
      true: { base: "cursor-default shadow-none" },
    },
    isBlock: {
      true: { base: "w-full", leftIcon: "absolute left-4", rightIcon: "absolute right-4" },
    },
    isSelected: {
      true: {},
    },

    isPressed: {
      true: { base: "!outline-offset-0 !outline-default-900 transition-none dark:!outline-default-100" },
    },
  },
  compoundSlots: [
    {
      slots: ["base"],
      variant: "solid",
      color: "default",
      isSelected: false,
      class: "bg-default-100 text-default-content dark:bg-dark-600 dark:text-dark-100",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "default",
      isSelected: true,
      class: "bg-default-400 text-white dark:bg-dark-300 dark:text-dark-100",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "primary",
      isSelected: false,
      class: "bg-primary text-primary-content dark:bg-primary",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "primary",
      isSelected: true,
      class: "bg-primary-600 text-primary-content dark:bg-primary-600",
    },

    {
      slots: ["base"],
      variant: "solid",
      isSelected: false,
      color: "secondary",
      class: "bg-secondary-700 text-secondary-content dark:bg-secondary-600",
    },
    {
      slots: ["base"],
      variant: "solid",
      isSelected: true,
      color: "secondary",
      class: "bg-secondary-900 text-secondary-content dark:bg-secondary-800",
    },
    {
      slots: ["base"],
      variant: "solid",
      isSelected: false,
      color: "info",
      class: "bg-info-300 text-info-content dark:bg-info-300",
    },
    {
      slots: ["base"],
      variant: "solid",
      isSelected: true,
      color: "info",
      class: "bg-info-600 text-info-content dark:bg-info-600",
    },

    {
      slots: ["base"],
      variant: "solid",
      isSelected: false,
      color: "success",
      class: "bg-success-400 text-success-content dark:bg-success-400",
    },
    {
      slots: ["base"],
      variant: "solid",
      isSelected: true,
      color: "success",
      class: "bg-success-600 text-success-content dark:bg-success-600",
    },

    {
      slots: ["base"],
      variant: "solid",
      isSelected: false,
      color: "warning",
      class: "bg-warning-400 text-warning-content dark:bg-warning-400",
    },
    {
      slots: ["base"],
      variant: "solid",
      isSelected: true,
      color: "warning",
      class: "bg-warning-600 text-warning-content dark:bg-warning-600",
    },

    {
      slots: ["base"],
      variant: "solid",
      isSelected: false,
      color: "error",
      class: "bg-error-400 dark:bg-error-400 text-error-content",
    },

    {
      slots: ["base"],
      variant: "solid",
      isSelected: true,
      color: "error",
      class: "bg-error-600 dark:bg-error-600 text-error-content",
    },

    {
      slots: ["base"],
      variant: "solid",
      color: "default",
      isRaised: true,
      isSelected: false,
      class: "shadow-raise-default dark:shadow-dark-800",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "primary",
      isRaised: true,
      isSelected: false,
      class: "shadow-raise-primary",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "secondary",
      isRaised: true,
      isSelected: false,
      class: "shadow-raise-secondary",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "info",
      isRaised: true,
      isSelected: false,
      class: "shadow-raise-info",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "success",
      isRaised: true,
      isSelected: false,
      class: "shadow-raise-success",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "warning",
      isRaised: true,
      isSelected: false,
      class: "shadow-raise-warning",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "error",
      isRaised: true,
      isSelected: false,
      class: "shadow-raise-error",
    },
    {
      slots: ["base"],
      variant: "outline",
      isSelected: false,
      color: "default",
      class: "border-default-200 text-default-content dark:border-dark-400 dark:text-dark-200",
    },
    {
      slots: ["base"],
      variant: "outline",
      isSelected: true,
      color: "default",
      class:
        "border-default-200 bg-default-300 text-default-content dark:border-dark-400 dark:bg-dark-600 dark:text-dark-200",
    },

    {
      slots: ["base"],
      variant: "outline",
      isSelected: false,
      color: "primary",
      class: "border-primary text-primary dark:border-primary-300 dark:text-primary-300",
    },
    {
      slots: ["base"],
      variant: "outline",
      isSelected: true,
      color: "primary",
      class:
        "border-primary bg-primary-500 text-primary-content dark:border-primary-300 dark:bg-primary-400 dark:text-primary-300 dark:text-primary-content",
    },
    {
      slots: ["base"],
      variant: "outline",
      isSelected: false,
      color: "secondary",
      class: "border-secondary text-secondary dark:border-secondary-600 dark:text-secondary-400",
    },

    {
      slots: ["base"],
      variant: "outline",
      isSelected: true,
      color: "secondary",
      class:
        "border-secondary bg-secondary-950 text-secondary-content dark:border-secondary-600 dark:bg-secondary-700 dark:text-secondary-400 dark:text-white",
    },
    {
      slots: ["base"],
      variant: "outline",
      isSelected: false,
      color: "info",
      class: "border-info-600 text-info-600",
    },
    {
      slots: ["base"],
      variant: "outline",
      isSelected: true,
      color: "info",
      class: "border-info-600 bg-info-700 text-info-content",
    },
    {
      slots: ["base"],
      variant: "outline",
      isSelected: false,
      color: "success",
      class: "border-success-500 text-success-500 ",
    },
    {
      slots: ["base"],
      variant: "outline",
      isSelected: true,
      color: "success",
      class: "border-success-500 bg-success-600 text-success-content",
    },
    {
      slots: ["base"],
      variant: "outline",
      isSelected: false,
      color: "warning",
      class: "border-warning-500 text-warning-500",
    },
    {
      slots: ["base"],
      variant: "outline",
      isSelected: true,
      color: "warning",
      class: "border-warning-500 bg-warning-600 text-warning-content",
    },
    {
      slots: ["base"],
      variant: "outline",
      isSelected: false,
      color: "error",
      class: "border-error-500 text-error-500 dark:border-error-400 dark:text-error-400",
    },
    {
      slots: ["base"],
      variant: "outline",
      isSelected: true,
      color: "error",
      class:
        "border-error-500 bg-error-600 text-error-content dark:border-error-400 dark:bg-error-500 dark:text-error-400 dark:text-error-content",
    },
    // ISDISABLED
    {
      slots: ["base"],
      isDisabled: true,
      class: "opacity-60 shadow-none",
    },
  ],
});

const { base, leftIcon: li, rightIcon: ri } = toggleButton();

export interface IToggleButtonProps extends AriaToggleButtonProps {
  variant?: "solid" | "outline";
  leftIcon?: IconNames;
  rightIcon?: IconNames;
  iconProps?: IIconProps;
  spinnerProps?: ISpinnerProps;
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isRaised?: boolean;
  isBlock?: boolean;
  useButton?: boolean;
  className?: string;
  classNames?: {
    icon?: string;
  };
  isLoading?: boolean;
}

/**
 * O componente ToggleButton é um componente com um estado de ativo e inativo
 */
const ToggleButton = React.forwardRef<HTMLButtonElement, IToggleButtonProps>(
  (
    {
      children,
      leftIcon,
      rightIcon,
      iconProps,
      variant = "solid",
      classNames,
      spinnerProps,
      color = "default",
      size = "md",
      isRaised = false,
      isLoading = false,
      isBlock = false,
      className,
      useButton: u = true,
      ...props
    }: IToggleButtonProps,
    refB,
  ) => {
    const ref = React.useRef<HTMLButtonElement | null>(null);
    let state = useToggleState(props);

    const { buttonProps, isPressed } = u
      ? useToggleButton(props, state, ref)
      : { buttonProps: { ...props, disabled: props.isDisabled }, isPressed: false };

    const { isFocusVisible, isFocused, focusProps } = useFocusRing();

    useImperativeHandle(refB, () => ref.current as HTMLButtonElement);

    return (
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={base({
          variant,
          isFocusVisible,
          isFocused,
          isPressed,
          color,
          size,
          isRaised,
          isDisabled: !!buttonProps.disabled,
          isBlock,
          isSelected: state.isSelected,
          class: className,
        })}
      >
        {leftIcon ? (
          <Icon
            name={leftIcon}
            size={size}
            className={li({
              size,
              isBlock,
              variant,
              color,
              isDisabled: !!buttonProps.disabled,
              class: classNames?.icon,
            })}
            {...iconProps}
          />
        ) : null}
        {isLoading ? (
          <Spinner
            size={size == "xs" ? "xs" : size == "sm" || size == "md" ? "sm" : "md"}
            color={color}
            className={"dark:border-white dark:border-t-dark-300"}
            {...spinnerProps}
          />
        ) : (
          children
        )}
        {rightIcon ? (
          <Icon
            name={rightIcon}
            size={size}
            className={ri({
              size,
              isBlock,
              variant,
              color,
              isDisabled: !!buttonProps.disabled,
              class: classNames?.icon,
            })}
            {...iconProps}
          />
        ) : null}
      </button>
    );
  },
);

export default ToggleButton;
