"use client";

import React, { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import Icon from "../../elements/Media/Icon";
import IconButton from "../../elements/Media/IconButton";

const pagination = tv({
  slots: {
    base: "flex gap-2",
    inner:
      "flex cursor-pointer select-none items-center justify-center rounded-full border border-neutral-300 bg-white text-default-900 hover:border-neutral-400 dark:border-dark-500 dark:bg-dark-800 dark:text-dark-100 dark:hover:border-dark-400",
    icon: "cursor-pointer text-default-600",
  },
  variants: {
    color: {
      primary: "",
      secondary: "",
      info: "",
      success: "",
      warning: "",
      error: "",
    },
    isSelected: {
      true: { inner: "text-white dark:text-white" },
    },
    size: {
      xs: { inner: "h-5 min-w-5 px-1 text-xs", icon: "h-5" },
      sm: { inner: "h-6 min-w-6 px-1 text-sm", icon: "h-6" },
      md: { inner: "h-7 min-w-7 px-1 text-sm", icon: "h-7" },
      lg: { inner: "h-8 min-w-8 px-1 text-base", icon: "h-8" },
    },
  },
  compoundSlots: [
    {
      class: "border-primary bg-primary shadow-raise-primary dark:border-primary-400 dark:bg-primary-400",
      slots: ["inner"],
      isSelected: true,
      color: "primary",
    },
    {
      class: "border-secondary bg-secondary shadow-raise-secondary dark:border-secondary-500 dark:bg-secondary-500",
      slots: ["inner"],
      isSelected: true,
      color: "secondary",
    },
    {
      class: "border-info-600 bg-info-600 shadow-raise-info dark:border-info-500 dark:bg-info-500",
      slots: ["inner"],
      isSelected: true,
      color: "info",
    },
    {
      class: "border-success-500 bg-success-500 shadow-raise-success dark:border-success-400  dark:bg-success-400",
      slots: ["inner"],
      isSelected: true,
      color: "success",
    },
    {
      class: "border-warning-500 bg-warning-500 shadow-raise-warning dark:border-warning-400  dark:bg-warning-400",
      slots: ["inner"],
      isSelected: true,
      color: "warning",
    },
    {
      class: "border-error-500 bg-error-500 shadow-raise-error dark:border-error-400 dark:bg-error-400",
      slots: ["inner"],
      isSelected: true,
      color: "error",
    },
  ],
});

const { base, inner, icon } = pagination();

export interface IPaginationProps {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  control?: boolean;
  onChange?: (page?: number) => void;
  currentPage?: number;
  totalPages?: number;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  classNames?: {
    inner?: string;
  };
}

/**
 *
 */
const Pagination = ({
  color = "primary",
  size = "md",
  control = false,
  onChange,
  classNames,
  currentPage = 1,
  totalPages = 3,
  className,
}: IPaginationProps) => {
  const [state, setState] = useState(currentPage);

  useEffect(() => {
    setState(currentPage);
  }, [currentPage]);

  useEffect(() => {
    onChange && onChange(state);
  }, [state]);

  const pages = () => {
    const pages = [];
    const MAX = 5;

    if (!totalPages) return;

    pages.push(
      <div
        key={1}
        id={String(1)}
        onClick={(e) => {
          setState(Number(e.currentTarget.id));
        }}
        className={inner({
          size,
          color,
          class: classNames?.inner,
          isSelected: Boolean(state == 1),
        })}
      >
        1
      </div>,
    );

    if (state >= MAX) {
      pages.push(
        <Icon
          key={"dot1"}
          name="PiDotsThree"
          className="mt-2 flex h-7 items-end justify-end text-default-400 dark:text-dark-200"
        />,
      );
    }

    const iniciateNumber: number = state - 3 <= 0 ? 2 : state + 3 > totalPages ? totalPages - 4 : state - 2;
    const finalNumber: number = state + 3 >= totalPages ? totalPages - 1 : state - 3 <= 0 ? MAX : state + 2;

    for (var i = iniciateNumber; i <= finalNumber; i++) {
      if (i > 1) {
        pages.push(
          <div
            key={i}
            id={String(i)}
            onClick={(e) => {
              setState(Number(e.currentTarget.id));
            }}
            className={inner({
              size,
              color,
              class: classNames?.inner,
              isSelected: Boolean(state == i),
            })}
          >
            {i}
          </div>,
        );
      }
    }

    if (pages[pages.length - 1].key != String(totalPages)) {
      if (state <= totalPages - (MAX - 1)) {
        pages.push(
          <Icon
            key={"dot2"}
            name="PiDotsThree"
            className="mt-2 flex h-7 items-end justify-end text-default-400 dark:text-dark-200"
          />,
        );
      }

      pages.push(
        <div
          key={totalPages}
          id={String(totalPages)}
          onClick={(e) => {
            setState(Number(e.currentTarget.id));
          }}
          className={inner({
            size,
            color,
            class: classNames?.inner,
            isSelected: Boolean(state == totalPages),
          })}
        >
          {totalPages}
        </div>,
      );
    }

    return pages;
  };

  return (
    <div className={base({ size, class: className })}>
      {control && (
        <IconButton
          icon="PiCaretLeft"
          size="sm"
          color="primary"
          onPress={() => {
            state != 1 && setState(state - 1);
          }}
          className={icon({ size })}
        />
      )}
      {pages()}
      {control && (
        <IconButton
          icon="PiCaretRight"
          size="sm"
          color="primary"
          onPress={() => {
            state != totalPages && setState(state + 1);
          }}
          className={icon({ size })}
        />
      )}
    </div>
  );
};

export default Pagination;
