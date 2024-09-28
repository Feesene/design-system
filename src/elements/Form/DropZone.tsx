"use client";

import React from "react";
import { tv } from "tailwind-variants";
import Icon, { IconNames } from "../Media/Icon";
import { DropZone as DropZoneAria, DropZoneProps } from "react-aria-components";
import VStack from "../Layout/VStack";
import Text from "../Typography/Text";

const dropZone = tv({
  slots: {
    base: "flex w-fit flex-col gap-[0.10rem]",
    label: "text-default-700 dark:text-dark-100",
    inner:
      "outline-focused group flex h-full w-full items-center justify-center overflow-hidden border border-default-200 bg-white py-4 transition-all duration-300 dark:border-dark-500 dark:bg-dark-700",
    input:
      "h-full w-full bg-default-100 text-default-700 outline-none transition-all duration-300 file:mr-2 file:h-full file:rounded-sm file:border-none file:bg-white file:pr-2 file:text-default-950 file:outline-none file:transition-all file:duration-300 focus:outline-none dark:bg-dark-600 dark:text-dark-300 dark:file:bg-dark-700 dark:file:text-dark-100",
    description: "text-default-400 dark:text-dark-300",
    errorMessage: "text-error dark:text-error-300",
    icon: "mx-1 ml-3 text-default-400 group-focus-within:text-primary dark:group-focus-within:text-primary-400",
  },
  variants: {
    isDropTarget: { true: { inner: "border-primary" } },
    isHovered: { true: { inner: "border-primary" } },
    isDropped: { true: { inner: "border-primary" } },
    elevated: {
      true: { inner: "shadow-md dark:shadow-dark-800" },
    },
    size: {
      xs: {
        inner: "h-6",
        input: "text-xs",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
        icon: "h-3 w-3",
      },
      sm: {
        inner: "h-8",
        input: "text-xs",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
        icon: "h-4 w-4",
      },
      md: {
        inner: "h-10",
        input: "text-sm",
        label: "text-sm",
        description: "text-xs",
        errorMessage: "text-xs",
        icon: "h-5 w-5",
      },
      lg: {
        inner: "h-12",
        input: "text-base",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
        icon: "h-6 w-6",
      },
      xl: {
        inner: "h-14",
        input: "text-base",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
        icon: "h-7 w-7",
      },
    },
    rounded: {
      true: { inner: "rounded-full" },
      false: { inner: "rounded" },
    },
    isDisabled: {
      true: {
        inner: "",
        input: "",
      },
      false: {
        inner: "",
        input: "",
      },
    },
    isBlock: {
      true: { base: "w-full" },
    },
  },
});

const { base, label: l, inner, input, description: d, errorMessage: em, icon } = dropZone();

export interface IDropZoneProps extends DropZoneProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"; //AT
  leftIcon?: IconNames; //AT
  rounded?: boolean; //AT
  isBlock?: boolean; //AT
  className?: string;
  errorMessage?: string; //AT
  label?: string; //AT
  description?: string; //AT
  isDisabled?: boolean; //AT
  elevated?: boolean; //AT
  classNames?: {
    //AT
    label?: string;
    inner?: string;
    input?: string;
    description?: string;
    errorMessage?: string;
    icon?: string;
  };
}

/**
 *
 */
const DropZone = React.forwardRef<HTMLInputElement, IDropZoneProps>(
  (
    {
      size = "md",
      leftIcon = "MdCloudUpload",
      rounded = false,
      label,
      description,
      errorMessage,
      isBlock,
      className,
      classNames,
      isDisabled = false,
      elevated = false,
      ...props
    }: IDropZoneProps,
    ref,
  ) => {
    let [dropped, setDropped] = React.useState(false);

    return (
      <div className={base({ isBlock, class: "" })}>
        {label && <label className={l({ size, class: classNames?.label })}>{label}</label>}
        <div draggable className="border-2 border-default-500 w-fit cursor-pointer">
          <Icon color="contentPrimary" name="PiFile" size="lg"></Icon>
        </div>

        <DropZoneAria
          onDrop={(e) => {
            //AT VERIFICAR NO EVENTO SE EXISTE ARQUIVOS
            setDropped(true);
            console.log(e);
            props.onDrop && props.onDrop(e);
          }}
          className={({ isDropTarget, isFocusVisible, isFocused, isHovered }) =>
            inner({ class: "w-64", isDropTarget, isHovered, isDropped: dropped })
          }
          {...props}
        >
          <VStack justifyContent="center" alignItems="center" className="select-none">
            <Icon color="contentPrimary" name="PiCloudArrowUp"></Icon>
            <Text className="cursor-default">Arraste os arquivos aqui</Text>
          </VStack>
        </DropZoneAria>
        {description && <span className={d({ size, class: classNames?.description })}>{description}</span>}
        {errorMessage && <span className={em({ size, class: classNames?.errorMessage })}>{errorMessage}</span>}
      </div>
    );
  },
);

export default DropZone;
