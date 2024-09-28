"use client";

import React from "react";
import { tv } from "tailwind-variants";
import Link, { ILinkProps } from "../../elements/Form/Link";
import Icon, { IconNames } from "../../elements/Media/Icon";
import HStack from "../../elements/Layout/HStack";

export interface IItemsBreadCrumb {
  label?: string;
  hideLabel?: boolean;
  icon?: IconNames;
  to?: string;
}

const breadcrumb = tv({
  slots: {
    base: "flex flex-row items-center gap-2",
    icon: "text-content-primary dark:text-dark-200",
    label: "group flex cursor-pointer flex-row items-center gap-1 text-content-primary dark:text-dark-200",
    separator: "text-content-primary dark:text-dark-200",
  },

  variants: {
    size: {
      xs: { label: "text-xs" },
      sm: { label: "text-sm" },
      md: { label: "text-md" },
      lg: { label: "text-lg" },
      xl: { label: "text-xl" },
    },
    color: {
      default: { icon: "", label: "hover:text-default dark:hover:text-dark-200" },
      primary: {
        icon: "group-hover:text-primary dark:group-hover:text-primary-400",
        label: "hover:text-primary dark:hover:text-primary-400",
      },
      secondary: {
        icon: "group-hover:text-secondary dark:group-hover:text-secondary-500",
        label: "hover:text-secondary dark:hover:text-secondary-500",
      },
      info: {
        icon: "group-hover:text-info-600 dark:group-hover:text-info-400",
        label: "hover:text-info-600 dark:hover:text-info-400",
      },
      success: {
        icon: "group-hover:text-success-500 dark:group-hover:text-success-400",
        label: "hover:text-success-500 dark:hover:text-success-400",
      },
      warning: {
        icon: "group-hover:text-warning-500 dark:group-hover:text-warning-400",
        label: "hover:text-warning-500 dark:hover:text-warning-400",
      },
      error: {
        icon: "group-hover:text-error-500 dark:group-hover:text-error-400",
        label: "hover:text-error-500 dark:hover:text-error-400",
      },
    },
  },
});

const { base, icon, label, separator: s } = breadcrumb();

export interface IBreadCrumbsProps {
  items?: IItemsBreadCrumb[];
  separator?: IconNames;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  className?: string;
  classNames?: {
    icon?: string;
    label?: string;
    separator?: string;
  };
  linkProps?: Omit<ILinkProps, "children">;
  onClickItem?: (value: number) => void;
}

/**
 * O componente Breadcrumbs é uma implementação visual que fornece uma representação hierárquica da navegação do usuário em uma aplicação React. Ele exibe uma trilha de migalhas de pão, indicando o caminho percorrido pelo usuário para chegar à página atual. Cada "migalha" representa um nível na hierarquia de navegação e geralmente é clicável, permitindo que o usuário retorne rapidamente aos níveis anteriores.
 */
const BreadCrumbs = ({
  items,
  separator = "PiDotOutlineFill",
  size = "sm",
  linkProps,
  color = "primary",
  className,
  classNames,
  onClickItem,
}: IBreadCrumbsProps) => {
  return (
    <div className={base({ class: className })}>
      {items &&
        items.map((item, i) => {
          const A = item.to ? Link : "div";
          return (
            <HStack key={i} alignItems="center" className={`gap-2`} onClick={() => onClickItem && onClickItem(i)}>
              {item && (
                <A {...linkProps} href={item.to} className={label({ class: classNames?.label, color, size })}>
                  {item.icon && (
                    <Icon size={size} name={item.icon} className={icon({ class: classNames?.icon, color, size })} />
                  )}
                  {!item.hideLabel && item.label}
                </A>
              )}

              {items.length - 1 != i && (
                <Icon size={size} name={separator} className={s({ class: classNames?.separator })} />
              )}
            </HStack>
          );
        })}
    </div>
  );
};

export default BreadCrumbs;
