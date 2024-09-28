"use client";

import React from "react";
import { useLink, AriaLinkOptions, useFocusRing } from "react-aria";
import { tv } from "tailwind-variants";

const link = tv({
  base: "border-sm cursor-pointer rounded-sm outline-0 outline-black transition-all hover:opacity-80 dark:outline-white",
  variants: {
    size: {
      xs: "text-2xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
    isFocus: {
      true: "outline-focused",
    },
    color: {
      contentPrimary: "text-content-primary dark:text-dark-100",
      contentSecondary: "text-content-secondary dark:text-dark-200",
      contentTernary: "text-content-ternary dark:text-dark-300",
      default: "text-default-content dark:text-dark-100",
      primary: "text-primary dark:text-primary-300",
      secondary: "text-secondary dark:text-secondary-500",
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      error: "text-error dark:text-error-300",
    },
  },
});

export interface ILinkProps extends AriaLinkOptions {
  as?: any;
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
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
  className?: string;
}

/**
 * O componente Link representa um hiperlink para navegação dentro do aplicativo.
 */
const Link = ({ as, children, size = "md", color = "contentPrimary", href, className, ...props }: ILinkProps) => {
  const ref = React.useRef(null);
  const { linkProps } = useLink(props, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  if (as) {
    const A = as;
    return (
      <A
        {...linkProps}
        tabIndex={0}
        {...focusProps}
        ref={ref}
        to={href}
        href={href}
        className={link({
          size,
          color,
          isFocus: isFocusVisible,
          class: className,
        })}
      >
        {children}
      </A>
    );
  }

  return (
    <a
      {...linkProps}
      tabIndex={0}
      {...focusProps}
      ref={ref}
      href={href}
      className={link({
        size,
        color,
        isFocus: isFocusVisible,
        class: className,
      })}
    >
      {children}
    </a>
  );
};

export default Link;
