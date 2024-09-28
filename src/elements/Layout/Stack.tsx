import React from "react";
import { tv } from "tailwind-variants";

export const stack = tv({
  variants: {
    flex: {
      true: "flex",
      "1": "flex flex-1",
    },
    flexDirection: {
      row: "flex-row",
      col: "flex-col",
    },
    justifyContent: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    alignItems: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      4: "gap-4",
      8: "gap-8",
      16: "gap-16",
      32: "gap-32",
      64: "gap-64",
      128: "gap-128",
    },
    bg: {
      background: "bg-default-50 dark:bg-dark-800",
      surface: "bg-white dark:bg-dark-700",
    },
  },
});

export interface IStackProps extends Omit<React.ComponentProps<"div">, "ref"> {
  flex?: true | "1";
  flexDirection?: "row" | "col";
  justifyContent?: "start" | "center" | "end" | "between" | "around" | "evenly";
  alignItems?: "start" | "center" | "end" | "baseline";
  gap?: 0 | 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128;
  bg?: "background" | "surface";
}

const Stack = React.forwardRef<HTMLDivElement, IStackProps>(
  ({ children, flex, flexDirection, justifyContent, alignItems, gap, className, bg, ...props }: IStackProps, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={stack({
          flex,
          bg,
          flexDirection,
          justifyContent,
          alignItems,
          gap,
          class: className,
        })}
      >
        {children}
      </div>
    );
  },
);

export default Stack;
