"use client";

import React, { useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { useTab, useTabList, AriaTabListProps, useFocusRing, mergeProps } from "react-aria";
import { Item, useTabListState } from "react-stately";

const tablist = tv({
  slots: {
    base: "relative z-0 inline-block border border-default-200 bg-default-100 px-0 py-1 dark:border-dark-500 dark:bg-dark-800",
    inner: "tab-selection absolute bottom-0 left-0 right-0 top-0 px-4 py-4",
    tabList: "inline-flex",
    tab: "cursor-pointer text-center text-default-500 outline-none transition-colors",
  },
  variants: {
    size: {
      xs: {
        tab: "px-3 text-xs",
        tabList: "py-1",
      },
      sm: {
        tab: "px-4 text-sm",
      },
      md: {
        tab: "px-5 text-base",
      },
      lg: {
        tab: "px-5 py-1 text-lg",
      },
      xl: {
        tab: "px-6 py-1 text-xl",
      },
    },
    type: {
      boxed: {
        base: "rounded-md",
        inner: "rounded-md",
      },
      rounded: {
        base: "rounded-full",
        inner: "rounded-full",
      },
    },
    isFocusVisible: {
      true: {
        inner:
          "after:absolute after:bottom-[-1px] after:left-[-1px] after:right-[-1px] after:top-[-1px] after:rounded-md after:outline-dashed after:outline-1 after:outline-offset-[3px] after:outline-default-200",
      },
    },
    isBlock: {
      true: {
        base: "w-full",
        inner: "",
        tabList: "w-full",
        tab: "w-full",
      },
    },
    color: {
      primary: {
        inner: "bg-primary",
      },
      secondary: {
        inner: "bg-secondary dark:bg-secondary-600",
      },
      success: {
        inner: "bg-success-500 dark:bg-success-400",
      },
      info: {
        inner: "bg-info-600 dark:bg-info-500",
      },
      warning: {
        inner: "bg-warning-500 dark:bg-warning-400",
      },
      error: {
        inner: "bg-error-500 dark:bg-error-400",
      },
    },
    isSelected: {
      true: {
        tab: "text-white",
      },
      false: {
        tab: "hover:text-default-900 dark:hover:text-dark-100",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-60",
      },
    },
  },
});

export interface ITabListProps<T> extends AriaTabListProps<T> {
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "error";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  type?: "boxed" | "rounded";
  className?: string;
  classNames?: {
    inner?: string;
    tab?: string;
    tabList?: string;
  };
  isBlock?: boolean;
}

const { base, inner, tab, tabList: t } = tablist();

/**
 * O componente TabList é uma implementação em React de uma lista de abas ou guias que permite aos usuários alternar entre diferentes seções de conteúdo em uma aplicação
 *
 * ```tsx
 *<TabList {...props}>
 *  <TabList.Item key="value">name</TabList.Item>
 *  <TabList.Item key="value">name</TabList.Item>
 *</TabList>
 * ```
 */
const TabList = ({
  className,
  classNames,
  size = "sm",
  type = "boxed",
  color = "primary",
  isBlock,
  ...props
}: ITabListProps<Object>) => {
  let state = useTabListState(props);
  let ref = useRef<any>();
  let { tabListProps } = useTabList(props, state, ref);

  let [activeTabStyle, setActiveTabStyle] = useState({
    width: 0,
    transform: "translateX(0)",
  });

  useEffect(() => {
    let activeTab = ref.current.querySelector('[role="tab"][aria-selected="true"]');
    setActiveTabStyle({
      width: activeTab?.offsetWidth,
      transform: `translateX(${activeTab?.offsetLeft}px)`,
    });
  }, [state.selectedKey, size, isBlock]);

  let { focusProps, isFocusVisible } = useFocusRing({
    within: true,
  });

  return (
    <div className={base({ class: className, size, isBlock, type, isDisabled: props.isDisabled })}>
      <div
        className={inner({
          class: classNames?.inner,
          type,
          isFocusVisible,
          color,
          size,
          isDisabled: props.isDisabled,
        })}
        style={{ zIndex: -1, ...activeTabStyle }}
      />
      <div
        {...mergeProps(tabListProps, focusProps)}
        ref={ref}
        className={t({ class: classNames?.tabList, size, isBlock })}
      >
        {[...state.collection].map((item) => (
          <Tab key={item.key} isBlock={isBlock} item={item} state={state} size={size} className={classNames?.tab} />
        ))}
      </div>
    </div>
  );
};

TabList.Item = Item;

function Tab({ item, state, size, isBlock, className }: any) {
  let ref = useRef<any>();
  let { tabProps, isSelected } = useTab(item, state, ref);

  return (
    <div {...tabProps} ref={ref} className={tab({ class: className, isBlock, isSelected, size })}>
      {item.props.children}
    </div>
  );
}

export default TabList;
