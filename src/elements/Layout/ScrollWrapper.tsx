import React from "react";
import { tv } from "tailwind-variants";

const scrollwrapper = tv({
  base: "",
  variants: {
    orientation: {
      vertical: "block overflow-y-auto",
      horizontal: "inline-block overflow-x-auto",
    },
  },
});

export interface IScrollWrapperProps extends Omit<React.ComponentProps<"div">, "ref"> {
  orientation?: "vertical" | "horizontal";
}

const ScrollWrapper = React.forwardRef<HTMLDivElement, IScrollWrapperProps>(
  ({ children, orientation = "vertical", className, ...props }: IScrollWrapperProps, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={scrollwrapper({
          class: className,
          orientation,
        })}
      >
        {children}
      </div>
    );
  },
);

export default ScrollWrapper;
