import React from "react";
import { tv } from "tailwind-variants";
import VStack from "../../elements/Layout/VStack";

const alert = tv({
  base: "border px-6 py-4 dark:text-white",
  variants: {
    rounded: { xs: "rounded-sm", sm: "rounded-md", md: "rounded-lg", lg: "rounded-xl", xl: "rounded-2xl" },
    color: {
      primary: "border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary",
      info: "border-info-500 bg-info-50 text-info-600 dark:bg-info-500",
      success: "border-success-500 bg-success-50 text-success-600 dark:bg-success-400",
      warning: "border-warning-500 bg-warning-50 text-warning-600 dark:bg-warning-400",
      error: "border-error-500 bg-error-50 text-error-600 dark:bg-error-500",
    },
  },
});

export interface IAlertProps extends Omit<React.ComponentProps<"div">, "ref"> {
  rounded?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "primary" | "info" | "success" | "warning" | "error";
  className?: string;
}

/**
 * O componente Alert exibe um alerta simples na tela para notificar o usuário.
 */
const Alert = ({ children, color = "info", className, rounded = "sm", ...props }: IAlertProps) => {
  return (
    <VStack {...props} className={alert({ color, class: className, rounded })}>
      {children}
    </VStack>
  );
};

export default Alert;
