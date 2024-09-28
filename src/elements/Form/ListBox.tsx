"use client";

import React from "react";
import type { AriaListBoxProps } from "react-aria";
import { Item, ListState, Node, Section, useListState } from "react-stately";
import { mergeProps, useFocusRing, useListBox, useListBoxSection, useOption } from "react-aria";
import { IMenuItem } from "./Select";
import { tv } from "tailwind-variants";

export const getKeyItemRecord = <T extends IMenuItem>(items: T[]): Record<string, T> => {
  return items.reduce<Record<string, T>>((previous, item) => ({ ...previous, [item.id]: item }), {});
};

const listbox = tv({
  slots: {
    base: "flex flex-col gap-[0.10rem]",
    label: "text-default-700 dark:text-dark-100",
    ul: "group relative flex max-h-[200px] w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden rounded bg-white p-0 py-1 transition-all dark:bg-dark-800 ",
    li: "flex w-full cursor-pointer items-center gap-x-2 px-6 py-[0.15rem] outline-none",
    description: "text-default-400 dark:text-dark-300",
    errorMessage: "text-error dark:text-error-300",
    divider: "ml-3 w-full border-t border-default-200 py-1 dark:border-dark-600",
    section: "px-4 font-bold dark:text-dark-50",
  },
  variants: {
    elevated: {
      true: { ul: "shadow-md dark:shadow-dark-800" },
    },
    hoverBg: {
      true: "",
    },
    hasBorder: {
      true: {
        ul: "outline-focused border border-default-200 dark:border-dark-600",
      },
      false: { ul: "" },
    },
    isFocusVisible: {
      true: { li: "" },
      false: { li: "" },
    },
    isSelected: {
      true: { li: "" },
      false: { li: "" },
    },
    isDisabled: {
      true: { li: "" },
      false: { li: "" },
    },

    size: {
      xs: {
        ul: "text-xs",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
      },
      sm: {
        ul: "text-xs",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
      },
      md: {
        ul: "text-sm",
        label: "text-sm",
        description: "text-xs",
        errorMessage: "text-xs",
      },
      lg: {
        ul: "text-base",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
      },
      xl: {
        ul: "text-base",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
      },
    },
  },
  compoundSlots: [
    {
      class: "text-default-800 hover:font-bold hover:text-primary-400 dark:text-dark-200 dark:hover:text-primary-300",
      slots: ["li"],
      isDisabled: false,
      isSelected: false,
    },
    {
      class: "hover:bg-default-100 dark:hover:bg-dark-700",
      slots: ["li"],
      isDisabled: false,
      isSelected: false,
      hoverBg: true,
    },
    {
      class: "bg-primary text-default-300 text-white dark:bg-primary-400 dark:text-white",
      slots: ["li"],
      isDisabled: false,
      isSelected: true,
    },
    {
      class: "cursor-default text-default-300 dark:text-dark-500",
      slots: ["li"],
      isDisabled: true,
    },
    {
      class: "font-bold text-primary-400 dark:text-primary-300",
      slots: ["li"],
      isFocusVisible: true,
      isDisabled: false,
      isSelected: false,
    },
    {
      class: "bg-default-100 dark:bg-dark-700",
      slots: ["li"],
      isFocusVisible: true,
      isDisabled: false,
      isSelected: false,
      hoverBg: true,
    },
    {
      class: "font-bold",
      slots: ["li"],
      isFocusVisible: true,
      isDisabled: false,
      isSelected: true,
    },
  ],
});

const { li, base, ul, divider: div, section: s, label: l, description: d, errorMessage: em } = listbox();

export interface IListBoxProps<T> extends Omit<AriaListBoxProps<T>, "onSelectionChange"> {
  selectionMode: "multiple" | "single";
  onChange?: (keys: string[]) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  description?: string;
  errorMessage?: string;
  listBoxRef?: React.RefObject<HTMLUListElement>;
  className?: string;
  hasBorder?: boolean;
  state?: any;
  hoverBg?: boolean;
  elevated?: boolean;
  classNames?: {
    label?: string;
    inner?: string;
    description?: string;
    errorMessage?: string;
    ul?: string;
    li?: string;
  };
}

