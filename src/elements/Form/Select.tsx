"use client";

import React, { useEffect, useState, FC, PropsWithChildren, ReactElement, useRef } from "react";
import { useSelect, AriaSelectProps, HiddenSelect, useButton } from "react-aria";
import { tv } from "tailwind-variants";
import { Item, useSelectState } from "react-stately";
import Icon, { IconNames } from "../Media/Icon";
import { MdKeyboardArrowUp } from "react-icons/md";
import Spinner from "../../components/Media/Spinner";
import Popover from "../../components/Media/Popover";
import Text from "../Typography/Text";

import type { AriaListBoxOptions } from "react-aria";
import { ListState } from "react-stately";
import { mergeProps, useFocusRing, useListBox, useOption } from "react-aria";

export type IMenuItem = {
  id: string | number;
  title: string;
};

export const mapToAriaProps = (ariaLabel: string, menuBlocks: IMenuItem[]) => ({
  "aria-label": ariaLabel,
  children: menuBlocks.map(({ id, title }) => <Item key={id}>{title}</Item>),
});

const getActiveItem = (blocks: IMenuItem[], activeId: string | number): IMenuItem | null => {
  return (
    blocks.find(({ id }) => {
      return id.toString() === activeId.toString();
    }) || null
  );
};

const select = tv({
  slots: {
    base: "flex w-full flex-col gap-[0.10rem]",
    label: "text-default-700 !font-normal dark:text-dark-100",
    placeHolder: "w-11/12 text-start",
    inner:
      "outline-focused group flex w-full items-center justify-center gap-3 rounded border border-default-200 bg-white px-3 py-1 text-default-900 transition-all duration-300 hover:border-default-300 hover:focus-within:border-default-200 dark:border-dark-500 dark:bg-dark-700 dark:text-dark-100 dark:hover:focus-within:border-dark-400",
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
        inner: "h-6 text-xs",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
        icon: "h-3 w-3",
        arrowIcon: "h-3 w-3",
      },
      sm: {
        inner: "h-8 text-xs",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
        icon: "h-4 w-4",
        arrowIcon: "h-4 w-4",
      },
      md: {
        inner: "h-10 text-sm",
        label: "text-sm",
        description: "text-xs",
        errorMessage: "text-xs",
        icon: "h-5 w-5",
        arrowIcon: "h-5 w-5",
      },
      lg: {
        inner: "h-12 text-base",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
        icon: "h-6 w-6",
        arrowIcon: "h-6 w-6",
      },
      xl: {
        inner: "h-14 text-base",
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
        placeHolder: "text-default-300 dark:text-dark-300",
        inner: "cursor-default bg-default-50 text-default-300 dark:bg-dark-600 dark:text-dark-300 ",
        icon: "text-default-300 group-focus-within:text-default-300 dark:text-dark-300",
        arrowIcon: "text-default-300 dark:text-dark-300",
      },
    },
    opened: {
      true: {
        arrowIcon: "rotate-180",
      },
    },
    isBlock: {
      true: "w-full",
    },
    icon: {},
  },
});

const { base, placeHolder, label: l, inner, description: d, errorMessage: em, icon, arrowIcon } = select();

export interface ISelectProps<T> extends Omit<AriaSelectProps<T>, "children"> {
  children?: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  leftIcon?: IconNames;
  isBlock?: boolean;
  loading?: boolean;
  isDisabled?: boolean;
  activeItemId?: any;
  onChange?: (key: React.Key) => any;
  menuBlocks: IMenuItem[];
  errorMessage?: string;
  className?: string;
  elevated?: boolean;
  classNames?: {
    label?: string;
    inner?: string;
    description?: string;
    errorMessage?: string;
    icon?: string;
    popover?: string;
  };
}

/**
 * @deprecated
 */
