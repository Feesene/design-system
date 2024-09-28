"use client";

import React from "react";
import Heading from "../../elements/Typography/Heading";
import VStack from "../../elements/Layout/VStack";
import Text from "../../elements/Typography/Text";
import Illustration from "../../elements/Media/Illustration";

export interface IPageNotAuth {
  message: string;
  children?: React.ReactNode;
  header?: React.ReactNode;
}

/**
 * Página padrão para página de não autorizado
 */
const PageNotAuth = ({ message, header, children }: IPageNotAuth) => {
  return (
    <VStack className="h-full w-full">
      {header}
      <VStack justifyContent="center" alignItems="center" className="h-full w-full">
        <Heading color="default" className="animate-fade">
          Não autorizado !
        </Heading>
        <Illustration image="error-401" className="animate-jump-in" />
        <Text size="lg" weight="bold" color="error">
          {message}
          <br />
          {children}
        </Text>
      </VStack>
    </VStack>
  );
};

export default PageNotAuth;
