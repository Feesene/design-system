import React from "react";
import Stack, { IStackProps, stack } from "./Stack";
import { tv } from "tailwind-variants";

const hstack = tv({
  extend: stack,
});

export interface IHStackProps extends Omit<IStackProps, "ref"> {}

const HStack = React.forwardRef<HTMLDivElement, IStackProps>(
  (
    {
      children,
      flex = true,
      flexDirection = "row",
      justifyContent,
      alignItems,
      gap,
      className,
      ...props
    }: IHStackProps,
    ref,
  ) => {
    return (
      <Stack
        {...props}
        ref={ref}
        flex={flex}
        flexDirection={flexDirection}
        justifyContent={justifyContent}
        alignItems={alignItems}
        gap={gap}
        className={hstack({ flex, flexDirection, justifyContent, alignItems, gap, class: className })}
      >
        {children}
      </Stack>
    );
  },
);

export default HStack;
