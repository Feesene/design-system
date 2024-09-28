"use client";

import React, { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { useProgressBar, AriaProgressBarProps } from "react-aria";

const progress = tv({
  slots: {
    base: "transition-all duration-300",
    label: "flex justify-between text-default-700 dark:text-dark-100",
    track: "overflow-hidden rounded-full bg-default-200 dark:bg-dark-800",
    tracked: "rounded-full duration-200",
  },
  variants: {
    value: {
      false: { tracked: "animation-progress-indeterminate" },
    },
    size: {
      xs: { track: "h-[2px]", tracked: "h-[2px]", label: "text-xs" },
      sm: { track: "h-1", tracked: "h-1", label: "text-xs" },
      md: { track: "h-2", tracked: "h-2", label: "text-sm" },
      lg: { track: "h-3", tracked: "h-3", label: "text-md" },
      xl: { track: "h-4", tracked: "h-4", label: "text-lg" },
    },
    color: {
      default: {
        tracked: "bg-default-600 dark:bg-dark-100",
      },
      primary: {
        tracked: "bg-primary dark:bg-primary-400",
      },
      secondary: {
        tracked: "bg-secondary dark:bg-secondary-500",
      },
      info: {
        tracked: "bg-info-600 dark:bg-info-500",
      },
      success: {
        tracked: "bg-success-500 dark:bg-success-400",
      },
      warning: {
        tracked: "bg-warning-500 dark:bg-warning-400",
      },
      error: {
        tracked: "bg-error-500 dark:bg-error-400",
      },
    },
  },
});

const { base, label: l, track, tracked } = progress();

export interface IProgressProps extends AriaProgressBarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  formatOptions?: Intl.NumberFormatOptions;
  isBlock?: boolean;
  orientation?: "horizontal" | "vertical";
  description?: string;
  errorMessage?: string;
  className?: string;
  classNames?: {
    label?: string;
    track?: string;
    tracked?: string;
  };
}

/**
 * O componente Progress representa visualmente o avanço ou status de uma operação em uma aplicação React.
 *
 * Opções da propriedade `formatOptions`, [leia aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
 */
const Progress = ({
  size = "md",
  color = "primary",
  description,
  errorMessage,
  isIndeterminate,
  minValue = 0,
  maxValue = 100,
  value,
  label,
  isBlock,
  className,
  classNames,
  ...props
}: IProgressProps) => {
  let showValueLabel = !!label;
  let { progressBarProps, labelProps } = useProgressBar({
    ...props,
    "aria-label": String(label) || props["aria-label"] || "progresso",
  });
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage((Number(value) - minValue) / (maxValue - minValue));
  }, [value]);

  return (
    <div {...progressBarProps} className={base({ class: className })}>
      <div className={l({ size, class: classNames?.label })}>
        {label && <span {...labelProps}>{label}</span>}
        {showValueLabel && value && <span>{percentage * 100}%</span>}
      </div>
      <div className={track({ size, class: classNames?.track })}>
        <div
          style={{ width: `${isIndeterminate ? 100 : Math.round(percentage * 100)}%` }}
          className={tracked({ color, size, value: isIndeterminate ? false : true, class: classNames?.tracked })}
        />
      </div>
    </div>
  );
};

export default Progress;
