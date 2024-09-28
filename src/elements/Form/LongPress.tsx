"use client";

import React, { useImperativeHandle } from "react";
import { useButton, AriaButtonProps, useFocusRing, mergeProps, useLongPress, LongPressProps } from "react-aria";
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

export interface ILongPressProps extends AriaButtonProps, Omit<LongPressProps, "threshold"> {
  className?: string;
  hasFocus?: boolean;
  delay?: number;
}

/**
 * O componente LongPress é um botão customizado em React que utiliza funcionalidades da biblioteca react-aria para gerenciar acessibilidade e interações, como cliques e longos pressionamentos (long press).
 *
 *  ```tsx
    return (
      <LongPress
        onPress={() => {
          alert("Click normal");
        }}
        onLongPress={() => {
          alert("Click com delay !!!");
        }}
        onLongPressEnd={(event) => {
          console.log(event);
        }}
      >
        <Button color="primary" useButton={false}>
          LongPress
        </Button>
      </LongPress>
    )
 * ```
 *
 */
const LongPress = React.forwardRef<HTMLButtonElement, ILongPressProps>(
  (
    { children, hasFocus = true, delay = 500, className, onLongPress, onLongPressEnd, onLongPressStart, ...props },
    refB,
  ) => {
    const ref = React.useRef<HTMLButtonElement | null>(null);
    const { buttonProps, isPressed } = useButton(props, ref);
    const { isFocusVisible, isFocused, focusProps } = useFocusRing();

    const { longPressProps } = useLongPress({
      accessibilityDescription: "Pressione e segure",
      onLongPress,
      onLongPressStart,
      onLongPressEnd,
      threshold: delay,
    });

    useImperativeHandle(refB, () => ref.current as HTMLButtonElement);

    return (
      <button
        {...mergeProps(buttonProps, longPressProps, focusProps)}
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

export default LongPress;
