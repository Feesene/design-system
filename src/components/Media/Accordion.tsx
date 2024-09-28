"use client";

import React, { useState } from "react";
import { tv } from "tailwind-variants";
import VStack from "../../elements/Layout/VStack";
import HStack from "../../elements/Layout/HStack";

export type IAccordionData = {
  title: string;
  content: string;
};

const accordion = tv({
  base: "overflow-hidden rounded-sm shadow-lg dark:shadow-dark-800",
});

export interface IAccordionProps extends Omit<React.ComponentProps<"div">, "ref"> {
  color?: "primary" | "info" | "success" | "warning" | "error";
  items: IAccordionData[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * O componente Accordion é uma implementação interativa que permite aos usuários expandir e recolher seções de conteúdo de forma organizada. Cada seção, ou painel, geralmente contém informações relacionadas, e proporciona uma maneira intuitiva de navegar e exibir detalhes adicionais apenas quando desejado.
 */
const Accordion = ({ children, size = "md", color = "primary", items, className, ...props }: IAccordionProps) => {
  return (
    <VStack {...props} className={accordion({ class: className })}>
      {items.map((item, i) => {
        return <AccordionItem size={size} key={i} color={color} item={item} />;
      })}
    </VStack>
  );
};

const accordionItem = tv({
  slots: {
    base: "dark:bg-dark-700",
    title:
      "cursor-pointer border-b px-6 py-4 font-semibold text-default-600 hover:bg-default-50 hover:text-default-800 focus:bg-default-50 dark:border-dark-500 dark:text-dark-100 dark:hover:bg-dark-600 dark:hover:text-dark-100 ",
    content: "border-b-2 bg-default-50 px-6 py-4 text-default-600 dark:border-dark-500 dark:bg-dark-800",
    icon: "mr-3 h-2 w-2 rounded-full",
  },
  variants: {
    size: {
      sm: { title: "text-xs", content: "text-xs" },
      md: { title: "text-sm", content: "text-sm" },
      lg: { title: "text-md", content: "text-md" },
    },
    active: {
      true: { icon: "" },
      false: { icon: "bg-default-600" },
    },
    color: {
      primary: "",
      info: "",
      success: "",
      warning: "",
      error: "",
    },
  },
  compoundSlots: [
    {
      slots: ["icon"],
      color: "primary",
      active: true,
      class: "bg-primary dark:bg-primary-300",
    },
    {
      slots: ["icon"],
      color: "info",
      active: true,
      class: "bg-info-600 dark:bg-info-400",
    },
    {
      slots: ["icon"],
      color: "success",
      active: true,
      class: "bg-success-500 dark:bg-success-300",
    },
    {
      slots: ["icon"],
      color: "warning",
      active: true,
      class: "bg-warning-500 dark:bg-warning-300",
    },
    {
      slots: ["icon"],
      color: "error",
      active: true,
      class: "bg-error-500 dark:bg-error-300",
    },
  ],
});

interface IAccordionItemProps {
  item: IAccordionData;
  color: "primary" | "info" | "success" | "warning" | "error";
  size: "sm" | "md" | "lg";
}

const { base, title, content, icon } = accordionItem();

const AccordionItem = ({ color = "info", size, item }: IAccordionItemProps) => {
  const [state, setState] = useState<boolean>(false);

  return (
    <VStack className={base({ color })}>
      <HStack
        onClick={() => {
          setState(!state);
        }}
        alignItems="center"
        className={title({ size })}
      >
        <div className={icon({ color, active: state })} />
        {item.title}
      </HStack>

      {state && <HStack className={content({ size })}>{item.content}</HStack>}
    </VStack>
  );
};

export default Accordion;
