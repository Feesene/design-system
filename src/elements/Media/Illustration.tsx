import React from "react";
import { tv } from "tailwind-variants";

const illustration = tv({
  base: "size-[400px] bg-contain bg-center bg-no-repeat",
  variants: {
    image: {
      "error-401": "image-error-401",
      "error-404": "image-error-404",
      "error-429": "image-error-429",
      "error-500": "image-error-500",
      empty: "image-empty",
      "login-web": "image-login-web",
    },
  },
});

export interface IIllustrationProps extends React.ComponentProps<"div"> {
  image: "error-401" | "error-404" | "error-429" | "error-500" | "empty" | "login-web";
}

/**
 * É um elemento React utilizado para exibir Ilustrações selecionadas na aplicação.
 */
const Illustration = ({ image, className, ...props }: IIllustrationProps) => {
  return <div {...props} className={illustration({ class: className, image })} />;
};

export default Illustration;
