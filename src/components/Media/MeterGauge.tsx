"use client";

import React, { useMemo } from "react";
import { useMeter, useNumberFormatter } from "react-aria";
import { MeterProps } from "react-aria-components";
import { tv } from "tailwind-variants";

const meterGauge = tv({
  slots: {
    base: "select-none",
    value: "",
    unit: "",
    track: "",
    tracked: "transition-all",
  },
  variants: {
    color: {
      default: {
        unit: "fill-default-700 dark:fill-dark-50",
        value: "fill-default-700 dark:fill-dark-50",
        track: "dark:stroke-dark-fill-dark-50 stroke-default-700",
        tracked: "dark:stroke-dark-fill-dark-50 stroke-default-700 ",
      },
      primary: { unit: "fill-primary", value: "fill-primary", track: "stroke-primary", tracked: "stroke-primary" },
      secondary: {
        unit: "fill-secondary",
        value: "fill-secondary",
        track: "stroke-secondary",
        tracked: "stroke-secondary",
      },
      info: { unit: "fill-info-400", value: "fill-info-400", track: "stroke-info-400", tracked: "stroke-info-400" },
      success: {
        unit: "fill-success-400",
        value: "fill-success-400",
        track: "stroke-success-400",
        tracked: "stroke-success-400",
      },
      warning: {
        unit: "fill-warning-400",
        value: "fill-warning-400",
        track: "stroke-warning-400",
        tracked: "stroke-warning-400",
      },
      error: {
        unit: "fill-error-400",
        value: "fill-error-400",
        track: "stroke-error-400",
        tracked: "stroke-error-400",
      },
    },
    size: {
      "2xs": { unit: "text-2xs", value: "text-xs" },
      xs: { unit: "text-xs", value: "text-xs" },
      sm: { unit: "text-xl", value: "text-2xl" },
      md: { unit: "text-2xl", value: "text-3xl" },
      lg: { unit: "text-3xl", value: "text-4xl" },
      xl: { unit: "text-4xl", value: "text-5xl" },
    },
  },
});

const { base, track, tracked, unit: u, value: v } = meterGauge();

export interface IMeterGaugeProps extends MeterProps {
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  className?: string;
  offset?: { x?: number; y?: number };
  valueLabel?: string;
  classNames?: {
    base?: string;
    value?: string;
    unit?: string;
    track?: string;
    tracked?: string;
  };
}

/**
 * O componente MeterGauge é um componente React que desenha um medidor circular customizável com base nas propriedades fornecidas, utilizando SVG para renderização gráfica e hooks para acessibilidade e formatação de números.
 *
 * Opções da propriedade `formatOptions`, [leia aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
 *
 */
const MeterGauge = ({
  children,
  color = "primary",
  offset: o,
  classNames,
  size: sizing = "md",
  className,
  valueLabel,
  ...props
}: IMeterGaugeProps) => {
  const size = useMemo(() => {
    return sizing == "2xs"
      ? 42
      : sizing == "xs"
        ? 50
        : sizing == "sm"
          ? 100
          : sizing == "md"
            ? 150
            : sizing == "lg"
              ? 200
              : 250;
  }, [sizing]);

  let { value = 0, minValue = 0, maxValue = 100 } = props;
  let { meterProps } = useMeter({...props, "aria-label": String(valueLabel) || props["aria-label"] || "meter"});

  let center = size / 2;
  let strokeWidth =
    sizing == "2xs" ? 2 : sizing == "xs" ? 4 : sizing == "sm" ? 6 : sizing == "md" ? 8 : sizing == "lg" ? 12 : 14;
  let r = center - strokeWidth;
  let c = 2 * r * Math.PI;
  let a = c * (270 / 360);
  let percentage = (value || 0 - minValue) / (maxValue - minValue);
  let offset = c - percentage * a;

  let formatter = useNumberFormatter(props.formatOptions);
  let parts = formatter.formatToParts(value);
  let valueString = parts.find((p) => p.type === "integer");
  let unit = parts.find((p) => p.type === "unit");

  let psValueY =
    sizing == "2xs" ? 20 : sizing == "xs" ? 25 : sizing == "sm" ? 50 : sizing == "md" ? 80 : sizing == "lg" ? 110 : 140;

  let psUnitY =
    sizing == "2xs"
      ? 30
      : sizing == "xs"
        ? 35
        : sizing == "sm"
          ? 70
          : sizing == "md"
            ? 105
            : sizing == "lg"
              ? 140
              : 180;

  return (
    <svg
      {...meterProps}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      strokeWidth={strokeWidth}
      className={base({ class: classNames?.base })}
    >
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        strokeOpacity={0.2}
        strokeDasharray={`${a} ${c}`}
        strokeLinecap="round"
        transform={`rotate(135 ${center} ${center})`}
        className={track({ class: classNames?.track, color })}
      />
      <circle
        role="presentation"
        cx={center}
        cy={center}
        r={r}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(135 ${center} ${center})`}
        className={tracked({ class: classNames?.tracked, color })}
      />
      <text
        role="presentation"
        x={center + (o?.x || 0)}
        y={psValueY + (o?.y || 0)}
        textAnchor="middle"
        className={v({ class: classNames?.value, color, size: sizing })}
      >
        {valueString?.value}
        {valueLabel}
      </text>
      <text
        role="presentation"
        x={center + (o?.x || 0)}
        y={psUnitY + (o?.y || 0)}
        textAnchor="middle"
        fillOpacity={0.85}
        className={u({ class: classNames?.unit, color, size: sizing })}
      >
        {unit?.value}
      </text>
    </svg>
  );
};

export default MeterGauge;
