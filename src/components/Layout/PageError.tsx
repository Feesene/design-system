"use client";

import React from "react";
import Heading from "../../elements/Typography/Heading";
import VStack from "../../elements/Layout/VStack";
import Text from "../../elements/Typography/Text";
import Illustration from "../../elements/Media/Illustration";
import HStack from "../../elements/Layout/HStack";
import { tv } from "tailwind-variants";
import Link from "../../elements/Form/Link";

export interface IPageError {
  title?: string;
  message: string;
  children?: React.ReactNode;
  header?: React.ReactNode;
  link?: any;
  href?: string;
  className?: string;
  classNames?: {
    link?: string;
    image?: string;
  };
}

const css = tv({
  slots: {
    base: "relative h-full w-full max-mobile:flex-col",
    image: "size-[500px] animate-jump-in",
    link: "absolute max-mobile:relative max-mobile:w-full max-mobile:text-right mobile:bottom-8 mobile:right-8",
  },
});

const { base, image, link: l } = css();

/**
 * Página padrão para página de erro no sistema
 */
const PageError = ({ message, title, classNames, header, className, children }: IPageError) => {
  return (
    <VStack className="h-full w-full">
      {header}
      <HStack justifyContent="center" alignItems="center" className={base({ class: className })}>
        <Illustration image="error-500" className={image({ class: classNames?.image })} />
        <VStack alignItems="start" className="w-2/6 animate-fade max-mobile:w-full">
          <Heading color="default" className="w-full">
            {title || "Algo deu errado..."}
          </Heading>
          <Text size="lg" weight="bold" color="error" className="mt-2">
            {message}
            <br />
            {children}
          </Text>
        </VStack>
        <Link
          onPress={() => {
            if (typeof window !== "undefined") {
              location.reload();
            }
          }}
          color="primary"
          className={l({ class: classNames?.link })}
        >
          Recarregar a página
        </Link>
      </HStack>
    </VStack>
  );
};

export default PageError;
