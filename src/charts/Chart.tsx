"use client";

import React from "react";
import { tv } from "tailwind-variants";
import Card, { ICardProps } from "../components/Media/Card";
import ApexCharts, { Props } from "react-apexcharts";
import { IChartOptionsProps, defaultColorCharts, defaultLocales } from "./interfaces";
import colors from "../colors";
import ReactApexChart from "react-apexcharts";

const chart = tv({
  base: "relative h-[300px] w-full overflow-hidden p-4",
  variants: {
    sparkline: {
      true: "p-0",
    },
  },
});

export interface IChartProps extends Props {
  className?: string;
  elevated?: boolean;
  hasCard?: boolean;
  propsCard?: Omit<ICardProps, "className">;
  isDark?: boolean;
  children?: React.ReactNode;
}

const Chart = React.forwardRef<ReactApexChart, IChartProps>(
  ({ className, options, children, hasCard = true, elevated = true, type, propsCard, series, isDark = false }, ref) => {
    const Base = hasCard ? Card : "div";

    const optionsBase: IChartOptionsProps | undefined = {
      ...options,
      theme: { mode: isDark ? "dark" : "light", ...options?.theme },
      chart: {
        background: "transparent",
        fontFamily: "Roboto, 'Nunito Sans', sans-serif",
        foreColor: isDark ? colors.default[300] : colors.default[900],
        ...options?.chart,
        locales: defaultLocales,
        defaultLocale: "pt-br",
      },
      dataLabels: { style: { colors: [isDark ? colors.dark[100] : colors.default[800]] }, ...options?.dataLabels },
      xaxis: { axisBorder: { color: isDark ? colors.dark[600] : colors.default[300] }, ...options?.xaxis },
      grid: {
        borderColor: isDark ? colors.dark[600] : colors.default[100],
        ...options?.grid,
      },
      colors: options?.colors ? options?.colors : defaultColorCharts,
    };

    return (
      <Base
        elevated={hasCard ? elevated : undefined}
        bg={hasCard ? "surface" : undefined}
        className={chart({ class: className })}
        {...propsCard}
      >
        {children}
        <ApexCharts ref={ref} options={optionsBase} series={series} type={type} height={"100%"} width={"100%"} />
      </Base>
    );
  },
);

export default Chart;
