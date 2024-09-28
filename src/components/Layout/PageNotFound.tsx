"use client";

import React from "react";
import Heading from "../../elements/Typography/Heading";
import VStack from "../../elements/Layout/VStack";
import HStack from "../../elements/Layout/HStack";
import Link from "../../elements/Form/Link";
import { tv } from "tailwind-variants";
import Illustration from "../../elements/Media/Illustration";

export interface IPageNotFound {
  link?: any;
  href?: string;
  className?: string;
  classNames?: {
    link?: string;
    image?: string;
  };
  header?: React.ReactNode;
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
 * Página padrão para página não encontrada
 */
const PageNotFound = ({ link, href = "/", header, className, classNames }: IPageNotFound) => {
  return (
    <VStack className="h-full w-full">
      {header}
      <HStack justifyContent="center" alignItems="center" className={base({ class: className })}>
        <Illustration image="error-404" className={image({ class: classNames?.image })} />
        <VStack alignItems="center" className="w-2/6 animate-fade max-mobile:w-full">
          <Heading color="default" weight="bold" className="text-center">
            Página não encontrada !
          </Heading>
          <Heading className="text-center" color="contentSecondary" size="xs" weight="light">
            Parece que não conseguimos encontrar essa página. Por favor, tente novamente ou entre em contato com um
            administrador se o problema persistir.
          </Heading>
        </VStack>
        <Link href={href} color="primary" as={link} className={l({ class: classNames?.link })}>
          Voltar para página inicial
        </Link>
      </HStack>
    </VStack>
  );
};

export default PageNotFound;
