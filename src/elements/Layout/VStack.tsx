import React from "react";
import Stack, { IStackProps, stack } from "./Stack";
import { tv } from "tailwind-variants";

const vstack = tv({
  extend: stack,
});

export interface IVStackProps extends Omit<IStackProps, "ref"> {}

const VStack = React.forwardRef<HTMLDivElement, IStackProps>(
  (
    {
      children,
      flex = true,
      flexDirection = "col",
      justifyContent,
      alignItems,
      gap,
      className,
      ...props
    }: IVStackProps,
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
        className={vstack({ flex, flexDirection, justifyContent, alignItems, gap, class: className })}
      >
        {children}
      </Stack>
    );
  },
);

export default VStack;
