"use client";

import React from "react";
import { useButton, AriaButtonProps } from "react-aria";
import { tv } from "tailwind-variants";

const badge = tv({
  base: "w-fit cursor-default rounded px-4 py-1 font-medium outline-none transition-all duration-300",
  variants: {
    variant: {
      solid: "",
      outline: "border",
      light: "",
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
      xs: "h-4 py-0 text-2xs",
      sm: "h-6 text-xs",
      md: "h-8 text-sm",
      lg: "h-10 text-base",
      xl: "h-12 text-lg",
    },
    isBlock: {
      true: "w-full",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "default",
      class: "bg-default-200 text-default-content",
    },
    {
      variant: "solid",
      color: "primary",
      class: "bg-primary text-primary-content",
    },
    {
      variant: "solid",
      color: "secondary",
      class: "bg-secondary text-secondary-content",
    },
    {
      variant: "solid",
      color: "info",
      class: "bg-info-600 text-info-content",
    },
    {
      variant: "solid",
      color: "success",
      class: "bg-success-500 text-success-content",
    },
    {
      variant: "solid",
      color: "warning",
      class: "bg-warning-500 text-warning-content",
    },
    {
      variant: "solid",
      color: "error",
      class: "bg-error-500 text-error-content",
    },
    {
      variant: "outline",
      color: "default",
      class: "border-default-200 text-default-content dark:text-white",
    },
    {
      variant: "outline",
      color: "primary",
      class: "border-primary text-primary",
    },
    {
      variant: "outline",
      color: "secondary",
      class: "border-secondary text-secondary",
    },
    {
      variant: "outline",
      color: "info",
      class: "border-info-600 text-info-600",
    },
    {
      variant: "outline",
      color: "success",
      class: "border-success-500 text-success-500",
    },
    {
      variant: "outline",
      color: "warning",
      class: "border-warning-500 text-warning-500",
    },
    {
      variant: "outline",
      color: "error",
      class: "border-error-500 text-error-500",
    },
    {
      variant: "light",
      color: "default",
      class: "bg-default-200 text-default-900 dark:bg-default-400/30 dark:text-default-200",
    },
    {
      variant: "light",
      color: "primary",
      class: "bg-primary-100 text-primary-800 dark:bg-primary-400/30 dark:text-primary-200",
    },
    {
      variant: "light",
      color: "secondary",
      class: "bg-secondary-100 text-secondary-800 dark:bg-secondary-500/30 dark:text-secondary-200",
    },
    {
      variant: "light",
      color: "info",
      class: "bg-info-100 text-info-700 dark:bg-info-400/30 dark:text-info-200",
    },
    {
      variant: "light",
      color: "success",
      class: "bg-success-100 text-success-800 dark:bg-success-400/30 dark:text-success-200",
    },
    {
      variant: "light",
      color: "warning",
      class: "bg-warning-100 text-warning-800 dark:bg-warning-400/30 dark:text-warning-200",
    },
    {
      variant: "light",
      color: "error",
      class: "bg-error-100 text-error-800 dark:bg-error-400/30 dark:text-error-200",
    },
  ],
});

export interface IBadgeProps extends AriaButtonProps {
  variant?: "solid" | "outline" | "light";
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isBlock?: boolean;
  className?: string;
}

/**
 * O componente Badge é uma pequena marca visual em uma aplicação React que é frequentemente usada para indicar status, categorias, ou para chamar a atenção para um elemento específico.
 */
const Badge = ({
  children,
  variant = "light",
  color = "default",
  size = "md",
  isBlock = false,
  className,
  ...props
}: IBadgeProps) => {
  const ref = React.useRef(null);
  const { buttonProps } = useButton({ elementType: "span", ...props }, ref);

  return (
    <span
      {...buttonProps}
      ref={ref}
      tabIndex={-1}
      className={badge({ color, variant, size, isBlock, class: className })}
    >
      {children}
    </span>
  );
};

export default Badge;
