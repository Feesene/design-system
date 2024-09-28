"use client";

import "../../index.css"
import React, { useImperativeHandle } from "react";
import { useButton, AriaButtonProps, useFocusRing, mergeProps } from "react-aria";
import { tv } from "tailwind-variants";
import Spinner, { ISpinnerProps } from "../../components/Media/Spinner";
import Icon, { IIconProps, IconNames } from "../Media/Icon";

const button = tv({
  slots: {
    base: "group relative flex w-fit items-center justify-center gap-2 rounded px-5 py-2 outline-[0] transition-all duration-300",
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
        base: "outline-none",
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
    isPressed: {
      true: { base: "!outline-offset-0 !outline-default-900 transition-none dark:!outline-default-100" },
    },
  },
  compoundSlots: [
    {
      slots: ["base"],
      variant: "solid",
      color: "default",
      isDisabled: false,
      class:
        "bg-default-200 text-default-content hover:bg-default-300 active:bg-default-200 dark:bg-dark-600 dark:text-dark-100 dark:hover:bg-dark-500 dark:active:bg-dark-600",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "primary",
      isDisabled: false,
      class: "bg-primary text-primary-content hover:bg-primary-500 active:bg-primary",
    },
    {
      slots: ["base"],
      variant: "solid",
      isDisabled: false,
      color: "secondary",
      class:
        "bg-secondary text-secondary-content hover:bg-secondary-800 active:bg-secondary dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:active:bg-secondary-600",
    },
    {
      slots: ["base"],
      variant: "solid",
      isDisabled: false,
      color: "info",
      class: "bg-info-600 text-info-content hover:bg-info-700 active:bg-info-600",
    },
    {
      slots: ["base"],
      variant: "solid",
      isDisabled: false,
      color: "success",
      class: "bg-success-500 text-success-content hover:bg-success-600 active:bg-success-500",
    },
    {
      slots: ["base"],
      variant: "solid",
      isDisabled: false,
      color: "warning",
      class: "bg-warning-500 text-warning-content hover:bg-warning-600 active:bg-warning-500",
    },
    {
      slots: ["base"],
      variant: "solid",
      isDisabled: false,
      color: "error",
      class: "bg-error-500 text-error-content hover:bg-error-600 active:bg-error-500",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "default",
      isDisabled: false,
      isRaised: true,
      class: "shadow-raise-default dark:shadow-dark-800",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "primary",
      isDisabled: false,
      isRaised: true,
      class: "shadow-raise-primary",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "secondary",
      isDisabled: false,
      isRaised: true,
      class: "shadow-raise-secondary",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "info",
      isRaised: true,
      isDisabled: false,
      class: "shadow-raise-info",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "success",
      isRaised: true,
      isDisabled: false,
      class: "shadow-raise-success",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "warning",
      isRaised: true,
      isDisabled: false,
      class: "shadow-raise-warning",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "error",
      isRaised: true,
      isDisabled: false,
      class: "shadow-raise-error",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "default",
      class:
        "border-default-200 text-default-content hover:bg-default-300 active:bg-default-200 dark:border-dark-400 dark:text-dark-200 dark:hover:bg-dark-600 dark:active:bg-dark-800",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "primary",
      class:
        "border-primary text-primary hover:bg-primary-500 hover:text-primary-content active:bg-primary dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-400 dark:hover:text-primary-content dark:active:bg-primary-300",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "secondary",
      class:
        "border-secondary text-secondary hover:bg-secondary-800 hover:text-secondary-content active:bg-secondary dark:border-secondary-600 dark:text-secondary-400 dark:hover:bg-secondary-700 dark:hover:text-white dark:active:bg-secondary-600",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "info",
      class: "border-info-600 text-info-600 hover:bg-info-700 hover:text-info-content active:bg-info-600",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "success",
      class:
        "border-success-500 text-success-500 hover:bg-success-600 hover:text-success-content active:bg-success-500",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "warning",
      class:
        "border-warning-500 text-warning-500 hover:bg-warning-600 hover:text-warning-content active:bg-warning-500",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "error",
      class:
        "border-error-500 text-error-500 hover:bg-error-600 hover:text-error-content active:bg-error-500 dark:border-error-400 dark:text-error-400 dark:hover:bg-error-500 dark:hover:text-error-content dark:active:bg-error-400",
    },
    {
      slots: ["base"],
      color: "default",
      variant: "solid",
      isDisabled: true,
      class: "bg-default-200 opacity-60 dark:bg-dark-500 dark:text-dark-200",
    },
    {
      slots: ["base"],
      color: "primary",
      variant: "solid",
      isDisabled: true,
      class: "bg-primary-300 text-white opacity-60",
    },
    {
      slots: ["base"],
      color: "secondary",
      variant: "solid",
      isDisabled: true,
      class: "bg-secondary-400 text-white opacity-60",
    },
    {
      slots: ["base"],
      color: "info",
      variant: "solid",
      isDisabled: true,
      class: "bg-info-400 text-white opacity-60",
    },
    {
      slots: ["base"],
      color: "success",
      variant: "solid",
      isDisabled: true,
      class: "bg-success-400 text-white opacity-60",
    },
    {
      slots: ["base"],
      color: "warning",
      variant: "solid",
      isDisabled: true,
      class: "bg-warning-400 text-white opacity-60",
    },
    {
      slots: ["base"],
      color: "error",
      variant: "solid",
      isDisabled: true,
      class: "bg-error-400 text-white opacity-60",
    },
    {
      slots: ["base"],
      color: "default",
      variant: "outline",
      isDisabled: true,
      class: "opacity-60 dark:border-dark-500 dark:text-dark-200",
    },
    {
      slots: ["base"],
      color: "primary",
      variant: "outline",
      isDisabled: true,
      class: "border-primary text-primary opacity-60 dark:border-primary-300 dark:text-primary-300",
    },
    {
      slots: ["base"],
      color: "secondary",
      variant: "outline",
      isDisabled: true,
      class: "border-secondary text-secondary opacity-60 dark:border-secondary-600 dark:text-secondary-600",
    },
    {
      slots: ["base"],
      color: "info",
      variant: "outline",
      isDisabled: true,
      class: "border-info text-info opacity-60",
    },
    {
      slots: ["base"],
      color: "success",
      variant: "outline",
      isDisabled: true,
      class: "border-success text-success opacity-60",
    },
    {
      slots: ["base"],
      color: "warning",
      variant: "outline",
      isDisabled: true,
      class: "border-warning text-warning opacity-60",
    },
    {
      slots: ["base"],
      color: "error",
      variant: "outline",
      isDisabled: true,
      class: "border-error text-error opacity-60",
    },
  ],
});

const { base, leftIcon: li, rightIcon: ri } = button();

export interface IButtonProps extends AriaButtonProps {
  variant?: "solid" | "outline";
  leftIcon?: IconNames;
  rightIcon?: IconNames;
  iconProps?: IIconProps;
  spinnerProps?: ISpinnerProps;
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isRaised?: boolean;
  isBlock?: boolean;
  className?: string;
  classNames?: {
    icon?: string;
  };
  isLoading?: boolean;
  useButton?: Boolean;
}

/**
 * O componente Botão é uma implementação flexível e reutilizável de um botão interativo para aplicações React. Projetado para fornecer uma interface de usuário intuitiva e responsiva, o Botão é capaz de disparar ações quando clicado, sendo uma parte fundamental da interação do usuário em formulários, navegação e outras funcionalidades.
 */
const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
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
      isRaised = true,
      isLoading = false,
      isBlock = false,
      className,
      useButton: u = true,
      ...props
    },
    refB,
  ) => {
    const ref = React.useRef<HTMLButtonElement | null>(null);

    const { buttonProps, isPressed } = u
      ? useButton(props, ref)
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
          color,
          size,
          isRaised,
          isDisabled: !!buttonProps.disabled,
          isBlock,
          isPressed,
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

export default Button;
