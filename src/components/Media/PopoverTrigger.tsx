"use client";

import React, { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { Placement, useButton, useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState, OverlayTriggerProps } from "react-stately";
import Popover, { IPopoverProps } from "./Popover";
import { Slot } from "@radix-ui/react-slot";

const popover = tv({
  slots: {
    base: "p-2",
    button: "",
  },
  variants: {
    showFocus: {
      true: { button: "outline-focused transition-all" },
      false: { button: "outline-none" },
    },
    isActive: {
      true: { base: "flex" },
      false: { base: "hidden" },
    },
  },
});

export interface IPopoverTriggerProps extends OverlayTriggerProps {
  children: React.ReactNode;
  placement?: Placement;
  arrow?: boolean;
  popover: ReactElement;
  popoverProps?: Partial<IPopoverProps>;
  className?: string;
  classNames?: { button?: string };
  asChild?: boolean;
  showFocus?: boolean;
}

const { base, button: b } = popover();

const PopoverTrigger = ({
  children,
  placement = "bottom",
  arrow,
  className,
  popover,
  popoverProps,
  classNames,
  asChild,
  showFocus = false,
  ...props
}: IPopoverTriggerProps) => {
  let ref = React.useRef(null);
  let state = useOverlayTriggerState(props);
  let { triggerProps, overlayProps } = useOverlayTrigger({ type: "dialog" }, state, ref);

  let { buttonProps } = useButton(
    {
      ...triggerProps,
      elementType: "div",
    },
    ref,
  );

  const Comp = asChild ? Slot : "div";

  return (
    <>
      <Comp {...buttonProps} ref={ref} className={b({ class: classNames?.button, showFocus })}>
        {children}
      </Comp>

      {state.isOpen && (
        <Popover
          placement={placement}
          className={base({ class: className, isActive: state.isOpen })}
          arrow={arrow}
          {...props}
          triggerRef={ref}
          state={state}
          {...popoverProps}
        >
          {React.cloneElement(popover, overlayProps)}
        </Popover>
      )}
    </>
  );
};

export default PopoverTrigger;
