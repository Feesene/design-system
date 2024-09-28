"use client";

import React from "react";
import HStack from "../../elements/Layout/HStack";
import { tv } from "tailwind-variants";

export interface IPlaceloadProps extends Omit<React.ComponentProps<"div">, "ref"> {
  children?: React.ReactNode;
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  className?: string;
}

const placeload = tv({
  slots: {
    base: "relative overflow-hidden rounded",
    inner: "animation-placeload absolute h-full w-full blur-xl",
  },

  variants: {
    color: {
      default: { base: "bg-default-100/80 dark:bg-dark-600/80", inner: "bg-default-200 dark:bg-dark-500" },
      primary: { base: "bg-primary-200/80 dark:bg-primary-400/20", inner: "bg-primary-50 dark:bg-primary-200/20" },
      secondary: {
        base: "bg-secondary-400/80 dark:bg-secondary-600/20",
        inner: "bg-secondary-200 dark:bg-secondary-400/20",
      },
      info: { base: "bg-info-300/80 dark:bg-info-500/30", inner: "bg-info-100 dark:bg-info-300/20" },
      success: { base: "bg-success-300/80 dark:bg-success-500/30", inner: "bg-success-100 dark:bg-success-300/20" },
      warning: { base: "bg-warning-300/80 dark:bg-warning-500/30", inner: "bg-warning-100 dark:bg-warning-300/20" },
      error: { base: "bg-error-300/80 dark:bg-error-500/30", inner: "bg-error-100 dark:bg-error-300/20" },
    },
  },
})();

const Placeload = ({ children, className, color = "default", ...props }: IPlaceloadProps) => {
  return (
    <HStack
      justifyContent="center"
      alignItems="center"
      className={placeload.base({ color, class: className })}
      {...props}
    >
      <div className={placeload.inner({ color })} />
      {children}
    </HStack>
  );
};

export default Placeload;
