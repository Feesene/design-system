"use client";

import React from "react";
import { Overlay, useModalOverlay, AriaModalOverlayProps } from "react-aria";
import { OverlayTriggerState } from "react-stately";
import { tv } from "tailwind-variants";
import Button from "../../elements/Form/Button";
import { MdClose } from "react-icons/md";

export interface IModalProps extends AriaModalOverlayProps {
  children: React.ReactNode;
  state: OverlayTriggerState;
  title?: string;
  colorSuccess?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  colorCancel?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  noClose?: boolean;
  successLabel?: string;
  cancelLabel?: string;
  size?: "sm" | "md" | "lg" | "xl";
  animation?: boolean;
  className?: string;
  classNames?: {
    inner?: string;
    title?: string;
    close?: string;
    body?: string;
    footer?: string;
  };
  onClickSucess?: () => void;
  onClickCancel?: () => void;
}

const modal = tv({
  slots: {
    base: "fixed bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center bg-black/75",
    inner: "flex min-h-[200px] flex-col justify-between overflow-hidden rounded-lg bg-primary-content dark:bg-dark-800",
    title:
      "flex w-full items-center justify-between border border-b-neutral-300 px-4 py-3 font-semibold text-default-950 dark:border-dark-800 dark:border-b-dark-600 dark:text-dark-100",
    close: "cursor-pointer text-default-600 hover:text-error-300 active:text-error-400",
    body: "flex flex-col items-center justify-center px-4 py-4",
    footer: "flex w-full justify-center gap-4 border border-t-neutral-300 dark:border-dark-800 dark:border-t-dark-600 ",
  },
  variants: {
    animation: {
      true: {
        base: "animate-fade animate-duration-200",
        inner: "animate-fade-up animate-duration-500",
      },
    },
    size: {
      sm: {
        inner: "min-w-[30%] gap-1",
        title: "py-3 text-sm",
        footer: "py-4",
      },
      md: {
        inner: "min-w-[40%] gap-2",
        title: "text-md py-3",
        footer: "py-4",
      },
      lg: {
        inner: "min-w-[50%] gap-4",
        title: "py-4 text-lg",
        footer: "py-5",
      },
      xl: {
        inner: "min-w-[60%] gap-8",
        title: "py-4 text-xl",
        footer: "py-5",
      },
    },
  },
});

const { base, inner, title: t, close, body, footer } = modal();

const Modal = ({
  state,
  className,
  classNames,
  size,
  colorCancel = "error",
  cancelLabel = "Cancelar",
  successLabel = "Confirmar",
  colorSuccess = "primary",
  onClickCancel,
  onClickSucess,
  noClose = false,
  title,
  children,
  isDismissable = true,
  animation = true,
  ...props
}: IModalProps) => {
  let ref = React.useRef(null);
  let { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  return (
    <Overlay>
      <div className={base({ class: className, size, animation })} {...underlayProps}>
        <div
          {...modalProps}
          ref={ref}
          className={inner({
            class: classNames?.inner,
            size,
            animation,
          })}
        >
          <div className={t({ class: classNames?.title, size })}>
            {title}
            <span
              className={close({ class: classNames?.close, size })}
              onClick={() => {
                !noClose && state.setOpen(false);
              }}
            >
              {!noClose && <MdClose />}
            </span>
          </div>
          <div className={body({ class: classNames?.body, size })}>{children}</div>
          <div className={footer({ class: classNames?.footer, size })}>
            {successLabel && (
              <Button
                onPress={() => {
                  state.setOpen(false);
                  onClickSucess && onClickSucess();
                }}
                size={size == "sm" ? "xs" : size == "md" ? "sm" : size == "lg" ? "md" : "lg"}
                variant="solid"
                color={colorSuccess}
              >
                {successLabel}
              </Button>
            )}
            {cancelLabel && (
              <Button
                onPress={() => {
                  state.setOpen(false);
                  onClickCancel && onClickCancel();
                }}
                size={size == "sm" ? "xs" : size == "md" ? "sm" : size == "lg" ? "md" : "lg"}
                variant="outline"
                color={colorCancel}
              >
                {cancelLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default Modal;
