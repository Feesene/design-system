"use client";

import React, { useImperativeHandle } from "react";
import { useButton, AriaButtonProps, useFocusRing, mergeProps, PressEvent } from "react-aria";
import { tv } from "tailwind-variants";
import Icon from "../Media/Icon";
import { flushSync } from "react-dom";

const buttoTheme = tv({
  slots: {
    base: "group flex h-8 w-8 items-center justify-center rounded-full text-warning-600 transition-all duration-300 hover:text-warning-500",
    icon: "",
  },
  variants: {
    isFocusVisible: {
      true: {
        base: "outline-focused",
      },
      false: {
        base: "outline-[0]",
      },
    },
    isFocused: {
      true: {
        base: "outline-none",
      },
    },
    isDisabled: {
      true: { base: "cursor-default shadow-none" },
    },
    isPressed: {
      true: { base: "!outline-offset-0 !outline-default-900 transition-none dark:!outline-default-100" },
    },
  },
});

export interface IButtonThemeProps extends Omit<AriaButtonProps, "onPress"> {
  onPress?: ({ event, newTheme }: { event: PressEvent; newTheme: string }) => void;
  className?: string;
  classNames?: { icon: string };
  theme?: string;
}

const { base, icon: i } = buttoTheme();

/**
 * O componente ButtonTheme é um botão personalizado em React, que muda o ícone conforme o tema (claro ou escuro) e oferece suporte a animações durante a transição da visualização.
 * 
 * Funcionamento básico:
 * 
 ```tsx
  const [theme, setTheme] = useState<string>("light");
    
    return (
      <ButtonTheme
        theme={theme}
        onPress={({ newTheme }) => {
          setTheme(newTheme);
        }}
      />
    );
  ```
 * 
 */
const ButtonTheme = React.forwardRef<HTMLButtonElement, IButtonThemeProps>(
  ({ children, theme, classNames, isDisabled = false, className, ...props }, refB) => {
    const ref = React.useRef<HTMLButtonElement | null>(null);

    const { isFocused, focusProps } = useFocusRing();

    useImperativeHandle(refB, () => ref.current as HTMLButtonElement);

    const handleOnPress = async (e: PressEvent) => {
      const newTheme = theme == "light" ? "dark" : "light";

      if ("startViewTransition" in document) {
        const newdocument: any = document;
        await newdocument.startViewTransition(() => {
          flushSync(() => {
            props && props.onPress && props.onPress({ event: e, newTheme });
          });
        }).ready;

        const divRef: any = ref.current;

        const { top, left, width, height } = divRef?.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;
        const right = window.innerWidth - left;
        const bottom = window.innerHeight - top;
        const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
          },
          {
            duration: 600,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      } else {
        props && props.onPress && props.onPress({ event: e, newTheme });
      }
    };

    const { buttonProps, isPressed } = useButton(
      {
        ...props,
        onPress: handleOnPress,
      },
      ref,
    );

    return (
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={base({
          isFocusVisible: true,
          isFocused,
          isDisabled,
          isPressed,
          class: className,
        })}
      >
        <Icon
          size={"md"}
          name={theme == "light" ? "PiSunFill" : "PiMoonFill"}
          className={i({ class: classNames?.icon })}
        />

        {children}
      </button>
    );
  },
);

export default ButtonTheme;
