"use client";

import type { MenuTriggerProps } from "react-stately";
import { AriaMenuProps, Placement, mergeProps, useButton, useMenuTrigger } from "react-aria";
import { Item, useMenuTriggerState } from "react-stately";
import React from "react";
import Popover, { IPopoverProps } from "./Popover";
import { Menu } from "./Menu";
import { tv } from "tailwind-variants";
import Icon, { IIconProps, IconNames } from "../../elements/Media/Icon";
import HStack from "../../elements/Layout/HStack";
import VStack from "../../elements/Layout/VStack";
import Text from "../../elements/Typography/Text";
import Divider from "./Divider";

const menubutton = tv({
  slots: {
    base: "outline-focused-sm flex items-center justify-center rounded-full bg-default/0 font-bold transition-all",
    popover: "rounded-sm",
    inner: "group flex items-center justify-start hover:bg-default-100/60 dark:hover:bg-dark-700",
    icon: "ml-1 text-default-600 group-hover:text-primary-400 dark:text-dark-100",
    label: "text-default-900 dark:text-dark-100",
    description: "text-default-500 dark:text-dark-300",
  },
  variants: {
    size: {
      xs: { base: "h-5 w-5 py-1 text-2xs", inner: "px-1 py-1" },
      sm: { base: "h-6 w-6 text-xs", inner: "px-1 py-1" },
      md: { base: "h-8 w-8 text-sm", inner: "px-2 py-2" },
      lg: { base: "h-10 w-10 text-base", inner: "px-2 py-2" },
      xl: { base: "h-12 w-12 text-lg", inner: "px-2 py-2" },
    },
    iconColor: {
      primary: { icon: "group-hover:text-primary-400" },
      secondary: { icon: "group-hover:text-secondary" },
      error: { icon: "group-hover:text-error-400" },
      warning: { icon: "group-hover:text-warning-400" },
      info: { icon: "group-hover:text-info-500" },
      success: { icon: "group-hover:text-success-400" },
    },
    isRaised: {
      true: { base: "shadow-lg dark:shadow-dark-800" },
    },
    isDisabled: {
      true: { base: "cursor-default bg-default/0 opacity-50 shadow-none" },
      false: { base: "hover:bg-default-100 dark:hover:bg-dark-600" },
    },
    isOpen: {
      true: { base: "bg-default-200 hover:bg-default-200 dark:bg-dark-800 dark:hover:bg-dark-800" },
    },
  },
});

const { base, description: d, icon: i, inner, label: l, popover: p } = menubutton();

export interface IMenuValue {
  value: number | string;
  label: string;
  description?: string;
  icon?: IconNames;
  iconColor?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  hasDivider?: boolean;
}

export interface IMenuButtonProps<T> extends Omit<AriaMenuProps<T>, "children">, MenuTriggerProps {
  children?: React.ReactNode;
  values?: IMenuValue[];
  iconProps?: IIconProps;
  popoverProps?: IPopoverProps;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  sizeButton?: "xs" | "sm" | "md" | "lg" | "xl";
  placement?: Placement;
  isDisabled?: boolean;
  isRaised?: boolean;
  className?: string;
  classNames?: {
    inner?: string;
    icon?: string;
    label?: string;
    description?: string;
    popover?: string;
    menu?: string;
    menuItem?: string;
  };
}

/**
 * O componente MenuButton é um elemento React que combina a funcionalidade de um botão e a capacidade de exibir um menu suspenso ao ser clicado. Ele é frequentemente usado para criar botões que revelam opções adicionais ou ações quando acionados, proporcionando uma maneira organizada de apresentar escolhas ao usuário.
 */
const MenuButton = <T extends object>({
  className,
  children,
  size = "md",
  sizeButton = "md",
  iconProps,
  isDisabled,
  classNames,
  placement = "bottom end",
  values,
  isRaised,
  popoverProps,
  ...props
}: IMenuButtonProps<T>) => {
  let state = useMenuTriggerState(props);

  let ref = React.useRef<any>(null);
  let { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref);

  let { buttonProps } = useButton(
    {
      ...menuTriggerProps,
    },
    ref,
  );

  return (
    <>
      <button
        {...buttonProps}
        ref={ref}
        className={base({ class: className, isOpen: state.isOpen, isDisabled, isRaised, size: sizeButton })}
      >
        <Icon
          name="PiDotsThreeVerticalBold"
          size={sizeButton}
          className="text-default-800 dark:text-dark-100"
          {...iconProps}
        />
        {children}
      </button>

      {state.isOpen && !isDisabled && (
        <Popover
        arrow
          state={state}
          triggerRef={ref}
          placement={placement}
          className={p({ class: classNames?.popover })}
          {...popoverProps}
        >
          <Menu
            {...mergeProps(props, menuProps)}
            classNameMenu={classNames?.menu}
            classNameMenuItem={classNames?.menuItem}
          >
            {values &&
              values.map((value) => {
                return (
                  <Item key={value.value} textValue={String(value.value)}>
                    {value.hasDivider && (
                      <Divider orientation="horizontal" size="sm" className="bg-default-100 dark:bg-dark-700" />
                    )}
                    <HStack className={inner({ class: classNames?.inner, size })}>
                      {value.icon && (
                        <Icon
                          name={value.icon}
                          size={size}
                          className={i({ class: classNames?.icon, iconColor: value.iconColor })}
                        />
                      )}
                      <VStack className="px-4">
                        <Text weight="bold" size={size} className={l({ class: classNames?.label })}>
                          {value.label}
                        </Text>
                        {value.description && (
                          <Text size={size} className={d({ class: classNames?.description })}>
                            {value.description}
                          </Text>
                        )}
                      </VStack>
                    </HStack>
                  </Item>
                );
              })}
          </Menu>
        </Popover>
      )}
    </>
  );
};

export default MenuButton;
