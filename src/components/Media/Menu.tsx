"use client";

import { useTreeState } from "react-stately";
import { useMenu, useMenuItem } from "react-aria";
import React from "react";
import { tv } from "tailwind-variants";

const menu = tv({
  slots: {
    ul: "w-fit py-2 outline-none",
    li: "cursor-pointer outline-none",
  },
  variants: {
    isFocused: {
      true: { li: "bg-default-100/60 dark:bg-dark-700" },
    },
  },
});

const { ul, li } = menu();

export const Menu = (props: any) => {
  let state = useTreeState(props);

  let ref = React.useRef(null);
  let { menuProps } = useMenu(props, state, ref);

  return (
    <ul {...menuProps} ref={ref} className={ul({ class: props.classNameMenu })}>
      {[...state.collection].map((item, i) => {
        let refItem = React.useRef(null);
        let { menuItemProps, isFocused } = useMenuItem({ key: item.key }, state, refItem);

        return (
          <li
            key={i}
            {...menuItemProps}
            ref={refItem}
            className={li({
              isFocused,
              class: props.classNameMenuItem,
            })}
          >
            {item.rendered}
          </li>
        );
      })}
    </ul>
  );
};
