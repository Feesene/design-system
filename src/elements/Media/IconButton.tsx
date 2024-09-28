"use client";

import React, { useImperativeHandle } from "react";
import { useButton, AriaButtonProps, useFocusRing, mergeProps } from "react-aria";
import { tv } from "tailwind-variants";
import Icon, { IconNames } from "../Media/Icon";

const iconbutton = tv({
  slots: {
    base: "group flex w-fit items-center justify-center rounded-md transition-all duration-300 ",
    icon: "",
  },
  variants: {
    variant: {
      light: {},
      ghost: { base: "" },
    },
    circle: {
      true: { base: "rounded-full" },
    },
    isFocusVisible: {
      true: {
        base: "outline-focused",
      },
      false: {
        base: "outline-[0]",
      },
    },
    isFocused: {
      true: {
        base: "outline-none",
      },
    },
    color: {
      default: "",
      none: "",
      primary: "",
      secondary: "",
      info: "",
      success: "",
      warning: "",
      error: "",
    },
    size: {
      xs: { base: "h-4 min-w-[1rem] py-1 text-2xs" },
      sm: { base: "h-5 min-w-[1.25rem] text-xs" },
      md: { base: "h-6 min-w-[1.5rem] text-sm" },
      lg: { base: "h-7 min-w-[1.75rem] text-base" },
      xl: { base: "h-8 min-w-[2rem] text-lg" },
    },
    isRaised: {
      false: {
        base: "shadow-none",
      },
      true: {
        base: "",
      },
    },
    isDisabled: {
      true: { base: "cursor-default shadow-none" },
    },
    label: {
      true: {
        base: "w-auto pl-2 pr-4",
        icon: "mx-2",
      },
    },
    isPressed: {
      true: { base: "!outline-offset-0 !outline-default-900 transition-none dark:!outline-default-100" },
    },
  },
  compoundSlots: [
    // GHOST
    {
      class:
        "focus-within:bg-white hover:bg-white  hover:shadow-md dark:focus-within:bg-dark-900 dark:hover:bg-dark-900",
      slots: ["base"],
      variant: "ghost",
      isRaised: true,
      isDisabled: false,
    },

    {
      class: "text-default-700 focus-within:text-default-900 hover:text-default-900 active:text-default-700",
      slots: ["base"],
      color: "default",
      variant: "ghost",
      isDisabled: false,
    },
    { class: "text-default-500", slots: ["base"], color: "default", variant: "ghost", isDisabled: true },

    {
      class: "text-primary focus-within:text-primary-500 hover:text-primary-500 active:text-primary",
      slots: ["base"],
      color: "primary",
      variant: "ghost",
      isDisabled: false,
    },
    { class: "text-primary-200", slots: ["base"], color: "primary", variant: "ghost", isDisabled: true },

    {
      class: "text-secondary focus-within:text-secondary-950 hover:text-secondary-950 active:text-secondary",
      slots: ["base"],
      color: "secondary",
      variant: "ghost",
      isDisabled: false,
    },
    { class: "text-secondary-400", slots: ["base"], color: "secondary", variant: "ghost", isDisabled: true },

    {
      class: "text-success-500 focus-within:text-success-600 hover:text-success-600 active:text-success-500",
      slots: ["base"],
      color: "success",
      variant: "ghost",
      isDisabled: false,
    },
    { class: "text-success-300", slots: ["base"], color: "success", variant: "ghost", isDisabled: true },

    {
      class: "text-info-600 focus-within:text-info-700 hover:text-info-700 active:text-info-600",
      slots: ["base"],
      color: "info",
      variant: "ghost",
      isDisabled: false,
    },
    { class: "text-info-300", slots: ["base"], color: "info", variant: "ghost", isDisabled: true },

    {
      class: "text-warning-500 focus-within:text-warning-600 hover:text-warning-600 active:text-warning-500",
      slots: ["base"],
      color: "warning",
      variant: "ghost",
      isDisabled: false,
    },
    { class: "text-warning-300", slots: ["base"], color: "warning", variant: "ghost", isDisabled: true },

    {
      class: "text-error-500 focus-within:text-error-600 hover:text-error-600 active:text-error-500",
      slots: ["base"],
      color: "error",
      variant: "ghost",
      isDisabled: false,
    },
    { class: "text-error-300", slots: ["base"], color: "error", variant: "ghost", isDisabled: true },

    // LIGHT
    { class: "hover:shadow-md", slots: ["base"], variant: "light", isRaised: true, isDisabled: false },

    {
      class: "bg-primary-50 text-primary dark:bg-primary-400/30 dark:text-primary-200",
      slots: ["base"],
      color: "primary",
      variant: "light",
      isDisabled: false,
    },
    {
      class: "bg-primary-50 text-primary-200 dark:bg-primary-400/10 dark:text-primary-200/20",
      slots: ["base"],
      color: "primary",
      variant: "light",
      isDisabled: true,
    },

    {
      class: "bg-secondary-300 text-secondary dark:bg-secondary-500/30 dark:text-secondary-200",
      slots: ["base"],
      color: "secondary",
      variant: "light",
      isDisabled: false,
    },
    {
      class: "bg-secondary-200 text-secondary-400 dark:bg-secondary-500/10 dark:text-secondary-200/20",
      slots: ["base"],
      color: "secondary",
      variant: "light",
      isDisabled: true,
    },

    {
      class: "bg-success-50 text-success-500 dark:bg-success-400/30 dark:text-success-200",
      slots: ["base"],
      color: "success",
      variant: "light",
      isDisabled: false,
    },
    {
      class: "bg-success-50 text-success-300 dark:bg-success-400/10 dark:text-success-200/20",
      slots: ["base"],
      color: "success",
      variant: "light",
      isDisabled: true,
    },

    {
      class: "bg-info-50 text-info-600 dark:bg-info-400/30 dark:text-info-200",
      slots: ["base"],
      color: "info",
      variant: "light",
      isDisabled: false,
    },
    {
      class: "bg-info-50 text-info-300 dark:bg-info-400/10 dark:text-info-200/20",
      slots: ["base"],
      color: "info",
      variant: "light",
      isDisabled: true,
    },

    {
      class: "bg-warning-50 text-warning-500 dark:bg-warning-400/30 dark:text-warning-200",
      slots: ["base"],
      color: "warning",
      variant: "light",
      isDisabled: false,
    },
    {
      class: "bg-warning-50 text-warning-300 dark:bg-warning-400/10 dark:text-warning-200/20",
      slots: ["base"],
      color: "warning",
      variant: "light",
      isDisabled: true,
    },

    {
      class: "bg-error-50 text-error-500 dark:bg-error-400/30 dark:text-error-200",
      slots: ["base"],
      color: "error",
      variant: "light",
      isDisabled: false,
    },
    {
      class: "bg-error-50 text-error-300 dark:bg-error-400/10 dark:text-error-200/20",
      slots: ["base"],
      color: "error",
      variant: "light",
      isDisabled: true,
    },

    {
      class: "bg-default-50 text-default-600 dark:bg-default-400/30 dark:text-default-200",
      slots: ["base"],
      color: "default",
      variant: "light",
      isDisabled: false,
    },
    {
      class: "bg-default-50 text-default-300 dark:bg-default-400/10 dark:text-default-200/20",
      slots: ["base"],
      color: "default",
      variant: "light",
      isDisabled: true,
    },
  ],
});

