"use client";

import React, { useEffect, useState } from "react";
import { useButton, AriaSelectProps, HiddenSelect, useSelect, useFocusRing, mergeProps } from "react-aria";
import { Item, Section, useSelectState } from "react-stately";
import { tv } from "tailwind-variants";
import Icon, { IconNames } from "../Media/Icon";
import Spinner from "../../components/Media/Spinner";
import Popover, { IPopoverProps } from "../../components/Media/Popover";
import ListBox, { IListBoxProps } from "./ListBox";

const selectField = tv({
  slots: {
    base: "relative flex w-full flex-col gap-[0.10rem]",
    label: "!font-normal text-default-700 dark:text-dark-100",
    input:
      "flex w-11/12 items-center text-start !font-normal text-default-content outline-none dark:bg-dark-700 dark:text-dark-100",
    inner:
      "outline-focused group flex w-full items-center justify-center gap-3 rounded border border-default-200 bg-white px-3 text-default-900 transition-all duration-300 hover:border-default-300 hover:focus-within:border-default-200 dark:border-dark-500 dark:bg-dark-700 dark:text-dark-100 dark:hover:focus-within:border-dark-400",
    description: "text-default-400 dark:text-dark-300",
    errorMessage: "flex text-error dark:text-error-300",
    icon: "text-default-400 group-focus-within:text-primary dark:text-dark-400 dark:group-focus-within:text-primary-300",
    arrowIcon: "text-primary transition-all dark:text-primary-300",
  },
  variants: {
    placeholder: {
      true: { input: "text-default-300 dark:text-dark-400" },
    },
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

const { base, input: i, label: l, inner, description: d, errorMessage: em, icon, arrowIcon } = selectField();

export interface ISelectFieldProps<T> extends Omit<AriaSelectProps<T>, "children"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children?: any;
  leftIcon?: IconNames;
  isBlock?: boolean;
  loading?: boolean;
  isDisabled?: boolean;
  className?: string;
  errorMessage?: string;
  popoverProps?: Partial<IPopoverProps>;
  elevated?: boolean;
  listBoxProps?: IListBoxProps<any>;
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
 * O componente SelectField representa uma caixa de seleção que permite aos usuários escolher uma opção de uma lista suspensa.
 * 
  ```tsx
  <SelectField>
    <SelectField.Option key={"Primeira opção"}>Primeira opção</SelectField.Option>
    <SelectField.Option key={"Segunda opção"}>Segunda opção</SelectField.Option>
    <SelectField.Option key={"Terceira opção"}>Terceira opção</SelectField.Option>
  </SelectField>
  ```
 */
const SelectField = ({
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
  placeholder = "Selecione uma opção",
  listBoxProps,
  elevated = false,
  ...props
}: ISelectFieldProps<any>) => {
  let state = useSelectState({ isDisabled, ...props });
  const ref = React.useRef<any>(null);
  const [width, setWidth] = useState<number>(100);

  useEffect(() => {
    ref && ref.current && ref.current.offsetWidth && setWidth(ref.current.offsetWidth);
  }, [ref]);

  let { labelProps, triggerProps, errorMessageProps, descriptionProps, valueProps, menuProps } = useSelect(
    { ...props, "aria-label": String(props.label) || props["aria-label"] || "selecionar" },
    state,
    ref,
  );

  let { buttonProps } = useButton(triggerProps, ref);
  let { focusProps } = useFocusRing();

  return (
    <div ref={ref} className={base({ isBlock, class: className })}>
      {props.label && (
        <label {...labelProps} className={l({ size, class: classNames?.label })}>
          {props.label}
        </label>
      )}

      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={inner({ size, isDisabled, class: classNames?.inner, isBlock, elevated })}
      >
        {leftIcon ? <Icon name={leftIcon} className={icon({ size, isDisabled, class: classNames?.icon })} /> : null}
        <span
          {...valueProps}
          className={i({ isDisabled, placeholder: !state.selectedItem, size, class: classNames?.input })}
        >
          {state.selectedItem ? state.selectedItem.rendered : placeholder}
        </span>

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
      <HiddenSelect state={state} triggerRef={ref} label={props.label} name={props.name} />
      {state.isOpen && (
        <Popover
          width={width}
          triggerRef={ref}
          state={state}
          offset={8}
          placement="bottom"
          className="border-none shadow-none"
          {...popoverProps}
        >
          <ListBox
            className="shadow-md dark:shadow-dark-800"
            classNames={{ li: "py-1" }}
            {...listBoxProps}
            {...menuProps}
            state={state}
            selectionMode="single"
            size={size}
            hoverBg
          >
            {props.children}
          </ListBox>
        </Popover>
      )}
      {description && (
        <span {...descriptionProps} className={d({ size, class: classNames?.description })}>
          {description}
        </span>
      )}
      {errorMessage && (
        <span {...errorMessageProps} className={em({ size, class: classNames?.errorMessage })}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

SelectField.Option = Item;
SelectField.Section = Section;

export default SelectField;
