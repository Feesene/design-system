"use client";

import React from "react";
import { tv } from "tailwind-variants";
import Icon, { IconNames } from "../Media/Icon";

const fileInput = tv({
  slots: {
    base: "flex w-fit flex-col gap-[0.10rem]",
    label: "!font-normal text-default-700 dark:text-dark-100",
    inner:
      "outline-focused group flex h-full w-full items-center justify-center overflow-hidden border border-default-200 bg-white transition-all duration-300 dark:border-dark-500 dark:bg-dark-700",
    input:
      "h-full w-full bg-default-100 !font-normal text-default-700 outline-none transition-all duration-300 file:mr-2 file:h-full file:rounded-sm file:border-none file:bg-white file:pr-2 file:text-default-950 file:outline-none file:transition-all file:duration-300 focus:outline-none dark:bg-dark-600 dark:text-dark-300 dark:file:bg-dark-700 dark:file:text-dark-100",
    description: "text-default-400 dark:text-dark-300",
    errorMessage: "text-error dark:text-error-300",
    icon: "mx-1 ml-3 text-default-400 group-focus-within:text-primary dark:group-focus-within:text-primary-400",
  },
  variants: {
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
    //FIX FAZER PARA INPUT DEsABILITADO ! E SIZE TEXT DO INPUT | VARIANTE PEQUENA ?
    isDisabled: {
      true: {
        inner: "bg-default-50 dark:bg-dark-600",
        input:
          "bg-default-50 text-default-400 file:bg-default-50 file:text-default-500 dark:bg-dark-600 dark:text-dark-300 dark:file:bg-dark-600 dark:file:text-dark-300",
      },
      false: {
        inner:
          "hover:border-default-300 hover:focus-within:border-default-200 dark:hover:border-dark-400 dark:hover:focus-within:border-dark-400",
        input: "cursor-pointer file:cursor-pointer",
      },
    },
    isBlock: {
      true: { base: "w-full" },
    },
  },
});

const { base, label: l, inner, input, description: d, errorMessage: em, icon } = fileInput();

export interface IFileInputProps extends Omit<React.ComponentProps<"input">, "type" | "size" | "ref"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  leftIcon?: IconNames;
  rounded?: boolean;
  isBlock?: boolean;
  className?: string;
  errorMessage?: string;
  label?: string;
  description?: string;
  isDisabled?: boolean;
  elevated?: boolean;
  classNames?: {
    label?: string;
    inner?: string;
    input?: string;
    description?: string;
    errorMessage?: string;
    icon?: string;
  };
}

/**
 * O componente FileInput no React é utilizado para criar uma entrada de arquivo em um formulário dentro de uma aplicação React. Ele permite que os usuários selecionem arquivos do sistema local e os enviem para o aplicativo.
 */
const FileInput = React.forwardRef<HTMLInputElement, IFileInputProps>(
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
    }: IFileInputProps,
    ref,
  ) => {
    return (
      <div className={base({ isBlock, class: className })}>
        {label && <label className={l({ size, class: classNames?.label })}>{label}</label>}

        <div className={inner({ size, class: classNames?.inner, isDisabled, rounded, elevated })}>
          {leftIcon ? <Icon name={leftIcon} className={icon({ size, class: classNames?.icon, isDisabled })} /> : null}
          <input
            {...props}
            ref={ref}
            disabled={isDisabled}
            aria-label="Arquivo"
            className={input({ class: classNames?.input, size, isDisabled })}
            type={"file"}
          />
        </div>
        {description && <span className={d({ size, class: classNames?.description })}>{description}</span>}
        {errorMessage && <span className={em({ size, class: classNames?.errorMessage })}>{errorMessage}</span>}
      </div>
    );
  },
);

export default FileInput;