const Select = ({
  children,
  size = "md",
  isDisabled = false,
  activeItemId,
  menuBlocks,
  onChange,
  isBlock = false,
  errorMessage,
  loading = false,
  description,
  placeholder = "Selecione uma opção",
  leftIcon,
  className,
  classNames,
  elevated,
  ...props
}: Omit<ISelectProps<any>, "selectedKey">) => {
  const ref = React.useRef<any>(null);
  const [width, setWidth] = useState<number>(100);

  const activeItem = !!activeItemId ? getActiveItem(menuBlocks, String(activeItemId)) : null;
  const propsWithChildren = mapToAriaProps("Select", menuBlocks);

  let state = useSelectState({
    ...propsWithChildren,
    defaultSelectedKey: activeItemId,
    onSelectionChange: (key) => onChange && onChange(key),
  });

  let { labelProps, triggerProps, valueProps, menuProps, errorMessageProps, descriptionProps } = useSelect(
    props,
    state,
    ref,
  );

  useEffect(() => {
    ref && ref.current && ref.current.offsetWidth && setWidth(ref.current.offsetWidth);
  }, [ref]);

  const { buttonProps } = useButton(triggerProps, ref);

  const { isOpen } = state;

  useEffect(() => {
    state.setSelectedKey(activeItemId as string);
  }, [activeItemId]);

  return (
    <div className={base({ isBlock, isDisabled, class: className })}>
      {props.label && (
        <label {...labelProps} className={l({ size, class: classNames?.label })}>
          {props.label}
        </label>
      )}
      <HiddenSelect isDisabled={isDisabled} state={state} triggerRef={ref} label={props.label} name={props.name} />
      <button
        {...buttonProps}
        className={inner({ size, isDisabled, class: classNames?.inner, isBlock, elevated })}
        ref={ref}
        color="info"
      >
        {leftIcon ? <Icon name={leftIcon} className={icon({ size, isDisabled, class: classNames?.icon })} /> : null}
        {!activeItem?.title && (
          <Text className={placeHolder({ isDisabled })} {...valueProps}>
            {placeholder}
          </Text>
        )}
        {activeItem && activeItem.title && (
          <span className={placeHolder({ isDisabled })} {...valueProps}>
            {activeItem?.title}
          </span>
        )}
        {!loading && <MdKeyboardArrowUp className={arrowIcon({ size, opened: isOpen, isDisabled })} />}

        {loading && <Spinner size="xs" />}
      </button>
      {isOpen && !isDisabled && (
        <Popover width={width} state={state} triggerRef={ref} placement="bottom" className={classNames?.popover}>
          <ListBox {...menuProps} state={state} menuBlocks={menuBlocks} />
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

export default Select;

const getKeyItemRecord = <T extends IMenuItem>(items: T[]): Record<string, T> => {
  return items.reduce<Record<string, T>>((previous, item) => ({ ...previous, [item.id]: item }), {});
};

const listbox = tv({
  slots: {
    ul: "max-h-[300px] overflow-y-auto p-0 text-left",
    li: "dark:hover-primary-300 flex cursor-pointer items-center gap-x-2 px-4 py-1 text-error transition-colors hover:bg-primary hover:text-white dark:hover:text-white",
  },
  variants: {
    isFocusVisible: {
      true: { ul: "outline-2 outline-blue-500", li: "outline-primary-300" },
      false: { ul: "outline-none", li: "outline-none" },
    },
    isSelected: {
      true: { li: "text-primary dark:text-primary-400" },
      false: { li: "text-default-700 dark:text-dark-100" },
    },
  },
});

const { ul, li } = listbox();

interface IListBoxProps extends AriaListBoxOptions<unknown> {
  menuBlocks: IMenuItem[];
  state: ListState<unknown>;
  ariaLabel?: string;
  listBoxRef?: React.RefObject<HTMLUListElement>;
}

const ListBox = (props: IListBoxProps): ReactElement<IListBoxProps> => {
  const ref = useRef<HTMLUListElement | null>(null);
  let { listBoxRef = ref, state } = props;
  const keyItemRecord = getKeyItemRecord(props.menuBlocks);

  const { isFocusVisible, focusProps } = useFocusRing();
  const { listBoxProps } = useListBox(
    {
      ...props,
      "aria-label": props.ariaLabel,
    },
    props.state,
    listBoxRef,
  );
  //  {...mergeProps(listBoxProps, focusProps)}
  return (
    <ul {...listBoxProps} ref={ref} className={ul({ isFocusVisible })}>
      {[...props.state.collection].map((item) => (
        <MenuItem key={item.key} state={props.state} node={item} item={keyItemRecord[Number(item.key)]} />
      ))}
    </ul>
  );
};

type MenuItemProps = {
  state: ListState<unknown>;
  node: any;
  item: IMenuItem;
};

type MenuSectionProps = PropsWithChildren<{
  ariaLabel?: string;
}>;

const MenuItem: FC<MenuItemProps> = ({ state, item, node }) => {
  const { title } = item;
  const ref = useRef<HTMLLIElement | null>(null);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { optionProps, isSelected } = useOption(
    {
      key: node.key,
    },
    state,
    ref,
  );

  return (
    <li {...mergeProps(optionProps, focusProps)} ref={ref} className={li({ isFocusVisible, isSelected })}>
      {title}
    </li>
  );
};
