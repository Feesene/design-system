"use client";

import React from "react";
import { useSeparator, SeparatorProps } from "react-aria";
import { tv } from "tailwind-variants";

const divider = tv({
  base: "",
  variants: {
    orientation: {
      vertical: "mx-2 my-0 h-full",
      horizontal: "mx-0 my-2 w-full",
    },
    color: {
      contentPrimary: "bg-content-primary dark:bg-dark-200",
      contentSecondary: "bg-content-secondary dark:bg-dark-300",
      contentTernary: "bg-content-ternary dark:bg-dark-400",
      default: "bg-default-content dark:bg-dark-100",
      primary: "bg-primary dark:bg-primary-400",
      secondary: "bg-secondary dark:bg-secondary-500",
      info: "bg-info-600 dark:bg-info-500",
      success: "dark:bg-succes-400 bg-success-500",
      warning: "bg-warning-500 dark:bg-warning-400",
      error: "bg-error-500 dark:bg-error-400",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      class: "h-[1px]",
    },
    {
      orientation: "horizontal",
      size: "md",
      class: "h-[2px]",
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: "h-[3px]",
    },
    {
      orientation: "horizontal",
      size: "xl",
      class: "h-[4px]",
    },
    {
      orientation: "vertical",
      size: "sm",
      class: "w-[1px]",
    },
    {
      orientation: "vertical",
      size: "md",
      class: "w-[2px]",
    },
    {
      orientation: "vertical",
      size: "lg",
      class: "w-[3px]",
    },
    {
      orientation: "vertical",
      size: "xl",
      class: "w-[4px]",
    },
  ],
});

export interface IDividerProps extends SeparatorProps {
  color?:
    | "contentPrimary"
    | "contentSecondary"
    | "contentTernary"
    | "default"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * O componente Divider é uma representação visual que cria uma linha divisória entre diferentes seções ou elementos em uma interface de usuário React.
 */
const Divider = ({
  orientation = "horizontal",
  color = "contentTernary",
  size = "sm",
  className,
  ...props
}: IDividerProps) => {
  const { separatorProps } = useSeparator(props);

  return <div {...separatorProps} className={divider({ color, orientation: orientation, size, class: className })} />;
};

export default Divider;
