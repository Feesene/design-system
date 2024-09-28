import React from "react";
import { IconBaseProps } from "react-icons";
import * as iconsPi from "react-icons/pi";
import * as iconsMd from "react-icons/md";
import { tv } from "tailwind-variants";

const icon = tv({
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-7 w-7",
    },
    color: {
      contentPrimary: "text-content-primary dark:text-dark-100",
      contentSecondary: "text-content-secondary dark:text-dark-200",
      contentTernary: "text-content-ternary dark:text-dark-300",
      default: "text-default-content dark:text-default-50",
      primary: "text-primary dark:text-primary-300",
      secondary: "text-secondary dark:text-secondary-500",
      info: "text-info",
      success: "text-success",
      warning: "text-warning",
      error: "text-error dark:text-error-300",
      light: "text-white",
    },
  },
});

const iconLibraries = {
  pi: iconsPi,
  md: iconsMd,
} as const;

export type IconLibrary = keyof typeof iconLibraries;

export type IconNames = keyof typeof iconsPi | keyof typeof iconsMd;

export interface IIconProps extends IconBaseProps {
  name: IconNames;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?:
    | "contentPrimary"
    | "contentSecondary"
    | "contentTernary"
    | "default"
    | "light"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error";
}

/**
 * O componente Icone é uma representação visual que adiciona uma dimensão estética e informativa à interface do usuário.
 *
 *
 */
const Icon = ({ name, size = "md", color, className, ...props }: IIconProps) => {
  const startNameLibrary: "md" | "pi" = name.substring(0, 2).toLowerCase() == "md" ? "md" : "pi";
  const selectedLibrary: any = iconLibraries[startNameLibrary];
  const IconBase = selectedLibrary ? selectedLibrary[name] : undefined;

  if (!IconBase) return <iconsPi.PiQuestion {...props} className={icon({ size, color, class: className })} />;
  return <IconBase {...props} className={icon({ size, color, class: className })} />;
};

export default Icon;
