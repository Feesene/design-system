import React from "react";
import { tv } from "tailwind-variants";

const text = tv({
  variants: {
    size: {
      xs: "text-2xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
      "2xl": "text-xl",
    },
    weight: {
      thin: "font-thin",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
      black: "font-black",
    },
    color: {
      empty: "",
      contentPrimary: "text-content-primary dark:text-dark-100",
      contentSecondary: "text-content-secondary dark:text-dark-200",
      contentTernary: "text-content-ternary dark:text-dark-300",
      default: "text-default-content dark:text-default-50",
      primary: "text-primary dark:text-primary-300",
      secondary: "text-secondary dark:text-secondary-500",
      info: "text-info-400",
      success: "text-success dark:text-success-400",
      warning: "text-warning-300 dark:text-warning-300",
      error: "text-error dark:text-error",
    },
  },
});

export interface ITextProps extends React.ComponentProps<"p"> {
  children?: string | string[] | React.ReactNode;
  as?: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  weight?: "thin" | "light" | "normal" | "medium" | "bold" | "black";
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
    | "error"
    | "empty";
  className?: string;
}

/**
 * O componente Texto é uma unidade fundamental em uma aplicação React, projetado para renderizar e exibir conteúdo textual na interface do usuário.
 */
const Text = ({
  size = "md",
  weight = "normal",
  color = "contentPrimary",
  children,
  className,
  as: As = "p",
  ...props
}: ITextProps) => {
  return (
    <As {...props} className={text({ size, weight, color, class: className })}>
      {children}
    </As>
  );
};

export default Text;
