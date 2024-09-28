"use client";

import React, { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import VStack from "../../elements/Layout/VStack";
import HStack from "../../elements/Layout/HStack";
import Text from "../../elements/Typography/Text";
import Stack from "../../elements/Layout/Stack";

const spinner = tv({
  slots: {
    base: "p-1",
    inner: "relative flex cursor-pointer items-center justify-center rounded-full transition-all duration-700",
    bar: "transition-all duration-700",
    contentLabels: "w-full",
    label: "",
  },
  variants: {
    orientation: {
      vertical: { base: "w-fit items-center", bar: "-my-1 w-1", contentLabels: "ml-2", label: "left-8 w-max" },
      horizontal: {
        base: "items-center",
        bar: "-mx-1 h-1",
        contentLabels: "",
        label: "text-center",
      },
    },
    active: {
      true: { inner: "", bar: "" },
      false: {
        inner: "bg-default-200 text-default-700 dark:bg-dark-900 dark:text-dark-200",
        bar: "bg-default-200 dark:bg-dark-900",
      },
    },
    color: {
      default: "",
      primary: "",
      secondary: "",
      info: "",
      success: "",
      warning: "",
      error: "",
    },
    size: {
      "2xs": {},
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
      "2xl": {},
    },
    sizeDot: {
      xs: { inner: "h-3 w-3 text-2xs" },
      sm: { inner: "h-4 w-4 text-xs" },
      md: { inner: "h-5 w-5 text-xs" },
      lg: { inner: "h-6 w-6 text-sm" },
      xl: { inner: "h-7 w-7 text-sm" },
    },
  },
  compoundSlots: [
    { slots: ["bar", "inner"], active: true, color: "primary", class: "bg-primary-400 text-white" },
    { slots: ["bar", "inner"], active: true, color: "default", class: "bg-default-400 text-white" },
    { slots: ["bar", "inner"], active: true, color: "secondary", class: "bg-secondary-600 text-white" },
    { slots: ["bar", "inner"], active: true, color: "info", class: "bg-info-500 text-white" },
    { slots: ["bar", "inner"], active: true, color: "success", class: "bg-success-300 text-white" },
    { slots: ["bar", "inner"], active: true, color: "warning", class: "bg-warning-300 text-white" },
    { slots: ["bar", "inner"], active: true, color: "error", class: "bg-error-300 text-white" },

    { slots: ["bar"], orientation: "horizontal", size: "2xs", class: "w-6" },
    { slots: ["bar"], orientation: "horizontal", size: "xs", class: "w-8" },
    { slots: ["bar"], orientation: "horizontal", size: "sm", class: "w-10" },
    { slots: ["bar"], orientation: "horizontal", size: "md", class: "w-12" },
    { slots: ["bar"], orientation: "horizontal", size: "lg", class: "w-16" },
    { slots: ["bar"], orientation: "horizontal", size: "xl", class: "w-20" },
    { slots: ["bar"], orientation: "horizontal", size: "2xl", class: "w-24" },

    { slots: ["bar"], orientation: "vertical", size: "2xs", class: "h-4" },
    { slots: ["bar"], orientation: "vertical", size: "xs", class: "h-6" },
    { slots: ["bar"], orientation: "vertical", size: "sm", class: "h-8" },
    { slots: ["bar"], orientation: "vertical", size: "md", class: "h-10" },
    { slots: ["bar"], orientation: "vertical", size: "lg", class: "h-12" },
    { slots: ["bar"], orientation: "vertical", size: "xl", class: "h-14" },
    { slots: ["bar"], orientation: "vertical", size: "2xl", class: "h-16" },
  ],
});

const { base, contentLabels, bar, label, inner } = spinner();

export interface IStepsProps extends Omit<React.ComponentProps<"div">, "ref"> {
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  steps?: number;
  step?: number;
  color?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  labels?: { title?: string; description?: string }[];
  showStepNumber?: boolean;
  sizeDot?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  classNames?: { inner?: string; bar?: string; label?: string; contentLabels?: string };
  orientation?: "vertical" | "horizontal";
  onPress?: (value: number) => void;
}

/**
 * O componente Steps é comumente utilizado para criar uma interface de usuário que guia o usuário através de uma série de etapas em um processo ou fluxo de trabalho. Essas etapas podem representar qualquer coisa, desde o preenchimento de um formulário até a conclusão de uma transação.
 */
const Steps = ({
  children,
  steps = 3,
  step = 1,
  color = "primary",
  labels,
  className,
  sizeDot = "md",
  showStepNumber = false,
  orientation = "vertical",
  size = "md",
  classNames,
  onPress,
  ...props
}: IStepsProps) => {
  const [Dots, setDots] = useState<React.ReactNode>();
  const [newLabels, setLabels] = useState<React.ReactNode>();

  useEffect(() => {
    const dots = [];
    const MAX = steps;

    dots.push(
      <div
        key={"inner 0"}
        onClick={() => onPress && onPress(1)}
        style={{ zIndex: 20 }}
        className={inner({
          size,
          color,
          active: step >= 1,
          sizeDot,
          class: classNames?.inner,
        })}
      >
        {showStepNumber && "1"}
      </div>,
    );

    for (var i = 1; i <= MAX; i++) {
      if (i > 1) {
        const index = i;
        dots.push(
          <Stack
            flex
            className={orientation == "vertical" ? "flex-col" : "flex-row"}
            justifyContent="center"
            alignItems="center"
            key={i}
          >
            <div
              style={{ zIndex: 10 }}
              className={bar({
                size,
                color,
                active: step >= i,
                orientation,
                class: classNames?.bar,
              })}
            />
            <div
              style={{ zIndex: 20 }}
              onClick={() => {
                onPress && onPress(index);
              }}
              className={inner({
                size,
                color,
                active: step >= i,
                sizeDot,
                class: classNames?.inner,
              })}
            >
              {showStepNumber && i}
            </div>
          </Stack>,
        );
      }
    }

    setDots(dots);
  }, [step, steps, orientation, color, size, showStepNumber, sizeDot]);

  useEffect(() => {
    if (!labels) return;

    const childs = [];
    const MAX = steps;

    labels &&
      labels[0] &&
      childs.push(
        <VStack key={"0"} className={label({ orientation, class: classNames?.label })}>
          <Text color={step == 1 ? "contentPrimary" : "contentTernary"} size="xs">
            {labels[0].title}
          </Text>
          <Text color={step == 1 ? "default" : "contentTernary"} weight={step == 1 ? "bold" : "medium"}>
            {labels[0].description}
          </Text>
        </VStack>,
      );

    for (var i = 1; i <= MAX; i++) {
      if (i > 1) {
        labels &&
          labels[i - 1] &&
          childs.push(
            <div key={"label" + i} className={label({ orientation, class: classNames?.label })}>
              <Text color={step == i ? "contentPrimary" : "contentTernary"} size="xs">
                {labels[i - 1].title}
              </Text>
              <Text color={step == i ? "default" : "contentTernary"} weight={step == i ? "bold" : "medium"}>
                {labels[i - 1].description}
              </Text>
            </div>,
          );
      }
    }

    setLabels(childs);
  }, [step, steps, orientation, labels, size]);

  const A = orientation == "horizontal" ? HStack : VStack;
  const B = orientation == "horizontal" ? VStack : HStack;

  return (
    <B className="w-fit">
      <A {...props} className={base({ class: className, color, size, orientation })}>
        {Dots}
      </A>
      <A justifyContent="between" className={contentLabels({ orientation, class: classNames?.contentLabels })}>
        {newLabels}
      </A>
      {children}
    </B>
  );
};

export default Steps;
