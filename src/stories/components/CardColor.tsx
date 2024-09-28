import React, { useState } from "react";
import Icon from "../../elements/Media/Icon";
import Tooltip from "../../components/Media/Tooltip";

export interface InterfaceColors {
  name?: string;
  hex?: string;
  textLight?: string;
  textDark?: string;
  desc?: string;
  colorDesc?: string;
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return false;

  const rgb = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };

  return `(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export const C = ({ props, children }: { props: { color: string; based?: boolean }; children: React.ReactNode }) => {
  const { color, based } = props;
  const [state, setState] = useState(false);
  const [copied, setCopied] = useState(false);

  function sum(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return false;

    const rgb = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };

    return rgb.r + rgb.g + rgb.b;
  }

  return (
    <div className="relative h-36">
      <div
        style={{ backgroundColor: color }}
        onMouseEnter={() => {
          setState(true);
        }}
        onMouseLeave={() => {
          setState(false);
        }}
        className={`dark relative flex h-20 w-20 flex-col items-center justify-center rounded-md transition-all ${
          state && "h-32 w-32 !shadow-lg"
        }`}
      >
        {state && (
          <>
            <p
              className={`!m-0 animate-fade-up font-semibold transition-all animate-duration-300 ${
                state && Number(sum(color)) < 550 ? "!text-white" : "!text-black"
              }`}
            >
              {children}
            </p>
            <p
              className={`!m-0 animate-fade-up font-semibold tracking-wide animate-duration-300 ${
                state && Number(sum(color)) < 550 ? "!text-white" : "!text-black"
              }`}
            >
              {color?.toUpperCase()}
            </p>
            <p
              className={`!m-0 animate-fade-up font-semibold animate-duration-300 ${
                state && Number(sum(color)) < 550 ? "!text-white" : "!text-black"
              }`}
            >
              {color && hexToRgb(color)}
            </p>

            <Icon
              name="PiCopy"
              onMouseLeave={() => {
                setCopied(false);
              }}
              onClick={() => {
                setCopied(true);
                console.log(color);
                navigator.clipboard.writeText(color);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
              className={`absolute right-2 top-2 text-default-500
                  ${state && Number(sum(color)) < 550 ? "hover:!text-default-300" : "hover:!text-default-700"} ${
                    state && Number(sum(color)) < 550 ? "active:!text-white" : "active:!text-default-900"
                  }`}
            />
          </>
        )}
      </div>
      {!state && (
        <>
          <p
            className={`${
              based
                ? "!font-black !text-black dark:!text-white"
                : "font-semibold !text-default-900 dark:!text-default-300"
            } absolute bottom-10 !m-0 gap-4`}
          >
            {children}
            {based && "*"}
          </p>
          <p className={`absolute bottom-5 !m-0 font-normal tracking-wide !text-default-700 dark:!text-default-400`}>
            {color?.toUpperCase()}
          </p>
        </>
      )}
    </div>
  );
};

export const FatherSimpleCard = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-36 w-full items-center justify-evenly gap-3">{children}</div>;
};
