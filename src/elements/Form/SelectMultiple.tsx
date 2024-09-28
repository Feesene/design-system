"use client";

import React, { useEffect, useState } from "react";
import { Item, Section } from "react-stately";
import { tv } from "tailwind-variants";
import Icon, { IconNames } from "../Media/Icon";
import PopoverTrigger from "../../components/Media/PopoverTrigger";
import ListBox from "./ListBox";
import { AriaListBoxProps } from "react-aria";
import Text from "../Typography/Text";
import Spinner from "../../components/Media/Spinner";
import Badge from "../../components/Media/Badge";
import IconButton from "../Media/IconButton";
import { IPopoverProps } from "../../components/Media/Popover";

const selectMultiple = tv({
  slots: {
    base: "relative flex w-full flex-col gap-[0.10rem]",
    label: "!font-normal text-default-700 dark:text-dark-100",
    input:
      "no-scrollbar flex w-11/12 flex-wrap items-center gap-1 overflow-y-auto py-1 text-start !font-normal text-default-content outline-none placeholder:text-default-300 dark:bg-dark-700 dark:text-dark-100",
    inner:
      "outline-focused group flex w-full items-center justify-center gap-3 rounded border border-default-200 bg-white px-3 text-default-900 transition-all duration-300 hover:border-default-300 hover:focus-within:border-default-200 dark:border-dark-500 dark:bg-dark-700 dark:text-dark-100 dark:hover:focus-within:border-dark-400",
    description: "text-default-400 dark:text-dark-300",
    errorMessage: "flex text-error dark:text-error-300",
    icon: "text-default-400 group-focus-within:text-primary dark:text-dark-400 dark:group-focus-within:text-primary-300",
    arrowIcon: "text-primary transition-all dark:text-primary-300",
  },
  variants: {
    elevated: {
      true: { inner: "shadow-md dark:shadow-dark-800" },
    },
    size: {
      xs: {
        input: "h-6 text-xs",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
        icon: "h-3 w-3",
        arrowIcon: "h-3 w-3",
      },
      sm: {
        input: "h-8 text-xs",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
        icon: "h-4 w-4",
        arrowIcon: "h-4 w-4",
      },
      md: {
        input: "h-10 text-sm",
        label: "text-sm",
        description: "text-xs",
        errorMessage: "text-xs",
        icon: "h-5 w-5",
        arrowIcon: "h-5 w-5",
      },
      lg: {
        input: "h-12 text-base",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
        icon: "h-6 w-6",
        arrowIcon: "h-6 w-6",
      },
      xl: {
        input: "h-14 text-base",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
        icon: "h-7 w-7",
        arrowIcon: "h-7 w-7",
      },
    },
    isDisabled: {
      true: {
        base: "",
        input: "bg-default-50 text-default-300 dark:bg-dark-600 dark:text-dark-300",
        inner: "cursor-default bg-default-50 text-default-300 dark:bg-dark-600 dark:text-dark-300 ",
        icon: "text-default-300 group-focus-within:text-default-300 dark:text-dark-300",
        arrowIcon: "text-default-300 dark:text-dark-300",
      },
    },
    isBlock: {
      true: { base: "w-full" },
    },
    isOpen: {
      true: { arrowIcon: "rotate-180" },
    },
    icon: {},
  },
});

const { base, input: i, label: l, inner, description: d, errorMessage: em, icon, arrowIcon } = selectMultiple();

export interface ISelectMultipleProps<T> extends Omit<AriaListBoxProps<T>, "onSelectionChange"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onChange?: (keys: string[]) => void;
  leftIcon?: IconNames;
  isBlock?: boolean;
  loading?: boolean;
  isDisabled?: boolean;
  className?: string;
  errorMessage?: string;
  description?: string;
  placeholder?: string;
  elevated?: boolean;
  popoverProps?: Omit<IPopoverProps, "state" | "children" | "triggerRef">;
  classNames?: {
    label?: string;
    inner?: string;
    description?: string;
    errorMessage?: string;
    icon?: string;
    input?: string;
  };
}

