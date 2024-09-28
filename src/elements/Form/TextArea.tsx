"use client";

import React from "react";
import { tv } from "tailwind-variants";
import { AriaTextFieldProps, useTextField } from "react-aria";

const textarea = tv({
  slots: {
    base: "flex w-fit flex-col gap-[0.10rem]",
    label: "!font-normal text-default-700 dark:text-dark-100",
    inner:
      "group flex w-full items-center justify-center gap-3 rounded border border-default-200 bg-white dark:border-dark-500 dark:bg-dark-700",
    input:
      "h-full w-full rounded bg-transparent px-3 py-1 !font-normal text-default-content outline-none placeholder:normal-case placeholder:text-default-300 dark:bg-transparent dark:text-dark-100 dark:placeholder:text-default-600",
    description: "text-default-400 dark:text-dark-300",
    errorMessage: "text-error dark:text-error-300",
  },
  variants: {
    transform: {
      lowercase: { input: "lowercase" },
      uppercase: { input: "uppercase" },
      capitalize: { input: "capitalize" },
      none: { input: "normal-case" },
    },
    elevated: {
      true: { inner: "shadow-md dark:shadow-dark-800" },
    },
    size: {
      xs: {
        inner: "",
        input: "text-xs",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
      },
      sm: {
        inner: "",
        input: "text-xs",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
      },
      md: {
        inner: "",
        input: "text-sm",
        label: "text-sm",
        description: "text-xs",
        errorMessage: "text-xs",
      },
      lg: {
        inner: "",
        input: "text-base",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
      },
      xl: {
        inner: "",
        input: "text-base",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
      },
    },
    isBlock: {
      true: "w-full",
    },
    isDisabled: {
      true: {
        inner: "bg-default-50 dark:bg-dark-600",
        input: "text-default-400 dark:text-dark-300",
      },
      false: {
        inner:
          "transition-all duration-300 hover:border-default-300 hover:focus-within:border-default-200 dark:hover:border-dark-400 dark:hover:focus-within:border-dark-400",
        input: "transition-all duration-300",
      },
    },
    isReadOnly: {
      true: {
        label: "!font-semibold text-default-900 dark:text-white",
        input: "cursor-default text-default-800",
        inner: "border-none bg-transparent dark:bg-transparent",
      },
      false: {
        inner: "outline-focused",
      },
    },
  },
});

const { base, label: l, inner, input, description: d, errorMessage: em } = textarea();

export interface ITextAreaProps extends AriaTextFieldProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isBlock?: boolean;
  className?: string;
  label?: string;
  description?: string;
  isDisabled?: boolean;
  errorMessage?: string;
  transform?: "uppercase" | "lowercase" | "capitalize" | "none";
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
 * O componente Textarea é uma caixa de texto expansível em uma aplicação React que permite aos usuários inserir e editar grandes blocos de texto.
 */
const TextArea = ({
  size = "md",
  placeholder,
  isDisabled,
  description,
  errorMessage,
  isBlock,
  className,
  classNames,
  transform = "uppercase",
  elevated = false,
  ...props
}: ITextAreaProps) => {
  let { label } = props;
  let ref = React.useRef(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    {
      ...props,
      "aria-label": String(label) || props["aria-label"] || "text area",
      inputElementType: "textarea",
    },
    ref,
  );

  return (
    <div className={base({ isBlock, class: className })}>
      {label && (
        <label {...labelProps} className={l({ size, class: classNames?.label, isReadOnly: !!inputProps.readOnly })}>
          {label}
        </label>
      )}

      <div
        className={inner({ size, class: classNames?.inner, isDisabled, isReadOnly: !!inputProps.readOnly, elevated })}
      >
        <textarea
          {...inputProps}
          disabled={isDisabled}
          ref={ref}
          placeholder={placeholder}
          className={input({
            size,
            transform,
            class: classNames?.input,
            isDisabled,
            isReadOnly: !!inputProps.readOnly,
          })}
        />
      </div>
      {description && (
        <span {...descriptionProps} className={d({ size, class: classNames?.description })}>
          {description}
        </span>
      )}
      {errorMessage && (
        <span {...errorMessageProps} className={em({ size, class: classNames?.errorMessage })}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default TextArea;
