"use client";

import React, { useState } from "react";
import { Overlay as OverlayAria, useModalOverlay, AriaModalOverlayProps } from "react-aria";
import { OverlayTriggerState } from "react-stately";
import { tv } from "tailwind-variants";
import Button, { IButtonProps } from "../../elements/Form/Button";
import { MdClose } from "react-icons/md";
import Form from "../../elements/Form/Form";
import ReactFocusLock from "react-focus-lock";

export interface IOverlayProps extends AriaModalOverlayProps {
  body?: (props: {
    state: OverlayTriggerState;
    setValues: (values?: any) => void;
    errorMessage: any;
  }) => React.ReactElement;
  footer?: (state?: OverlayTriggerState) => React.ReactElement;
  state: OverlayTriggerState;
  title?: string;
  colorSuccess?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  colorCancel?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  noClose?: boolean;
  successLabel?: string;
  cancelLabel?: string;
  size?: "sm" | "md" | "lg" | "xl";
  isForm?: boolean;
  hiddenFooter?: boolean;
  className?: string;
  classNames?: {
    inner?: string;
    title?: string;
    close?: string;
    body?: string;
    footer?: string;
  };
  animation?: boolean; 
  successProps?: IButtonProps;
  cancelProps?: IButtonProps;
  onClickSucess?: (props: {
    state: OverlayTriggerState;
    values: any;
    setErrorMessage: (value?: any) => void;
  }) => Promise<boolean | void> | boolean | void;
  onClickCancel?: (props: {
    state: OverlayTriggerState;
    values: any;
    setErrorMessage: (value?: any) => void;
  }) => Promise<boolean | void> | boolean | void;
}

const modal = tv({
  slots: {
    base: "fixed bottom-0 left-0 right-0 top-0 z-[100] flex items-center justify-center bg-black/75",
    inner: "flex min-h-[200px] flex-col justify-between overflow-hidden rounded-lg bg-default-50 dark:bg-dark-800",
    title: "flex w-full items-center px-4 py-3 font-semibold text-default-950 dark:text-dark-100",
    close:
      "cursor-pointer text-default-600 hover:text-error-300 active:text-error-400 dark:hover:text-primary-400 dark:active:text-primary-500",
    body: "flex flex-col items-center justify-center px-4 py-4",
    footer: "flex w-full justify-center gap-4 border dark:border-dark-800 dark:border-t-dark-300",
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
    hasTitle: {
      true: { title: "justify-between border border-b-neutral-300 dark:border-dark-800 dark:border-b-dark-300" },
      false: { title: "justify-end" },
    },
  },
});

const { base, inner, title: t, close, body: b, footer: f } = modal();

/**
 * ### Como usar
 * `Em index.tsx`
 *
 * ```tsx
 * <OverlayProvider>
 *    <App/>
 * </OverlayProvider>
 * ```
 *
 * `No App.tsx`
 *
 * ```tsx
 * const { showModal } = useOverlay();
 *
 * showModal({ props });
 * ```
 */
const Overlay = ({
  state,
  className,
  classNames,
  size = "md",
  colorCancel = "error",
  cancelLabel = "Cancelar",
  successLabel = "Confirmar",
  colorSuccess = "primary",
  animation = true,
  onClickCancel,
  onClickSucess,
  noClose = false,
  footer,
  title,
  body,
  isDismissable = true,
  cancelProps,
  successProps,
  isForm = true,
  hiddenFooter = false,
  ...props
}: IOverlayProps) => {
  let ref = React.useRef(null);
  let { modalProps, underlayProps } = useModalOverlay(props, state, ref);
  const [values, changeValues] = useState<any>();
  const [errorMessage, changeErrorMessage] = useState<any>(true);

  const setValues = (value?: any) => {
    value && changeValues(value);
  };

  const setErrorMessage = (value?: any) => {
    errorMessage && changeErrorMessage(value);
  };

  return (
    <OverlayAria>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!isForm) return;
          const result = onClickSucess && (await onClickSucess({ state, values, setErrorMessage }));
          if (result == true || result == undefined) state.setOpen(false);
        }}
      >
        <ReactFocusLock autoFocus>
          <div className={base({ class: className, size, animation })} {...underlayProps}>
            <div {...modalProps} ref={ref} className={inner({ class: classNames?.inner, size, animation })}>
              <div className={t({ class: classNames?.title, size, hasTitle: Boolean(title) })}>
                {title}
                <input autoFocus tabIndex={-1} className="h-0 w-0 outline-none" />
                <span
                  className={close({ class: classNames?.close, size })}
                  onClick={() => {
                    !noClose && state.setOpen(false);
                  }}
                >
                  {!noClose && <MdClose />}
                </span>
              </div>

              {body && (
                <div className={b({ class: classNames?.body, size })}>{body({ state, setValues, errorMessage })}</div>
              )}
              {!hiddenFooter && (
                <div className={f({ class: classNames?.footer, size })}>
                  {successLabel && (
                    <Button
                      onPress={async () => {
                        if (isForm) return;
                        const result = onClickSucess && (await onClickSucess({ state, values, setErrorMessage }));
                        if (result == true || result == undefined) state.setOpen(false);
                      }}
                      type={isForm ? "submit" : "button"}
                      size={size}
                      variant="solid"
                      color={colorSuccess}
                      {...successProps}
                    >
                      {successLabel}
                    </Button>
                  )}
                  {cancelLabel && (
                    <Button
                      onPress={async () => {
                        const result = onClickCancel && (await onClickCancel({ state, values, setErrorMessage }));
                        if (result == true || result == undefined) state.setOpen(false);
                      }}
                      size={size}
                      variant="outline"
                      color={colorCancel}
                      {...cancelProps}
                    >
                      {cancelLabel}
                    </Button>
                  )}
                  {footer && footer(state)}
                </div>
              )}
            </div>
          </div>
        </ReactFocusLock>
      </Form>
    </OverlayAria>
  );
};

export default Overlay;
