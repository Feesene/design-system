"use client";

import React from "react";
import { useButton, AriaButtonProps } from "react-aria";
import { tv } from "tailwind-variants";
import Icon, { IconNames } from "../Media/Icon";

const fab = tv({
  slots: {
    base: "outline-focused group flex w-fit items-center justify-center rounded-full transition-all duration-300",
    icon: "transition-all duration-300",
  },
  variants: {
    variant: {
      solid: { base: "active:shadow-none" },
      outline: { base: "border shadow-md dark:border-dark-500 dark:shadow-dark-800" },
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
      xs: { base: "h-6 min-w-[1.5rem] py-1 text-2xs" },
      sm: { base: "h-8 min-w-[2rem] text-xs" },
      md: { base: "h-10 min-w-[2.5rem] text-sm" },
      lg: { base: "h-12 min-w-[3rem] text-base" },
      xl: { base: "h-14 min-w-[3.5rem] text-lg" },
    },
    isRaised: {
      false: {
        base: "shadow-none",
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
    {
      slots: ["base"],
      variant: "solid",
      isDisabled: false,
      color: "default",
      class:
        "bg-default-400 text-default-content hover:bg-default-300 active:bg-default-600 dark:bg-dark-500 dark:hover:bg-dark-400 dark:active:bg-dark-500",
    },
    {
      slots: ["base"],
      variant: "solid",
      isDisabled: false,
      color: "primary",
      class: "bg-primary text-primary-content hover:bg-primary-500 active:bg-primary",
    },
    {
      slots: ["base"],
      variant: "solid",
      isDisabled: false,
      color: "secondary",
      class: "bg-secondary text-secondary-content hover:bg-secondary-950 active:bg-secondary",
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
      isRaised: true,
      class: "shadow-raise-default",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "primary",
      isRaised: true,
      class: "shadow-raise-primary",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "secondary",
      isRaised: true,
      class: "shadow-raise-secondary",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "info",
      isRaised: true,
      class: "shadow-raise-info",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "success",
      isRaised: true,
      class: "shadow-raise-success",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "warning",
      isRaised: true,
      class: "shadow-raise-warning",
    },
    {
      slots: ["base"],
      variant: "solid",
      color: "error",
      isRaised: true,
      class: "shadow-raise-error",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "default",
      class:
        "text-default-content hover:bg-default-300 active:bg-default-200 dark:border-dark-400 dark:bg-dark-700 dark:hover:bg-dark-600 dark:active:bg-dark-800",
    },
    {
      slots: ["icon"],
      variant: "outline",
      isDisabled: false,
      class: "group-hover:text-white",
    },

    {
      slots: ["icon"],
      variant: "outline",
      isDisabled: false,
      color: "default",
      class: "text-default-800 group-hover:text-white",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "primary",
      class: "text-primary hover:bg-primary-500 hover:text-primary-content active:bg-primary dark:border-dark-400",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "secondary",
      class:
        "text-secondary hover:bg-secondary-950 hover:text-secondary-content active:bg-secondary dark:border-dark-400 dark:hover:bg-secondary-700 dark:active:bg-secondary-600",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "info",
      class:
        "text-info-600 hover:bg-info-700 hover:text-info-content active:bg-info-600 dark:border-dark-400 dark:hover:bg-info-600 dark:active:bg-info-500",
    },
    {
      slots: ["icon"],
      variant: "outline",
      color: "info",
      class: "text-info-600",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "success",
      class:
        "text-success-500 hover:bg-success-600 hover:text-success-content active:bg-success-500 dark:border-dark-400 dark:hover:bg-success-500 dark:active:bg-success-400",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "warning",
      class:
        "text-warning-500 hover:bg-warning-600 hover:text-warning-content active:bg-warning-500 dark:border-dark-400 dark:hover:bg-warning-500 dark:active:bg-warning-400",
    },
    {
      slots: ["base"],
      variant: "outline",
      isDisabled: false,
      color: "error",
      class:
        "text-error-500 hover:bg-error-600 hover:text-error-content active:bg-error-500 dark:border-dark-400 dark:hover:bg-error-500 dark:active:bg-error-400",
    },
    {
      slots: ["base"],
      color: "default",
      variant: "solid",
      isDisabled: true,
      class: "bg-default-200 text-default-200 opacity-80 dark:bg-dark-600 dark:opacity-60",
    },
    {
      slots: ["base", "icon"],
      color: "primary",
      isDisabled: true,
      variant: "solid",
      class: "bg-primary-300 text-default-200",
    },
    {
      slots: ["base", "icon"],
      color: "secondary",
      isDisabled: true,
      variant: "solid",
      class: "bg-secondary-500 text-secondary-300",
    },
    {
      slots: ["base", "icon"],
      color: "info",
      isDisabled: true,
      variant: "solid",
      class: "bg-info-300 text-default-600",
    },
    {
      slots: ["base", "icon"],
      color: "success",
      isDisabled: true,
      variant: "solid",
      class: "bg-success-300 text-default-600",
    },
    {
      slots: ["base", "icon"],
      color: "warning",
      isDisabled: true,
      variant: "solid",
      class: "bg-warning-300 text-default-600",
    },
    {
      slots: ["base", "icon"],
      color: "error",
      isDisabled: true,
      variant: "solid",
      class: "bg-error-300 text-default-600",
    },
    {
      slots: ["base", "icon"],
      variant: "outline",
      isDisabled: true,
      class: "opacity-80",
    },
  ],
});

export interface IFabProps extends AriaButtonProps {
  variant?: "solid" | "outline";
  icon?: IconNames;
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isRaised?: boolean;
  className?: string;
  classNames?: { icon: string };
}

const { base, icon: i } = fab();

/**
 * O componente Fab (Floating Action Button), ou Botão de Ação Flutuante, é um elemento visualmente destacado em uma aplicação React que fornece uma maneira rápida e acessível de executar uma ação principal. O FAB geralmente é posicionado sobre o conteúdo, destacando-se com um design circular ou icônico, e é frequentemente usado para ações proeminentes, como criar um novo item ou iniciar uma funcionalidade crucial.
 */
const Fab = ({
  variant = "solid",
  color = "default",
  size = "md",
  icon = "PiStar",
  children,
  classNames,
  isRaised = false,
  isDisabled = false,
  className,
  ...props
}: IFabProps) => {
  const ref = React.useRef(null);
  const { buttonProps, isPressed } = useButton(props, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={base({
        variant,
        color,
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
          color={variant == "solid" ? "light" : color}
          name={icon}
          className={i({ size, isDisabled, color, label: Boolean(children), variant, class: classNames?.icon })}
        />
      ) : null}
      {children}
    </button>
  );
};

export default Fab;
