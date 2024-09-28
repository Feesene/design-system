"use client";

import React from "react";
import { tv } from "tailwind-variants";
import { DismissButton, Overlay, usePopover } from "react-aria";
import type { AriaPopoverProps } from "react-aria";
import type { OverlayTriggerState } from "react-stately";

const popover = tv({
  slots: {
    arrow: "absolute h-3 w-3 fill-white stroke-default-200 stroke-1 dark:fill-dark-800 dark:stroke-dark-600",
    base: "absolute z-[9997] animate-fade rounded-sm border border-default-200 bg-white shadow-lg animate-duration-300 dark:border-dark-600 dark:bg-dark-800 dark:text-default-50 dark:shadow-dark-800",
  },
  variants: {
    placement: {
      left: {
        base: "animate-flip-right",
        arrow: "left-full -translate-y-1/2 -rotate-90",
      },
      right: {
        base: "animate-flip-left",
        arrow: "right-full -translate-y-1/2 rotate-90",
      },
      top: {
        base: "animate-flip-up",
        arrow: "top-full -translate-x-1/2",
      },
      bottom: {
        base: "animate-flip-down",
        arrow: "bottom-full -translate-x-1/2 rotate-180",
      },
      center: "",
    },
  },
});

export interface IPopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode;
  state: OverlayTriggerState;
  arrow?: boolean;
  width?: number;
  className?: string;
  classNames?: {
    arrow?: string;
  };
  popoverRef?: React.RefObject<HTMLDivElement>;
}

const { arrow: a, base } = popover();

const Popover = ({ children, state, classNames, arrow, width, offset = 8, className, ...props }: IPopoverProps) => {
  const popoverRef = React.useRef(null);
  const { popoverProps, underlayProps, placement, arrowProps } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state,
  );

  return (
    <Overlay>
      <div {...underlayProps} />
      <div
        {...popoverProps}
        ref={popoverRef}
        style={{ width: width ? `${width}px` : undefined }}
        className={base({ class: className, placement })}
      >
        {arrow && (
          <svg
            {...arrowProps}
            className={a({ class: classNames?.arrow, placement })}
            data-placement={placement}
            viewBox="0 0 12 12"
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        )}
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};

export default Popover;
