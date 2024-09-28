"use client";

import React from "react";
import { tv } from "tailwind-variants";
import Image from "../../elements/Media/Image";
import Text from "../../elements/Typography/Text";

const avatar = tv({
  slots: {
    base: "flex items-center justify-center overflow-hidden rounded-full transition-all duration-300",
    label: "font-semibold",
    image: "h-full object-cover",
  },
  variants: {
    size: {
      xs: { base: "h-6 w-6", label: "text-2xs" },
      sm: { base: "h-8 w-8", label: "text-xs" },
      md: { base: "h-10 w-10", label: "text-sm" },
      lg: { base: "h-12 w-12", label: "text-lg" },
      xl: { base: "h-14 w-14", label: "text-xl" },
    },
    color: {
      default: { base: "bg-default-300 outline-default-content dark:bg-dark-400", label: "text-default-content dark:text-white" },
      primary: { base: "bg-primary outline-primary", label: "text-primary-content dark:text-white" },
      secondary: { base: "bg-secondary outline-secondary", label: "text-secondary-content dark:text-white" },
      info: { base: "bg-info-600 outline-info-600", label: "text-secondary-content dark:text-white" },
      success: {
        base: "bg-success-500 outline-success-500 dark:bg-success-400",
        label: "text-success-content dark:text-white",
      },
      warning: {
        base: "bg-warning-500 outline-warning-500 dark:bg-warning-400",
        label: "text-warning-content dark:text-white",
      },
      error: { base: "bg-error-500 outline-error-500 dark:bg-error-400", label: "text-error-content dark:text-white" },
    },
    isSquare: {
      true: "rounded",
    },
    isOutline: {
      true: "outline outline-2 outline-offset-[3px]",
    },
  },
});

const { base, label, image } = avatar();

export interface IAvatarProps {
  initials: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  isSquare?: boolean;
  isOutline?: boolean;
  className?: string;
  classNames?: { label?: string; image?: string };
}

/**
 * O componente Avatar é uma representação visual de um usuário ou entidade em uma aplicação React
 */
const Avatar = ({
  initials,
  src,
  size = "md",
  color = "default",
  isSquare = false,
  isOutline = false,
  className,
  classNames,
}: IAvatarProps) => {
  const [isError, setError] = React.useState<boolean>(false);

  const handleImageLoader = (isError: boolean) => setError(isError);

  return (
    <div className={base({ size, color, isSquare, isOutline, class: className })}>
      {src && isError === false ? (
        <Image src={src} className={image({ class: classNames?.image })} onError={() => handleImageLoader(true)} />
      ) : (
        <Text className={label({ size, color, class: classNames?.label })}>{initials}</Text>
      )}
    </div>
  );
};

export default Avatar;
