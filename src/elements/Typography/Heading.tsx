import React from "react";
import { tv } from "tailwind-variants";

const heading = tv({
  variants: {
    size: {
      xs: "text-lg",
      sm: "text-2xl",
      md: "text-3xl",
      lg: "text-4xl",
      xl: "text-5xl",
      "2xl": "text-6xl",
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

export interface IHeadingProps extends React.ComponentProps<"h1"> {
  children: string | string[];
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
 * O componente Heading é um elemento React projetado para representar títulos e cabeçalhos em uma interface de usuário. Ele é utilizado para destacar seções importantes de conteúdo, fornecendo uma hierarquia visual e estrutural.
 */
const Heading = ({
  children,
  size = "md",
  weight = "bold",
  color = "contentPrimary",
  className,
  ...props
}: IHeadingProps) => {
  const H = React.useMemo(() => {
    switch (size) {
      case "xl":
        return "h2";
      case "lg":
        return "h3";
      case "md":
        return "h4";
      case "sm":
        return "h5";
      case "xs":
        return "h6";
      default:
        return "h1";
    }
  }, [size]);

  return (
    <H {...props} className={heading({ size, weight, color, class: className })}>
      {children}
    </H>
  );
};

export default Heading;