export interface IIconButtonProps extends AriaButtonProps {
  variant?: "light" | "ghost";
  icon: IconNames;
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  circle?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isRaised?: boolean;
  outline?: boolean;
  className?: string;
  classNames?: { icon: string };
  useButton?: Boolean;
}

const { base, icon: i } = iconbutton();

/**
 * Um IconButton é um componente de interface gráfica que combina as funcionalidades de um botão com a capacidade de exibir um ícone. Esse componente é frequentemente utilizado em desenvolvimento de interfaces de usuário para oferecer uma interação intuitiva e visualmente atrativa.
 */
const IconButton = React.forwardRef<HTMLButtonElement, IIconButtonProps>(
  (
    {
      variant = "ghost",
      color = "default",
      size = "md",
      icon,
      circle = false,
      children,
      classNames,
      isRaised = false,
      isDisabled = false,
      outline = true,
      className,
      useButton: u = true,
      ...props
    },
    refB,
  ) => {
    const ref = React.useRef<HTMLButtonElement | null>(null);

    const { buttonProps, isPressed } = u ? useButton(props, ref) : { buttonProps: { ...props }, isPressed: false };

    const { isFocusVisible, isFocused, focusProps } = useFocusRing();

    useImperativeHandle(refB, () => ref.current as HTMLButtonElement);

    return (
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={base({
          variant,
          color,
          circle,
          isFocusVisible: isFocusVisible && outline,
          isFocused,
          label: Boolean(children),
          size,
          isRaised,
          isDisabled,
          isPressed,
          class: className,
        })}
      >
        {icon ? (
          <Icon
            size={size}
            name={icon}
            className={i({ size, color, label: Boolean(children), variant, class: classNames?.icon })}
          />
        ) : null}
        {children}
      </button>
    );
  },
);

export default IconButton;
