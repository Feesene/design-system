"use client";

import React from "react";
import { tv } from "tailwind-variants";
import { TooltipTrigger as TT, Tooltip as T, TooltipProps, OverlayArrow } from "react-aria-components";

const tooltip = tv({
  slots: {
    span: "react-aria-Tooltip z-[9998] m-2 whitespace-nowrap px-3 py-1",
    arrow: "",
  },
  variants: {
    size: {
      xs: { span: "text-xs" },
      sm: { span: "text-sm" },
      md: { span: "text-md" },
      lg: { span: "text-lg" },
      xl: { span: "text-xl" },
    },
    color: {
      default: {
        arrow: "fill-default-content dark:fill-dark-900",
        span: "bg-default-content text-default-50 dark:bg-dark-900",
      },
      contrast: {
        arrow: "fill-default-content dark:fill-white",
        span: "bg-default-content text-default-50 dark:bg-white dark:text-dark-900",
      },
      light: { arrow: "fill-white", span: "bg-white text-default-content shadow-lg" },
      primary: { arrow: "fill-primary", span: "bg-primary text-default-50" },
      secondary: { arrow: "fill-secondary", span: "bg-secondary text-default-50" },
      info: { arrow: "fill-info-500", span: "bg-info-500 text-default-50" },
      success: { arrow: "fill-success-400", span: "bg-success-400 text-default-50" },
      warning: { arrow: "fill-warning-500", span: "bg-warning-500 text-default-50" },
      error: { arrow: "fill-error-500", span: "bg-error-500 text-default-50" },
    },
    shapes: {
      default: "",
      rounded: { span: "rounded-md" },
      bubble: { span: "rounded-full" },
    },
  },
});

export interface ITooltipProps extends TooltipProps {
  children: React.ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "default" | "light" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "contrast";
  shapes?: "default" | "rounded" | "bubble";
  arrow?: boolean;
  classNames?: {
    arrow?: string;
  };
}

const { span, arrow: a } = tooltip();

/**
 O componente Tooltip é uma interface interativa em uma aplicação React que exibe informações adicionais ou dicas contextuais quando o usuário interage com um elemento específico, geralmente ao passar o mouse sobre ele.

```tsx
<TooltipTrigger delay={500}>
  <Button color="primary">HOVER ME</Button>
  <Tooltip>Tooltip</Tooltip>
</TooltipTrigger>
```
 */
const Tooltip = ({
  children,
  size = "md",
  color = "default",
  shapes = "rounded",
  className,
  classNames,
  arrow = false,
  ...props
}: ITooltipProps) => {
  if (!children) return;

  return (
    <T
      className={span({
        color,
        size,
        shapes,
        class: className,
      })}
      {...props}
    >
      {arrow && (
        <OverlayArrow>
          <svg width={8} height={8} viewBox="0 0 8 8" className={a({ class: classNames?.arrow, color })}>
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
      )}
      {children}
    </T>
  );
};

export const TooltipTrigger = TT;

export default Tooltip;
