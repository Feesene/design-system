"use client";

import React from "react";
import { useSearchField, AriaSearchFieldProps } from "react-aria";
import { tv } from "tailwind-variants";
import Icon, { IconNames } from "../Media/Icon";
import IconButton from "../Media/IconButton";
import Spinner from "../../components/Media/Spinner";
import { useSearchFieldState } from "react-stately";

const searchField = tv({
  slots: {
    base: "flex w-fit flex-col gap-[0.10rem]",
    label: "!font-normal text-default-700 dark:text-dark-100",
    inner:
      "outline-focused group relative flex w-full items-center border border-default-200 bg-white dark:border-dark-500 dark:bg-dark-700",
    input:
      "h-full w-full !font-normal bg-transparent px-3 py-1 text-default-content outline-none placeholder:text-default-300 dark:bg-transparent dark:text-dark-100 dark:placeholder:text-default-600",
    description: "text-default-400 dark:text-dark-300",
    errorMessage: "text-error dark:text-error-300",
    icon: " text-default-400 first:ml-2 last:mr-2 group-focus-within:text-primary dark:group-focus-within:text-primary-400",
    eyeIcon: "text-default-700 dark:hover:text-dark-200",
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
        icon: "min-h-3 min-w-3",
      },
      sm: {
        inner: "h-8",
        input: "text-xs",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
        icon: "min-h-4 min-w-4",
      },
      md: {
        inner: "h-10",
        input: "text-sm",
        label: "text-sm",
        description: "text-xs",
        errorMessage: "text-xs",
        icon: "min-h-5 min-w-5",
      },
      lg: {
        inner: "h-12",
        input: "text-base",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
        icon: "min-h-6 min-w-6",
      },
      xl: {
        inner: "h-14",
        input: "text-base",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
        icon: "min-h-7 min-w-7",
      },
    },
    rounded: {
      true: { input: "rounded-full", inner: "rounded-full" },
      false: { input: "rounded", inner: "rounded" },
    },
    isDisabled: {
      true: {
        inner: "bg-default-50 dark:bg-dark-600",
        input: "text-default-400 dark:text-dark-300",
        eyeIcon: "hidden",
      },
      false: {
        inner:
          "transition-all duration-300 hover:border-default-300 hover:focus-within:border-default-200 dark:hover:border-dark-400 dark:hover:focus-within:border-dark-400",
        input: "transition-all duration-300",
      },
    },
    isBlock: {
      true: { base: "w-full" },
    },
  },
});

const { base, label: l, inner, input, description: d, errorMessage: em, icon, eyeIcon } = searchField();

export interface ISearchFieldProps extends AriaSearchFieldProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  leftIcon?: IconNames;
  rounded?: boolean;
  isBlock?: boolean;
  className?: string;
  errorMessage?: string;
  elevated?: boolean;
  classNames?: {
    label?: string;
    inner?: string;
    input?: string;
    description?: string;
    errorMessage?: string;
    icon?: string;
  };
  isLoading?: boolean;
}

/**
 * O componente SearchField é um elemento React utilizado para capturar e exibir entradas de texto simples em uma aplicação.
 */
const SearchField = ({
  size = "md",
  leftIcon = "PiMagnifyingGlass",
  isLoading,
  rounded = false,
  description,
  errorMessage,
  isBlock,
  className,
  classNames,
  elevated,
  ...props
}: ISearchFieldProps) => {
  let { label, isDisabled } = props;
  let state = useSearchFieldState(props);
  let ref = React.useRef(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps, clearButtonProps } = useSearchField(
    { ...props, "aria-label": String(label) || props["aria-label"] || "procurar" },
    state,
    ref,
  );

  return (
    <div className={base({ isBlock, class: className })}>
      {label && (
        <label {...labelProps} className={l({ size, class: classNames?.label })}>
          {label}
        </label>
      )}

      <div className={inner({ size, class: classNames?.inner, isDisabled, rounded, elevated })}>
        {leftIcon ? <Icon name={leftIcon} className={icon({ size, class: classNames?.icon, isDisabled })} /> : null}
        <input
          {...inputProps}
          disabled={isDisabled}
          ref={ref}
          className={input({ size, class: classNames?.input, isDisabled, rounded })}
        />
        {!isDisabled && !isLoading && state.value !== "" && (
          <IconButton
            outline={false}
            size="sm"
            color="default"
            className="absolute right-2"
            icon="PiX"
            {...clearButtonProps}
          />
        )}
        {isLoading ? (
          <Spinner
            size={size == "xl" ? "md" : size == "lg" ? "md" : size == "md" ? "sm" : size == "sm" ? "xs" : "xs"}
            className="absolute right-2"
          />
        ) : null}
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

export default SearchField;
