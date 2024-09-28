"use client";

import React from "react";
import { ExternalToast, Toaster, ToasterProps, toast as t } from "sonner";
import Spinner from "./Spinner";

type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);
type PromiseTResult<Data = any> =
  | string
  | React.ReactNode
  | ((data: Data) => React.ReactNode | string | Promise<React.ReactNode | string>);
type PromiseExternalToast = Omit<ExternalToast, "description">;
type PromiseData<ToastData = any> = PromiseExternalToast & {
  loading?: string | React.ReactNode;
  success?: PromiseTResult<ToastData>;
  error?: PromiseTResult;
  description?: PromiseTResult;
  finally?: () => void | Promise<void>;
};

let toast: {
  default: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  primary: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  success: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  info: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  warning: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  error: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  custom: (jsx: (id: number | string) => React.ReactElement, data?: ExternalToast) => string | number;
  message: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  dismiss: (id?: number | string) => string | number;
  loading: (message: string | React.ReactNode, data?: ExternalToast) => string | number;
  promise: <ToastData>(promise: PromiseT<ToastData>, data?: PromiseData<ToastData>) => string | number;
} = {
  default: (a, b) =>
    t(a, {
      ...b,
      className: ` dark:bg-dark-700 dark:text-white dark:border-dark-600 ${b?.className || ""}`,
      classNames: {
        ...b?.classNames,
        actionButton: `!bg-primary-400 focus-visible:ring-primary-300 ${b?.classNames?.actionButton || ""}`,
        closeButton: `bg-white dark:border-dark-600 dark:bg-dark-800 hover:dark:bg-dark-700 ${b?.classNames?.closeButton || ""}`,
      },
    }),
  primary: (a, b) =>
    t(a, {
      ...b,
      className: `bg-primary-50 dark:bg-primary-100 text-primary-500 border-primary-100 dark:border-primary-200 ${b?.className || ""}`,
      classNames: {
        ...b?.classNames,
        actionButton: `!bg-primary-400 focus-visible:ring-primary-300 ${b?.classNames?.actionButton || ""}`,
        closeButton: `bg-primary-50 ${b?.classNames?.closeButton || ""}`,
      },
    }),
  success: (a, b) =>
    t.success(a, {
      ...b,
      classNames: {
        ...b?.classNames,
        actionButton: `!bg-success-400 focus-visible:ring-success-300 ${b?.classNames?.actionButton || ""}`,
        closeButton: `bg-success-50 dark:border-success-400 ${b?.classNames?.closeButton || ""}`,
      },
    }),
  error: (a, b) =>
    t.error(a, {
      ...b,
      classNames: {
        ...b?.classNames,
        actionButton: `!bg-error-500 focus-visible:ring-error-400 ${b?.classNames?.actionButton || ""}`,
        closeButton: `bg-error-50 dark:border-error-400 ${b?.classNames?.closeButton || ""}`,
      },
    }),
  warning: (a, b) =>
    t.warning(a, {
      ...b,
      classNames: {
        ...b?.classNames,
        actionButton: `!bg-warning-400 focus-visible:ring-warning-300 ${b?.classNames?.actionButton || ""}`,
        closeButton: `bg-warning-50 dark:border-warning-400 ${b?.classNames?.closeButton || ""}`,
      },
    }),
  info: (a, b) =>
    t.info(a, {
      ...b,
      classNames: {
        ...b?.classNames,
        actionButton: `!bg-info-500 focus-visible:ring-info-400 ${b?.classNames?.actionButton || ""}`,
        closeButton: `bg-info-50 dark:border-info-400 ${b?.classNames?.closeButton || ""}`,
      },
    }),
  custom: (a, b) => t.custom(a, b),
  dismiss: (a) => t.dismiss(a),
  loading: (a, b) => t.loading(a, b),
  message: (a, b) => t.message(a, b),
  promise: (a, b) =>
    t.promise(a, {
      ...b,
      loading: "Carregando...",
      className: `dark:bg-dark-700 dark:border-dark-600 ${b?.className || ""}`,
      classNames: {
        ...b?.classNames,
        loading: `dark:text-white ${b?.classNames?.loading || ""}`,
        closeButton: `bg-white dark:border-dark-600 dark:bg-dark-800 ${b?.classNames?.closeButton || ""}`,
      },
    }),
};

export default toast;

/**
 * O componente Toast é uma utilidade React projetada para exibir mensagens breves e informativas na interface do usuário de forma não intrusiva. Geralmente utilizado para fornecer feedback ao usuário sobre o resultado de uma ação ou para alertar sobre eventos importantes.
 *
 * Para mais possibilidades: 
 * [https://sonner.emilkowal.ski/](https://sonner.emilkowal.ski/)
 * 
 * ### Como usar
 * `Na pagina principal`
 *
 * ```tsx
 * <>
 *  <Toaster />
 *  <App/>
 * </>
 * ```
 *
 * `para usar`
 *
 * ```tsx
        () => {
            toast.info("Informação", {
              position: "top-left",
              description: "Descrição do evento",
            });
            toast.promise(
              async () => {
                await delay(2000);
                return "Enviado com sucesso !";
              },
              {
                loading: "Enviando...",
                success: (data) => {
                  return data;
                },
                error: (value) => value.message,
              },
            );
            toast.error("Erro", {
              position: "bottom-left",
              dismissible: false,
              closeButton: false,
            });
            toast.warning("Atenção", { position: "bottom-right" });
        }
 * ```
 *
 */
export const ToasterProvider = (props: ToasterProps) => {
  return (
    <Toaster
      closeButton
      position="top-right"
      pauseWhenPageIsHidden
      icons={{ loading: <Spinner size="sm" /> }}
      {...props}
      visibleToasts={4}
      toastOptions={{
        classNames: {
          toast:
            "transition-all shadow-md focus-within:ring-0 focus:outline-none dark:focus:outline-none dark:focus-within:outline-none focus-within:outline-none focus-visible:outline-dashed dark:focus-visible:outline-dashed focus-visible:outline-1 dark:focus-visible:outline-1 dark:focus-visible:outline-offset-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-default-300 dark:outline-default-100 dark:focus-visible:outline-dark-400",
          actionButton: "focus-visible:ring-[2px] focus-visible:ring-offset-1 focus:ring-none",
          cancelButton: "!bg-default-400",
          closeButton: "hover:shadow-sm dark:shadow-dark-500 outline-focused transition-all focus-within:ring-0",
          warning: "bg-warning-50 dark:bg-warning-100 text-warning-500 border-warning-100 dark:border-warning-200",
          error:
            "bg-error-50 dark:bg-error-100 dark:text-error-500 text-error-500 border-error-100 dark:border-error-200",
          success:
            "bg-success-50 dark:bg-success-100 dark:text-success-500 text-success-500 border-success-100 dark:border-success-200",
          info: "bg-info-50 dark:bg-info-100 text-info-600 border-info-100 dark:border-info-200",
        },
      }}
    />
  );
};
