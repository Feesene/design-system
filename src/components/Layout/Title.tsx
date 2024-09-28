"use client";

import React from "react";
import HStack from "../../elements/Layout/HStack";
import Heading from "../../elements/Typography/Heading";

export interface ITitle {
  title?: string;
  children?: React.ReactNode;
}

const Title = ({ title, children }: ITitle) => {
  return (
    <HStack justifyContent="between" alignItems="center" className="h-12 w-full">
      <Heading color="default" size="sm">
        {title || " "}
      </Heading>
      <HStack className="gap-2">{children}</HStack>
    </HStack>
  );
};

export default Title;
