import React from "react";
import { tv } from "tailwind-variants";

const image = tv({});

export interface IImageProps extends React.ComponentProps<"img"> {
  as?: any;
}

/**
 * O componente Image é um elemento React utilizado para exibir imagens em uma aplicação.
 */
const Image = ({ as, className, ...props }: IImageProps) => {
  if (as) {
    const AS = as;
    return <AS {...props} className={image({ class: className })} />;
  }

  return <img {...props} className={image({ class: className })} />;
};

export default Image;
