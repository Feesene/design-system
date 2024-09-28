"use client";

import React, { useRef } from "react";
import { tv } from "tailwind-variants";
import { AriaGridListProps, mergeProps, useGridList, useGridListItem, useGridListSelectionCheckbox } from "react-aria";
import { Item, useListState } from "react-stately";
import Checkbox from "./Checkbox";

const listView = tv({
  slots: {
    ul: "rounded-md",
    li: "group pb-1 outline-none",
    inner: "flex flex-row gap-1",
    input: "",
    label: "",
  },
  variants: {},
});

const { ul, li, inner, input, label } = listView();

export interface IListViewProps<t> extends AriaGridListProps<t> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  classNames?: {
    li?: string;
    inner?: string;
    input?: string;
    label?: string;
  };
  children: any;
  autoFocus?: boolean;
}

/**
 *
 */
const ListView = ({ size = "md", className, classNames, autoFocus, ...props }: IListViewProps<any>) => {
  let state = useListState(props);
  let ref = useRef<HTMLUListElement | null>(null);
  let { gridProps } = useGridList({ ...props, "aria-label": props["aria-label"] || "list" }, state, ref);

  return (
    <ul {...gridProps} ref={ref} className={ul({ class: className })} autoFocus>
      {[...state.collection].map((item, index) => (
        <ListItem
          key={item.key}
          index={index}
          item={item}
          state={state}
          classNames={classNames}
          size={size}
          autoFocus={autoFocus}
        />
      ))}
    </ul>
  );
};

function ListItem({
  item,
  state,
  classNames,
  size,
  index,
  autoFocus,
}: {
  item: any;
  state: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  classNames?: { li?: string; inner?: string; input?: string; label?: string };
  index?: number;
  autoFocus?: boolean;
}) {
  let ref = React.useRef(null);
  let { rowProps, gridCellProps } = useGridListItem({ node: item }, state, ref);
  let { checkboxProps } = useGridListSelectionCheckbox({ key: item.key }, state);

  return (
    <li {...mergeProps(rowProps)} ref={ref} className={li({ class: classNames?.li })}>
      <div {...gridCellProps} className={inner({ class: classNames?.inner })}>
        <Checkbox
          autoFocus={index == 0 && autoFocus ? true : false}
          classNames={{ input: input({ class: classNames?.input }), label: label({ class: classNames?.label }) }}
          color="primary"
          size={size}
          {...checkboxProps}
          onChange={() => {}}
        >
          {item.rendered}
        </Checkbox>
      </div>
    </li>
  );
}

ListView.Option = Item;

export default ListView;
