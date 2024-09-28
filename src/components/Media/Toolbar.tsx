"use client";

import React from "react";
import { tv } from "tailwind-variants";
import Icon, { IconNames } from "../../elements/Media/Icon";
import Stack from "../../elements/Layout/Stack";
import Text from "../../elements/Typography/Text";
import ActionButton from "../../elements/Form/ActionButton";
import Tooltip, { ITooltipProps, TooltipTrigger } from "./Tooltip";

const toolbar = tv({
  slots: {
    base: "w-fit",
    inner:
      "w-full cursor-pointer border border-default-300 transition-all animate-duration-1000 focus-within:outline-primary-300 hover:z-10 hover:border-primary-400 active:border-primary-300 dark:border-dark-400 dark:focus-within:outline-primary-300/70 dark:hover:border-primary-400 dark:active:border-primary-300",
    title: "",
    icon: "",
  },
  variants: {
    orientation: {
      horizontal: { inner: "ml-[-1px] px-2", icon: "", title: "mx-1" },
      vertical: { inner: "mt-[-1px] px-2", title: "mx-1" },
    },
    rounded: {
      true: {
        inner: "",
      },
      false: { inner: "" },
    },
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
    },
    isSelected: {
      true: {
        icon: "text-white dark:text-white",
        title: "text-white dark:text-white",
        inner: "border-primary bg-primary text-white dark:text-white",
      },
      false: {
        icon: "",
      },
    },
  },
  compoundSlots: [
    {
      class: "ml-[-1px] h-6 min-w-6",
      slots: ["inner"],
      size: "xs",
      orientation: "horizontal",
    },
    {
      class: "ml-[-1px] h-8 min-w-8",
      slots: ["inner"],
      size: "sm",
      orientation: "horizontal",
    },
    {
      class: "ml-[-1px] h-10 min-w-10",
      slots: ["inner"],
      size: "md",
      orientation: "horizontal",
    },
    {
      class: "ml-[-1px] h-12 min-w-12",
      slots: ["inner"],
      size: "lg",
      orientation: "horizontal",
    },

    {
      class: "min-h-6 min-w-6",
      slots: ["inner"],
      size: "xs",
      orientation: "vertical",
    },
    {
      class: "min-h-8 min-w-8",
      slots: ["inner"],
      size: "sm",
      orientation: "vertical",
    },
    {
      class: "min-h-10 min-w-10",
      slots: ["inner"],
      size: "md",
      orientation: "vertical",
    },
    {
      class: "min-h-12 min-w-12",
      slots: ["inner"],
      size: "lg",
      orientation: "vertical",
    },

    {
      class: "first:rounded-s-full last:rounded-e-full",
      slots: ["inner"],
      rounded: true,
      orientation: "horizontal",
    },
    { class: "first:rounded-s-md last:rounded-e-md ", slots: ["inner"], rounded: false, orientation: "horizontal" },
    {
      class: "first:rounded-t-full last:rounded-b-full",
      slots: ["inner"],
      rounded: true,
      orientation: "vertical",
    },
    { class: "first:rounded-t-md last:rounded-b-md ", slots: ["inner"], rounded: false, orientation: "vertical" },
  ],
});

export type IToolbarItems = {
  icon?: IconNames | React.ReactElement;
  title?: string;
  tooltip?: string;
  isSelected?: boolean;
  onPress?: () => void;
};

export interface IToolbarProps extends Omit<React.ComponentProps<"div">, "ref"> {
  items: IToolbarItems[];
  orientation?: "vertical" | "horizontal";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  rounded?: boolean;
  tooltipProps?: ITooltipProps;
  classNames?: {
    icon?: string;
    inner?: string;
    title?: string;
  };
}

const { base, icon, inner, title } = toolbar();

/**
 * A principal função do componente Toolbar é renderizar uma barra de ferramentas customizável, composta por uma série de botões (ActionButton) que podem incluir ícones e textos, permitindo a seleção de itens e suporte a diferentes orientações (horizontal ou vertical), tamanhos e estilos visuais.
 */
const Toolbar = ({
  children,
  size = "md",
  items,
  className,
  classNames,
  orientation = "horizontal",
  rounded = false,
  tooltipProps,
  ...props
}: IToolbarProps) => {
  return (
    <Stack
      {...props}
      flexDirection={orientation == "horizontal" ? "row" : "col"}
      flex
      className={base({ class: className })}
    >
      {items.map((item, i) => {
        return (
          <TooltipTrigger delay={500} key={i}>
            <ActionButton
              key={i}
              onPress={item.onPress}
              className={inner({
                class: classNames?.inner,
                size,
                isSelected: item.isSelected,
                orientation,
                rounded,
              })}
            >
              {typeof item.icon === "string" && item.icon && (
                <Icon
                  size={size}
                  color="default"
                  className={icon({
                    orientation,
                    class: classNames?.icon,
                    isSelected: item.isSelected,
                  })}
                  name={item.icon}
                />
              )}
              {item.title && (
                <Text
                  weight="bold"
                  size={size}
                  className={title({
                    class: classNames?.title,
                    orientation,
                    size,
                    isSelected: item.isSelected,
                  })}
                >
                  {item.title}
                </Text>
              )}
            </ActionButton>
            <Tooltip size={"sm"} placement={orientation == "horizontal" ? "top" : "right"} {...tooltipProps}>
              {item.tooltip}
            </Tooltip>
          </TooltipTrigger>
        );
      })}
    </Stack>
  );
};

export default Toolbar;
