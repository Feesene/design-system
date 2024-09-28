"use client";

import React, { useEffect, useState } from "react";
import { useButton, AriaComboBoxProps, useComboBox, useFilter } from "react-aria";
import { Item, Section, useComboBoxState } from "react-stately";
import { tv } from "tailwind-variants";
import Icon, { IconNames } from "../Media/Icon";
import Spinner from "../../components/Media/Spinner";
import Popover, { IPopoverProps } from "../../components/Media/Popover";
import ListBox, { IListBoxProps } from "./ListBox";

const combobox = tv({
  slots: {
    base: "relative flex w-full flex-col gap-[0.10rem]",
    label: "!font-normal text-default-700 dark:text-dark-100",
    input:
      "w-11/12 bg-white text-start !font-normal text-default-content outline-none placeholder:text-default-300 dark:bg-dark-700 dark:text-dark-100 dark:placeholder:text-dark-400",
    inner:
      "group flex w-full items-center justify-center gap-3 rounded border border-default-200 bg-white px-3 text-default-900 transition-all duration-300 hover:border-default-300 hover:focus-within:border-default-200 dark:border-dark-500 dark:bg-dark-700 dark:text-dark-100 dark:hover:focus-within:border-dark-400",
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
    isReadOnly: {
      true: {
        label: "font-semibold text-default-900 dark:text-white",
        input: "cursor-default bg-transparent text-default-800 dark:bg-transparent",
        inner: "bg-transparent dark:bg-transparent",
      },
      false: {
        inner: "outline-focused",
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

const { base, input: i, label: l, inner, description: d, errorMessage: em, icon, arrowIcon } = combobox();

export interface IComboBoxProps<T> extends Omit<AriaComboBoxProps<T>, "children"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  leftIcon?: IconNames;
  isBlock?: boolean;
  loading?: boolean;
  isDisabled?: boolean;
  className?: string;
  errorMessage?: string;
  popoverProps?: Partial<IPopoverProps>;
  listBoxProps?: IListBoxProps<any>;
  children?: any;
  elevated?: boolean;
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
 * O componente ComboBox representa uma caixa de seleção que permite aos usuários escolher uma opção de uma lista suspensa.
 * 
  ```tsx
  <ComboBox>
    <ComboBox.Option key={"Primeira opção"}>Primeira opção</ComboBox.Option>
    <ComboBox.Option key={"Segunda opção"}>Segunda opção</ComboBox.Option>
    <ComboBox.Option key={"Terceira opção"}>Terceira opção</ComboBox.Option>
  </ComboBox>
  ```
 */
const ComboBox = ({
  size = "md",
  isDisabled = false,
  isBlock = false,
  errorMessage,
  loading = false,
  description,
  leftIcon,
  popoverProps,
  className,
  classNames,
  listBoxProps,
  elevated,
  ...props
}: IComboBoxProps<any>) => {
  let { contains } = useFilter({ sensitivity: "base" });
  let state = useComboBoxState({ isDisabled, defaultFilter: contains, ...props });
  const ref = React.useRef<any>(null);
  const [width, setWidth] = useState<number>(100);

  useEffect(() => {
    ref && ref.current && ref.current.offsetWidth && setWidth(ref.current.offsetWidth);
  }, [ref]);

  let buttonRef = React.useRef(null);
  let inputRef = React.useRef(null);
  let listBoxRef = React.useRef(null);
  let popoverRef = React.useRef(null);

  let {
    buttonProps: triggerProps,
    inputProps,
    listBoxProps: menuProps,
    labelProps,
  } = useComboBox(
    {
      ...props,
      isDisabled,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state,
  );

  let { buttonProps } = useButton(triggerProps, buttonRef);

  return (
    <div ref={ref} className={base({ isBlock, class: className })}>
      {props.label && (
        <label {...labelProps} className={l({ size, class: classNames?.label, isReadOnly: !!inputProps.readOnly })}>
          {props.label}
        </label>
      )}
      <div
        className={inner({
          size,
          isDisabled,
          class: classNames?.inner,
          isBlock,
          isReadOnly: !!inputProps.readOnly,
          elevated,
        })}
      >
        {leftIcon ? <Icon name={leftIcon} className={icon({ size, isDisabled, class: classNames?.icon })} /> : null}
        <input
          {...inputProps}
          ref={inputRef}
          disabled={isDisabled}
          className={i({ isDisabled, size, isReadOnly: !!inputProps.readOnly, class: classNames?.input })}
        />

        <button {...buttonProps} ref={buttonRef} className={"cursor-pointer"}>
          {!loading ? (
            <Icon
              name="MdKeyboardArrowUp"
              className={arrowIcon({ size, isDisabled, isOpen: state.isOpen })}
              aria-hidden="true"
            />
          ) : (
            <Spinner size="xs" />
          )}
        </button>
      </div>
      {state.isOpen && (
        <Popover
          width={width}
          // popoverRef={popoverRef}
          triggerRef={inputRef}
          state={state}
          placement="bottom"
          className="border-none shadow-none"
          crossOffset={15}
          {...popoverProps}
        >
          <ListBox
            className="shadow-md dark:shadow-dark-800"
            classNames={{ li: "py-1" }}
            {...listBoxProps}
            {...menuProps}
            state={state}
            // listBoxRef={listBoxRef}
            selectionMode="single"
            size={size}
            hoverBg
          >
            {props.children}
          </ListBox>
        </Popover>
      )}
      {description && <span className={d({ size, class: classNames?.description })}>{description}</span>}
      {errorMessage && <span className={em({ size, class: classNames?.errorMessage })}>{errorMessage}</span>}
    </div>
  );
};

ComboBox.Option = Item;
ComboBox.Section = Section;

export default ComboBox;
