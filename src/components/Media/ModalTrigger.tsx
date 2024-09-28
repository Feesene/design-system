"use client";

import React from "react";
import { ReactElement } from "react";
import { useOverlayTrigger, usePress } from "react-aria";
import { useOverlayTriggerState, OverlayTriggerProps } from "react-stately";
import Modal from "./Modal";

export interface IModalTriggerProps extends OverlayTriggerProps {
  children: any;
  label?: ReactElement;
  title?: string;
  colorSuccess?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  colorCancel?: "default" | "primary" | "secondary" | "info" | "success" | "warning" | "error";
  noClose?: boolean;
  successLabel?: string;
  cancelLabel?: string;
  size?: "sm" | "md" | "lg" | "xl";
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

const ModalTrigger = ({ children, className, label, ...props }: IModalTriggerProps) => {
  let ref = React.useRef(null);
  let state = useOverlayTriggerState(props);
  let { triggerProps, overlayProps } = useOverlayTrigger({ type: "dialog" }, state);

  let { pressProps } = usePress({
    ...triggerProps,
    ref,
  });

  return (
    <>
      {label && (
        <div {...pressProps} ref={ref}>
          {label}
        </div>
      )}
      {state.isOpen && (
        <Modal {...props} state={state}>
          {React.cloneElement(children, overlayProps)}
        </Modal>
      )}
    </>
  );
};

export default ModalTrigger;
