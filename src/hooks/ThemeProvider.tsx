"use client";

import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as TPN } from "next-themes";
import Cookies from "js-cookie";

export interface IThemeProvider {
  theme: string;
  changeTheme: (value: string) => void;
}

const ThemeContext = createContext<IThemeProvider>({} as IThemeProvider);

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const themeFromCookie = Cookies.get("theme");
    return themeFromCookie
      ? themeFromCookie
      : window.matchMedia("(prefers-color-scheme: dark)").matches == true
        ? "dark"
        : "light";
  } else return null;
};

const ThemeProvider = ({ children, initialTheme }: { children: React.ReactNode; initialTheme?: string }) => {
  const [theme, setTheme] = useState<string>(initialTheme || getInitialTheme() || "light");

  const changeTheme = (newTheme: string) => {
    if (typeof window !== "undefined") {
      Cookies.set("theme", newTheme);
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      <TPN
        disableTransitionOnChange
        attribute="class"
        defaultTheme={initialTheme}
        forcedTheme={theme}
        enableSystem={false}
      >
        {children}
      </TPN>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): IThemeProvider => {
  const context = useContext(ThemeContext);

  return context;
};

export default ThemeProvider;
