"use client";

import React, { useImperativeHandle } from "react";
import { useButton, AriaButtonProps, useFocusRing, mergeProps } from "react-aria";
import { tv } from "tailwind-variants";

const base = tv({
  base: "flex w-fit items-center justify-center transition-all duration-300",
  variants: {
    isFocusVisible: {
      true: "outline-focused",
      false: "outline-[0] dark:outline-white",
    },
    isFocused: {
      true: "outline-none",
    },
    isPressed: {
      true: "!outline-offset-0 !outline-default-900 transition-none dark:!outline-default-100",
    },
  },
});

export interface IActionButtonProps extends AriaButtonProps {
  className?: string;
  hasFocus?: boolean;
}

/**
 * A principal função do componente ActionButton é criar um botão acessível e com pouca estilização em React,
 */
const ActionButton = React.forwardRef<HTMLButtonElement, IActionButtonProps>(
  ({ children, hasFocus = true, className, ...props }, refB) => {
    const ref = React.useRef<HTMLButtonElement | null>(null);
    const { buttonProps, isPressed } = useButton(props, ref);
    const { isFocusVisible, isFocused, focusProps } = useFocusRing();

    useImperativeHandle(refB, () => ref.current as HTMLButtonElement);

    return (
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={base({
          isFocusVisible: isFocusVisible && hasFocus,
          isFocused,
          isPressed,
          class: className,
        })}
      >
        {children}
      </button>
    );
  },
);

export default ActionButton;