/**
 * Um componente de seleção múltipla em React é um elemento de interface do usuário que permite aos usuários selecionar várias opções de uma lista de itens disponíveis.
 * 
  ```tsx
  <SelectMultiple>
    <SelectMultiple.Section title="Opções">
      <SelectMultiple.Option key={"Primeira opção"}>Primeira opção</SelectMultiple.Option>
      <SelectMultiple.Option key={"Segunda opção"}>Segunda opção</SelectMultiple.Option>
      <SelectMultiple.Option key={"Terceira opção"}>Terceira opção</SelectMultiple.Option>
      <SelectMultiple.Option key={"Quarta opção"}>Quarta opção</SelectMultiple.Option>
      <SelectMultiple.Option key={"Quinta opção"}>Quinta opção</SelectMultiple.Option>
      <SelectMultiple.Option key={"Sexta opção"}>Sexta opção</SelectMultiple.Option>
      <SelectMultiple.Option key={"Sétima opção"}>Sétima opção</SelectMultiple.Option>
      <SelectMultiple.Option key={"Oitava opção"}>Oitava opção</SelectMultiple.Option>
      <SelectMultiple.Option key={"Nona opção"}>Nona opção</SelectMultiple.Option>
      <SelectMultiple.Option key={"10"}>Decima opção</SelectMultiple.Option>
    </SelectMultiple.Section>
  </SelectMultiple>
  ```
 */
const SelectMultiple = ({
  size = "md",
  isBlock = false,
  errorMessage,
  loading = false,
  description,
  isDisabled,
  placeholder,
  leftIcon,
  className,
  classNames,
  elevated = false,
  children,
  onChange,
  popoverProps,
  ...props
}: ISelectMultipleProps<Object>) => {
  const ref = React.useRef<any>(null);
  const [width, setWidth] = useState<number>(100);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    ref && ref.current && ref.current.offsetWidth && setWidth(ref.current.offsetWidth);
  }, [ref]);

  return (
    <div ref={ref} className={base({ isBlock, isDisabled, class: className })}>
      {props.label && <label className={l({ size, class: classNames?.label })}>{props.label}</label>}

      <div className={inner({ size, isDisabled, class: classNames?.inner, isBlock, elevated })}>
        {leftIcon ? <Icon name={leftIcon} className={icon({ size, isDisabled, class: classNames?.icon })} /> : null}
        <div
          className={i({
            isDisabled,
            size,
            class: classNames?.input,
          })}
        >
          {props.selectedKeys === "all" ? (
            props.selectedKeys
          ) : props.selectedKeys ? (
            [...props.selectedKeys].length == 0 ? (
              <Text color="contentSecondary" className="select-none">
                {placeholder}
              </Text>
            ) : (
              [...props.selectedKeys].map((value, i) => (
                <Badge
                  size={size == "xs" ? "xs" : "sm"}
                  key={i}
                  color="default"
                  className="flex flex-row items-center overflow-hidden text-ellipsis text-nowrap px-2 pr-1"
                >
                  {value}
                  <IconButton
                    outline={false}
                    size="xs"
                    icon="MdClose"
                    onPress={() => {
                      const removed =
                        !props.selectedKeys || props.selectedKeys == "all"
                          ? []
                          : [...props.selectedKeys].filter((key) => key !== value);

                      onChange && onChange(removed.map((key) => String(key)));
                    }}
                    className="cursor-pointer text-transparent hover:!text-error-300 group-hover:text-default-500"
                  />
                </Badge>
              ))
            )
          ) : (
            ""
          )}
        </div>
        {!loading && (
          <PopoverTrigger
            popoverProps={{ width: width, offset: 15, crossOffset: 10, ...popoverProps }}
            placement="bottom end"
            className="m-0 gap-0 p-0"
            onOpenChange={setIsOpen}
            popover={
              <ListBox
                aria-label={String(props.label) || "selecionar múltiplos"}
                className="w-full bg-white dark:bg-dark-800"
                classNames={{ li: "my-[1px] py-1" }}
                {...props}
                onChange={!isDisabled ? onChange : undefined}
                hoverBg
                label=""
                selectionMode="multiple"
                hasBorder={false}
              >
                {children}
              </ListBox>
            }
          >
            <Icon name="MdKeyboardArrowUp" className={arrowIcon({ size, isDisabled, isOpen })} aria-hidden="true" />
          </PopoverTrigger>
        )}
        {loading && <Spinner size="xs" />}
      </div>

      {description && <span className={d({ size, class: classNames?.description })}>{description}</span>}
      {errorMessage && <span className={em({ size, class: classNames?.errorMessage })}>{errorMessage}</span>}
    </div>
  );
};

SelectMultiple.Option = Item;
SelectMultiple.Section = Section;

export default SelectMultiple;
