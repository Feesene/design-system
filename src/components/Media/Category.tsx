"use client";

import React from "react";
import { tv } from "tailwind-variants";
import Text from "../../elements/Typography/Text";
import Icon from "../../elements/Media/Icon";
import VStack from "../../elements/Layout/VStack";
import HStack from "../../elements/Layout/HStack";

const category = tv({
  slots: {
    base: "",
    inner: "",
    icon: "",
    title: "",
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
      default: {
        base: "",
        label: "",
      },
      primary: { base: "", label: "" },
      secondary: { base: "", label: "" },
      info: { base: "", label: "" },
      success: {
        base: "",
        label: "",
      },
      warning: {
        base: "",
        label: "",
      },
      error: { base: "", label: "" },
    },
    isSquare: {
      true: "rounded",
    },
    isOutline: {
      true: "",
    },
  },
});

const { base, icon, inner, title } = category();

export interface ICategoryProps {
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
 *
 */
const Category = ({
  initials,
  src,
  size = "md",
  color = "default",
  isSquare = false,
  isOutline = false,
  className,
  classNames,
}: ICategoryProps) => {
  return (
    <VStack
      className={base({
        class: "className group w-fit cursor-pointer gap-3 transition-all duration-300",
      })}
    >
      <HStack
        justifyContent="center"
        alignItems="center"
        bg="surface"
        className={inner({
          class:
            "h-12 w-12 rotate-45 rounded-md border border-default-400 duration-300 group-hover:translate-y-[-4px] group-hover:border-primary-400 group-hover:shadow-md",
        })}
      >
        <Icon
          name="PiLightning"
          size="lg"
          color="contentSecondary"
          className={icon({ class: "-rotate-45 group-hover:text-primary-400" })}
        />
      </HStack>

      <Text color="default" weight="bold" className={title({ class: "select-none group-hover:text-primary-400" })}>
        Energy
      </Text>
    </VStack>
  );
};

export default Category;