/**
 * Um componente ListBox em React é uma interface de usuário que exibe uma lista de itens onde os usuários podem selecionar uma ou várias opções. Ele geralmente é usado em formulários ou em situações onde é necessário escolher entre várias opções.
 * 
  ```tsx
  <ListBox>
    <ListBox.Item key={"pri"}>1º Item</ListBox.Item>
    <ListBox.Item key={"seg"}>2º Item</ListBox.Item>
    <ListBox.Item key={"ter"}>3º Item</ListBox.Item>
    <ListBox.Item key={"qua"}>4º Item</ListBox.Item>
    <ListBox.Section title="Últimos">
      <ListBox.Item key={"qui"}>5º Item</ListBox.Item>
      <ListBox.Item key={"sex"}>6º Item</ListBox.Item>
      <ListBox.Item key={"set"}>7º Item</ListBox.Item>
      <ListBox.Item key={"oit"}>8º Item</ListBox.Item>
    </ListBox.Section>
  </ListBox>
  ```
 */
const ListBox = <T extends object>({
  description,
  size = "md",
  hasBorder = true,
  className,
  classNames,
  errorMessage,
  onChange,
  hoverBg = false,
  state: newState,
  elevated,
  ...props
}: IListBoxProps<T>) => {
  let ref = React.useRef<HTMLUListElement>(null);
  let { listBoxRef = ref } = props;

  let state = newState
    ? newState
    : useListState({
        ...props,
        onSelectionChange: (keys) => {
          onChange && onChange(keys == "all" ? [] : [...keys].map((key) => String(key)));
          return keys;
        },
      });

  let { listBoxProps, labelProps } = useListBox({ ...props }, state, ref);

  return (
    <div className={base({ size, class: className })}>
      {props.label && (
        <div {...labelProps} className={l({ size, class: classNames?.label })}>
          {props.label}
        </div>
      )}

      <ul ref={listBoxRef} {...listBoxProps} className={ul({ size, hasBorder, class: classNames?.ul, elevated })}>
        {[...state.collection].map((item) =>
          item.type === "section" ? (
            <ListBoxSection
              hoverBg={hoverBg}
              className={classNames?.li}
              size={size}
              key={item.key}
              section={item}
              state={state}
            />
          ) : (
            <Option hoverBg={hoverBg} className={classNames?.li} size={size} key={item.key} item={item} state={state} />
          ),
        )}
      </ul>

      {description && <span className={d({ size, class: classNames?.description })}>{description}</span>}
      {errorMessage && <span className={em({ size, class: classNames?.errorMessage })}>{errorMessage}</span>}
    </div>
  );
};

function Option({
  item,
  state,
  size,
  className,
  hoverBg,
}: {
  item: Node<Object>;
  state: ListState<Object>;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  hoverBg?: boolean;
}) {
  let ref = React.useRef(null);
  let { optionProps, isSelected, isDisabled, isFocusVisible } = useOption({ key: item.key }, state, ref);

  let { focusProps } = useFocusRing();

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      className={li({ class: className, isFocusVisible, isSelected, isDisabled, size, hoverBg })}
      ref={ref}
      data-focus-visible={isFocusVisible}
    >
      {item.rendered}
    </li>
  );
}

function ListBoxSection({
  section,
  state,
  size,
  className,
  hoverBg,
}: {
  section: Node<Object>;
  state: ListState<Object>;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  hoverBg: boolean;
}) {
  let { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  });

  return (
    <>
      {section.key !== state.collection.getFirstKey() && <li role="presentation" className={div({ class: "" })} />}
      <li {...itemProps}>
        {section.rendered && (
          <span {...headingProps} className={s({ class: "" })}>
            {section.rendered}
          </span>
        )}
        <ul {...groupProps} className="w-full">
          {[...section.childNodes].map((node) => (
            <Option hoverBg={hoverBg} className={className} size={size} key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  );
}

ListBox.Item = Item;
ListBox.Section = Section;
export default ListBox;
