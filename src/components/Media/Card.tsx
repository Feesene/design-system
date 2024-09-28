import React from "react";
import { tv } from "tailwind-variants";
import VStack from "../../elements/Layout/VStack";

const card = tv({
  slots: {
    base: "border border-default-200 dark:border-dark-600",
    header: "flex w-full items-center border-b border-default-200 px-6 py-2 dark:border-dark-500",
    content: "px-6 py-4",
    footer: "flex w-full items-center border-t border-default-200 px-6 py-2 dark:border-dark-500",
  },
  variants: {
    elevated: {
      true: { base: "shadow-lg dark:shadow-dark-800" },
    },
    animation: {
      true: { base: "duration-300 hover:translate-y-[-3px]" },
    },
    rounded: {
      xs: { base: "rounded-sm" },
      sm: { base: "rounded-md" },
      md: { base: "rounded-lg" },
      lg: { base: "rounded-xl" },
      xl: { base: "rounded-2xl" },
    },
  },
});

const { base, footer: f, header: h, content: c } = card();

export interface ICardProps extends Omit<React.ComponentProps<"div">, "ref"> {
  rounded?: "xs" | "sm" | "md" | "lg" | "xl";
  elevated?: boolean;
  bg?: "background" | "surface";
  className?: string;
  animation?: boolean;
}

const Header = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return <div className={h({ class: className })}>{children}</div>;
};

const Footer = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return <div className={f({ class: className })}>{children}</div>;
};

const Content = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return <div className={c({ class: className })}>{children}</div>;
};

/**
 * O componente Card é uma representação visual de um contêiner retangular que agrupa informações relacionadas em uma aplicação React.
 *
 * ```tsx
 *  <Card {...props}>
 *    <Card.Header />
 *    <Card.Content />
 *    <Card.Footer />
 *  </Card>
 * ```
 */
const Card = ({
  children,
  bg = "surface",
  animation = false,
  className,
  rounded = "sm",
  elevated,
  ...props
}: ICardProps) => {
  return (
    <VStack bg={bg} {...props} className={base({ class: className, animation, rounded, elevated })}>
      {children}
    </VStack>
  );
};

Card.Header = Header;
Card.Footer = Footer;
Card.Content = Content;

export default Card;
