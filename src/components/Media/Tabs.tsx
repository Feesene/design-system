"use client";

import React, { useEffect, useMemo, useState } from "react";
import { tv } from "tailwind-variants";
import VStack from "../../elements/Layout/VStack";
import HStack from "../../elements/Layout/HStack";
import Icon, { IconNames } from "../../elements/Media/Icon";

export type ITabsData = {
  title: string;
  content: string | React.ReactElement | (() => React.ReactElement | string);
  icon?: IconNames;
};

const tabs = tv({
  slots: {
    base: "",
    header: "no-scrollbar flex overflow-x-auto border-b border-neutral-200 dark:border-dark-600",
    label:
      "group flex cursor-pointer flex-col items-center gap-1 px-4 py-2 text-default-400 dark:text-dark-400 tablet:flex-row tablet:gap-2",
    icon: "text-default-400 dark:text-dark-400",
    description: "py-4 text-default-600 dark:text-dark-200",
  },
  variants: {
    color: {
      primary: "",
      secondary: "",
    },
    size: {
      sm: {
        label: "text-sm",
        description: "text-sm",
      },
      md: {
        label: "text-md",
        description: "text-md",
      },
      lg: {
        label: "text-lg",
        description: "text-lg",
      },
    },
    alignTabs: {
      left: { header: "justify-start" },
      center: { header: "justify-center" },
      right: { header: "justify-end" },
    },
    isSelected: {
      true: {
        label: "border-b-2",
        description: "animate-fade-down animate-duration-300",
        icon: "",
      },
      false: {
        label: "hover:text-default-600 dark:hover:text-dark-200",
        icon: "group-hover:text-default-600 dark:group-hover:text-dark-200",
      },
    },
  },
  compoundSlots: [
    {
      slots: ["icon", "label"],
      color: "primary",
      isSelected: true,
      className: "border-primary font-bold text-primary dark:border-primary-300 dark:text-primary-300",
    },
    {
      slots: ["icon", "label"],
      color: "secondary",
      isSelected: true,
      className: "border-secondary font-bold text-secondary dark:border-secondary-500 dark:text-secondary-500",
    },
  ],
});

export interface ITabsProps extends Omit<React.ComponentProps<"div">, "ref"> {
  color?: "primary" | "secondary";
  items: ITabsData[];
  alignTabs?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg";
  className?: string;
  classNames?: {
    header?: string;
    label?: string;
    icon?: string;
    description?: string;
  };
}

const { base, description, header, icon, label } = tabs();

/**
 * O componente Tabs é uma implementação em React de uma lista de abas ou guias que permite aos usuários alternar entre diferentes seções de conteúdo em uma aplicação
 */
const Tabs = ({
  children,
  alignTabs = "left",
  size = "md",
  color = "primary",
  items,
  className,
  classNames,
  ...props
}: ITabsProps) => {
  const [id, setId] = useState(0);
  const [state, setState] = useState(false);

  const content = useMemo(() => {
    const itemContent = items[id].content;
    return typeof itemContent === "function" ? itemContent() : itemContent;
  }, [id, items]);

  useEffect(() => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 300);
  }, [id]);

  return (
    <VStack {...props} className={base({ class: className })}>
      <HStack className={header({ class: classNames?.header, alignTabs })}>
        {items.map((item, i) => {
          return (
            <HStack className="flex items-center" key={i}>
              <div
                onClick={() => {
                  setId(i);
                }}
                className={label({ class: classNames?.label, size, color, isSelected: id == i })}
              >
                {item.icon && (
                  <Icon
                    size={size}
                    className={icon({ class: classNames?.icon, color, isSelected: id == i })}
                    name={item.icon}
                  />
                )}
                {item.title}
              </div>
            </HStack>
          );
        })}
      </HStack>
      <VStack className={description({ class: classNames?.description, size, isSelected: state })}>{content}</VStack>
    </VStack>
  );
};

export default Tabs;
