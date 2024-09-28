"use client";

import React, { createContext, useContext, useState } from "react";
import { IOverlayProps } from "../components/Media/Overlay";
import Overlay from "../components/Media/Overlay";
import { useOverlayTriggerState } from "react-stately";

type IPropsProvider = {
  children: React.ReactNode;
};

interface IShowOverlay extends Omit<IOverlayProps, "state"> {}

interface IOverlayProvider {
  showModal: (props: IShowOverlay) => void;
}

const OverlayContext = createContext<IOverlayProvider>({} as IOverlayProvider);

/**
 *
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
 *
 */
const OverlayProvider = ({ children }: IPropsProvider) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProps, setActiveProps] = useState<IShowOverlay>();

  const showModal = (props: IShowOverlay) => {
    setActiveProps(props);
    state.open();
    return;
  };

  let state = useOverlayTriggerState({
    isOpen,
    onOpenChange: (value) => {
      setIsOpen(value);
    },
  });

  // let { overlayProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <OverlayContext.Provider value={{ showModal }}>
      {state.isOpen && <Overlay {...activeProps} state={state} />}
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = (): IOverlayProvider => {
  const context = useContext(OverlayContext);

  return context;
};

export default OverlayProvider;
