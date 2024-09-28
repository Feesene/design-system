"use client";

import React, { useState } from "react";
import { useTextField, AriaTextFieldProps } from "react-aria";
import { tv } from "tailwind-variants";
import Icon, { IconNames } from "../Media/Icon";
import IconButton, { IIconButtonProps } from "../Media/IconButton";
import Spinner from "../../components/Media/Spinner";

const textField = tv({
  slots: {
    base: "flex w-fit flex-col gap-[0.10rem]",
    label: "!font-normal text-default-700 dark:text-dark-100",
    inner:
      "group relative flex w-full items-center border border-default-200 bg-white dark:border-dark-500 dark:bg-dark-700",
    input:
      "h-full w-full bg-transparent px-3 py-1 !font-normal text-default-content outline-none placeholder:normal-case placeholder:text-default-300 dark:bg-transparent dark:text-dark-100 dark:placeholder:text-default-600",
    description: "text-default-400 dark:text-dark-300",
    errorMessage: "text-error dark:text-error-300",
    icon: "text-default-400 first:ml-2 last:mr-2 group-focus-within:text-primary dark:group-focus-within:text-primary-400",
    eyeIcon: "mr-2 text-default-700 dark:hover:text-dark-200",
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
        inner: "h-6",
        input: "text-xs",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
        icon: "min-h-3 min-w-3",
        eyeIcon: "min-h-3 min-w-3",
      },
      sm: {
        inner: "h-8",
        input: "text-xs",
        label: "text-xs",
        description: "text-2xs",
        errorMessage: "text-2xs",
        icon: "min-h-4 min-w-4",
        eyeIcon: "min-h-4 min-w-4",
      },
      md: {
        inner: "h-10",
        input: "text-sm",
        label: "text-sm",
        description: "text-xs",
        errorMessage: "text-xs",
        icon: "min-h-5 min-w-5",
        eyeIcon: "min-h-5 min-w-5",
      },
      lg: {
        inner: "h-12",
        input: "text-base",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
        icon: "min-h-6 min-w-6",
        eyeIcon: "min-h-6 min-w-6",
      },
      xl: {
        inner: "h-14",
        input: "text-base",
        label: "text-base",
        description: "text-sm",
        errorMessage: "text-sm",
        icon: "min-h-7 min-w-7",
        eyeIcon: "min-h-7 min-w-7",
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
    isReadOnly: {
      true: {
        label: "!font-semibold text-default-900 dark:text-white",
        input: "h-fit cursor-default py-0 text-default-800",
        inner: "items-start border-none bg-transparent dark:bg-transparent",
      },
      false: {
        inner: "outline-focused",
      },
    },
    isBlock: {
      true: { base: "w-full" },
    },
  },
});

const { base, label: l, inner, input, description: d, errorMessage: em, icon, eyeIcon } = textField();

export interface ITextFieldProps extends AriaTextFieldProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  leftIcon?: IconNames;
  leftIconProps?: IIconButtonProps;
  rightIcon?: IconNames;
  rightIconProps?: Omit<IIconButtonProps, "icon">;
  transform?: "uppercase" | "lowercase" | "capitalize" | "none";
  rounded?: boolean;
  isBlock?: boolean;
  className?: string;
  errorMessage?: string;
  showPassword?: boolean;
  classNames?: {
    label?: string;
    inner?: string;
    input?: string;
    description?: string;
    errorMessage?: string;
    icon?: string;
  };
  elevated?: boolean;
  isLoading?: boolean;
  type?:
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "password"
    | "range"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
}

/**
 * O componente TextField é um elemento React utilizado para capturar e exibir entradas de texto simples em uma aplicação.
 */
const TextField = ({
  size = "md",
  placeholder,
  leftIcon,
  rightIconProps,
  leftIconProps,
  rightIcon,
  isLoading,
  transform = "uppercase",
  rounded = false,
  label,
  description,
  errorMessage,
  isBlock,
  showPassword = true,
  className,
  classNames,
  isDisabled = false,
  elevated = false,
  ...props
}: ITextFieldProps) => {
  const ref = React.useRef(null);
  const {
    inputProps: { autoComplete = "off", ...inputProps },
    labelProps,
    descriptionProps,
    errorMessageProps,
  } = useTextField({ ...props, "aria-label": String(label) || props["aria-label"] || "text" }, ref);
  const [hidden, setHidden] = useState(true);

  return (
    <div className={base({ isBlock, class: className })}>
      {label && (
        <label {...labelProps} className={l({ size, class: classNames?.label, isReadOnly: !!inputProps.readOnly })}>
          {label}
        </label>
      )}

      <div
        className={inner({
          size,
          class: classNames?.inner,
          isDisabled,
          rounded,
          elevated,
          isReadOnly: !!inputProps.readOnly,
        })}
      >
        {leftIcon ? (
          <Icon name={leftIcon} className={icon({ size, class: classNames?.icon, isDisabled })} {...leftIconProps} />
        ) : null}
        <input
          {...inputProps}
          disabled={isDisabled}
          ref={ref}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={input({
            size,
            class: classNames?.input,
            isDisabled,
            transform,
            isReadOnly: !!inputProps.readOnly,
            rounded,
          })}
          type={props.type == "password" && !hidden ? "text" : inputProps.type}
        />
        {showPassword && props.type == "password" ? (
          <IconButton
            outline={false}
            excludeFromTabOrder
            onPress={() => {
              setHidden(!hidden);
            }}
            icon={hidden ? "PiEye" : "PiEyeSlash"}
            className={eyeIcon({ size, class: classNames?.icon, isDisabled })}
          />
        ) : null}
        {rightIcon && !isLoading ? (
          <IconButton
            outline={false}
            color="primary"
            icon={rightIcon}
            className={icon({ size, class: classNames?.icon, isDisabled })}
            {...rightIconProps}
          />
        ) : null}
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

export default TextField;
