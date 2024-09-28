import React from "react";
import { tv } from "tailwind-variants";

const spinner = tv({
  base: "animate-spin rounded-full",
  variants: {
    isActive: {
      true: "flex",
      false: "hidden",
    },
    variant: {
      solid: "border-white/0",
      outline: "",
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
    duration: { slow: "animate-duration-1000", medium: "animate-duration-700", fast: "animate-duration-500" },
    size: {
      "2xs": "h-3 w-3 border-2",
      xs: "h-4 w-4 border-2",
      sm: "h-5 w-5 border-2",
      md: "h-6 w-6 border-2",
      lg: "h-8 w-8 border-[3px]",
      xl: "h-12 w-12 border-[3px]",
      "2xl": "h-14 w-14 border-4",
    },
  },
  compoundVariants: [
    {
      variant: "solid",
      color: "default",
      class:
        "border-b-default-800 border-r-default-800 border-t-default-800 dark:border-b-dark-300 dark:border-r-dark-300 dark:border-t-dark-300",
    },
    {
      variant: "solid",
      color: "primary",
      class:
        "border-b-primary border-r-primary border-t-primary dark:border-b-primary-400 dark:border-r-primary-400 dark:border-t-primary-400",
    },
    {
      variant: "solid",
      color: "secondary",
      class:
        "border-b-secondary border-r-secondary border-t-secondary dark:border-b-secondary-500 dark:border-r-secondary-500 dark:border-t-secondary-500",
    },
    {
      variant: "solid",
      color: "info",
      class:
        "border-b-info-700 border-r-info-700 border-t-info-700 dark:border-b-info-500 dark:border-r-info-500 dark:border-t-info-500",
    },
    {
      variant: "solid",
      color: "success",
      class:
        "border-b-success-600 border-r-success-600 border-t-success-600 dark:border-b-success-400 dark:border-r-success-400 dark:border-t-success-400",
    },
    {
      variant: "solid",
      color: "warning",
      class:
        "border-b-warning-600 border-r-warning-600 border-t-warning-600 dark:border-b-warning-400 dark:border-r-warning-400 dark:border-t-warning-400",
    },
    {
      variant: "solid",
      color: "error",
      class:
        "border-b-error-600 border-r-error-600 border-t-error-600 dark:border-b-error-400 dark:border-r-error-400 dark:border-t-error-400",
    },
    {
      variant: "outline",
      color: "default",
      class: "border-default-100 border-t-default-800 dark:border-dark-600 dark:border-t-dark-200",
    },
    {
      variant: "outline",
      color: "primary",
      class: "border-primary-100 border-t-primary dark:border-dark-500 dark:border-t-primary-400",
    },
    {
      variant: "outline",
      color: "secondary",
      class: "border-secondary-100 border-t-secondary dark:border-dark-600 dark:border-t-secondary-500",
    },
    {
      variant: "outline",
      color: "info",
      class: "border-info-100 border-t-info-700 dark:border-dark-600 dark:border-t-info-500",
    },
    {
      variant: "outline",
      color: "success",
      class: "border-success-100 border-t-success-600 dark:border-dark-600 dark:border-t-success-400",
    },
    {
      variant: "outline",
      color: "warning",
      class: "border-warning-100 border-t-warning-600 dark:border-dark-600 dark:border-t-warning-400",
    },
    {
      variant: "outline",
      color: "error",
      class: "border-error-100 border-t-error-600 dark:border-dark-600 dark:border-t-error-400",
    },
  ],
});

export interface ISpinnerProps extends React.ComponentProps<"div"> {
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  duration?: "slow" | "medium" | "fast";
  variant?: "outline" | "solid";
  isActive?: boolean;
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  className?: string;
}

/**
 * O componente Spinner é uma representação visual de um indicador de carregamento ou atividade em uma aplicação React. Ele é utilizado para informar aos usuários que um processo está em andamento, como o carregamento de dados, processamento de uma operação assíncrona ou qualquer outra atividade que leve algum tempo para ser concluída. O Spinner é projetado para ser simples, responsivo e fornecer uma indicação visual clara de que algo está acontecendo nos bastidores.
 */
const Spinner = ({
  children,
  isActive = true,
  variant = "outline",
  color = "primary",
  className,
  size = "md",
  duration = "medium",
  ...props
}: ISpinnerProps) => {
  return (
    <div {...props} className={spinner({ class: className, variant, color, isActive, duration, size })}>
      {children}
    </div>
  );
};

export default Spinner;
