"use client";

import React from "react";
import { tv } from "tailwind-variants";
import {
  mergeProps,
  useFocusRing,
  AriaSliderProps,
  useNumberFormatter,
  useSlider,
  useSliderThumb,
  VisuallyHidden,
  Orientation,
} from "react-aria";
import { useSliderState } from "react-stately";

const slider = tv({
  slots: {
    base: "flex",
    label: "flex text-default-700 dark:text-dark-100",
    track:
      "cursor-pointer before:absolute before:block before:rounded-full before:bg-default-300 dark:before:bg-dark-600",
    thumb: "z-10 rounded-full bg-white shadow-thumb",
    tracked: "absolute z-0 rounded-full",
  },
  variants: {
    isDisabled: {
      true: { track: "cursor-default opacity-50" },
    },
    orientation: {
      horizontal: {
        label: "justify-between",
        base: "horizontal w-full flex-col",
        track: "w-full before:top-[50%] before:w-full before:translate-y-[-50%]",
        thumb: "top-[50%]",
        tracked: "top-[50%] h-1 translate-y-[-50%]",
      },
      vertical: {
        base: "vertical h-full w-fit flex-col items-center gap-3 text-center",
        track: "h-full before:left-[50%] before:h-full before:translate-x-[-50%]",
        thumb: "left-[50%]",
        tracked: "bottom-0 left-[50%] w-1 translate-x-[-50%]",
      },
    },
    size: {
      xs: { thumb: "h-2 w-2", label: "text-xs", description: "text-2xs", errorMessage: "text-2xs" },
      sm: { thumb: "h-3 w-3", label: "text-xs", description: "text-2xs", errorMessage: "text-2xs" },
      md: { thumb: "h-4 w-4", label: "text-sm", description: "text-xs", errorMessage: "text-xs" },
      lg: { thumb: "h-5 w-5", label: "text-md", description: "text-sm", errorMessage: "text-sm" },
      xl: { thumb: "h-6 w-6", label: "text-lg", description: "text-md", errorMessage: "text-md" },
    },
    color: {
      default: {
        thumb: "focus-within:shadow-thumb-default",
        tracked: "bg-default-600",
      },
      primary: {
        thumb: "focus-within:shadow-thumb-primary",
        tracked: "bg-primary dark:bg-primary-400",
      },
      secondary: {
        thumb: "focus-within:shadow-thumb-secondary",
        tracked: "bg-secondary dark:bg-secondary-500",
      },
      info: {
        thumb: "focus-within:shadow-thumb-info",
        tracked: "bg-info-600 dark:bg-info-500",
      },
      success: {
        thumb: "focus-within:shadow-thumb-success",
        tracked: "bg-success-500 dark:bg-success-400",
      },
      warning: {
        thumb: "focus-within:shadow-thumb-warning",
        tracked: "bg-warning-500 dark:bg-warning-400",
      },
      error: {
        thumb: "focus-within:shadow-thumb-error",
        tracked: "bg-error-500 dark:bg-error-400",
      },
    },
    isFocusVisible: {
      true: {
        thumb: "outline-focused",
      },
    },
  },
  compoundSlots: [
    { slots: ["track"], orientation: "horizontal", size: "xs", class: "h-5 before:h-[2px]" },
    { slots: ["track"], orientation: "horizontal", size: "sm", class: "h-6 before:h-[2px]" },
    { slots: ["track"], orientation: "horizontal", size: "md", class: "h-8 before:h-[3px]" },
    { slots: ["track"], orientation: "horizontal", size: "lg", class: "h-10 before:h-[4px]" },
    { slots: ["track"], orientation: "horizontal", size: "xl", class: "h-12 before:h-[6px]" },
    { slots: ["tracked"], orientation: "horizontal", size: "xs", class: "h-[2px]" },
    { slots: ["tracked"], orientation: "horizontal", size: "sm", class: "h-[2px]" },
    { slots: ["tracked"], orientation: "horizontal", size: "md", class: "h-[3px]" },
    { slots: ["tracked"], orientation: "horizontal", size: "lg", class: "h-[4px]" },
    { slots: ["tracked"], orientation: "horizontal", size: "xl", class: "h-[6px]" },

    { slots: ["track"], orientation: "vertical", size: "xs", class: "w-5 before:w-[2px]" },
    { slots: ["track"], orientation: "vertical", size: "sm", class: "w-6 before:w-[2px]" },
    { slots: ["track"], orientation: "vertical", size: "md", class: "w-8 before:w-[3px]" },
    { slots: ["track"], orientation: "vertical", size: "lg", class: "w-10 before:w-[4px]" },
    { slots: ["track"], orientation: "vertical", size: "xl", class: "w-12 before:w-[6px]" },
    { slots: ["tracked"], orientation: "vertical", size: "xs", class: "w-[2px]" },
    { slots: ["tracked"], orientation: "vertical", size: "sm", class: "w-[2px]" },
    { slots: ["tracked"], orientation: "vertical", size: "md", class: "w-[3px]" },
    { slots: ["tracked"], orientation: "vertical", size: "lg", class: "w-[4px]" },
    { slots: ["tracked"], orientation: "vertical", size: "xl", class: "w-[6px]" },
  ],
});

const { base, label: l, track: t, thumb, tracked } = slider();

export interface ISliderProps<T = number | number[]> extends AriaSliderProps<T> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  formatOptions?: Intl.NumberFormatOptions;
  isBlock?: boolean;
  label?: string;
  description?: string;
  errorMessage?: string;
  className?: string;
  labelValue?: Boolean | String;
  classNames?: {
    label?: string;
    track?: string;
    thumb?: string;
    description?: string;
    errorMessage?: string;
  };
  orientation: Orientation;
}

/**
 * O componente Slider é uma interface interativa em uma aplicação React que permite aos usuários selecionar um valor em um intervalo contínuo. Ele é representado visualmente por uma barra horizontal ou vertical com um botão deslizante (alça) que pode ser movido pelos usuários para ajustar um valor numérico.
 *
 * Opções da propriedade `formatOptions`, [leia aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
 *
 */
const Slider = ({
  size = "md",
  color = "primary",
  description,
  errorMessage,
  label,
  isBlock,
  className,
  classNames,
  orientation = "horizontal",
  labelValue = true,
  ...props
}: ISliderProps) => {
  let trackRef = React.useRef(null);
  let numberFormatter = useNumberFormatter(props.formatOptions);
  let state = useSliderState({ ...props, orientation, numberFormatter });
  let { groupProps, trackProps, labelProps, outputProps } = useSlider(
    { ...props, "aria-label": String(label) || props["aria-label"] || "slider", orientation },
    state,
    trackRef,
  );

  const index = 0;

  let inputRef = React.useRef(null);
  let { thumbProps, inputProps } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
      label,
    },
    state,
  );
  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div {...groupProps} className={base({ class: className, orientation: orientation })}>
      <div className={l({ orientation: orientation, size, class: classNames?.label })}>
        {label && <label {...labelProps}>{label}</label>}
        {typeof labelValue == "string" && <label {...labelProps}>{labelValue}</label>}
        {orientation == "horizontal" && labelValue && typeof labelValue == "boolean" && (
          <output {...outputProps}>{state.getThumbValueLabel(0)}</output>
        )}
      </div>

      <div
        {...trackProps}
        ref={trackRef}
        className={t({ class: classNames?.track, orientation: orientation, size, isDisabled: state.isDisabled })}
      >
        <div
          className={tracked({ orientation: orientation, color, size })}
          style={
            orientation == "horizontal"
              ? { width: state.getThumbPercent(0) * 100 + "%" }
              : { height: state.getThumbPercent(0) * 100 + "%" }
          }
        />
        <div
          {...thumbProps}
          className={thumb({
            class: classNames?.thumb,
            color,
            size,
            isDisabled: state.isDisabled,
            isFocusVisible,
            orientation: orientation,
          })}
        >
          <VisuallyHidden>
            <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
          </VisuallyHidden>
        </div>
      </div>

      {orientation == "vertical" && (
        <output {...outputProps} className={l({ orientation: orientation, size, class: classNames?.label })}>
          {state.getThumbValueLabel(0)}
        </output>
      )}
    </div>
  );
};

export default Slider;
