"use client";

import React from "react";
import { tv } from "tailwind-variants";
import Card, { ICardProps } from "../components/Media/Card";
import { IChartDataProps, IChartOptionsProps, defaultColorCharts, defaultLocales } from "./interfaces";
import ApexCharts from "react-apexcharts";
import colors from "../colors";
import ReactApexChart from "react-apexcharts";

const linechart = tv({
  base: "relative h-[300px] w-full overflow-hidden p-4",
  variants: {
    sparkline: {
      true: "p-0",
    },
  },
});

export interface ILineChartProps {
  options?: IChartOptionsProps;
  data?: IChartDataProps[];
  title?: string;
  className?: string;
  xAxis?: string[] | number[];
  xAxisTitle?: string;
  yAxisTitle?: string;
  elevated?: boolean;
  grid?: boolean;
  toolbar?: boolean;
  sparkline?: boolean;
  zoom?: boolean;
  hasCard?: boolean;
  propsCard?: Omit<ICardProps, "className">;
  isDark?: boolean;
  children?: React.ReactNode;
}

const LineChart = React.forwardRef<ReactApexChart, ILineChartProps>(
  (
    {
      className,
      hasCard = true,
      sparkline = false,
      zoom = true,
      elevated = true,
      yAxisTitle,
      xAxisTitle,
      xAxis = [],
      grid = false,
      data,
      toolbar = true,
      options,
      propsCard,
      title,
      isDark = false,
      children,
    },
    ref,
  ) => {
    const optionsBase: IChartOptionsProps | undefined = {
      ...options,
      theme: { mode: isDark ? "dark" : "light", ...options?.theme },
      chart: {
        type: "line",
        background: "transparent",
        fontFamily: "Roboto, 'Nunito Sans', sans-serif",
        foreColor: isDark ? colors.default[300] : colors.default[900],
        toolbar: { show: toolbar },
        zoom: { enabled: zoom },
        sparkline: {
          enabled: sparkline,
        },
        ...options?.chart,
        locales: defaultLocales,
        defaultLocale: "pt-br",
      },
      dataLabels: {
        enabled: false,
        ...options?.dataLabels,
      },
      stroke: {
        curve: "smooth",
        width: 3,
        ...options?.stroke,
      },

      grid: {
        borderColor: isDark ? colors.dark[600] : colors.default[100],
        row: {
          colors: grid ? [colors.default[100], "transparent"] : undefined,
          opacity: grid ? 0.5 : 1,
        },
        ...options?.grid,
      },
      colors: options?.colors ? options.colors : defaultColorCharts,
      title: {
        text: title ? title : undefined,
        align: "left",
        style: { fontWeight: 700, fontSize: "14px" },
        ...options?.title,
      },
      yaxis: {
        labels: { show: !sparkline },
        title: {
          text: yAxisTitle,
          style: { fontWeight: 500, fontSize: "14px" },
        },
        ...options?.yaxis,
      },
      xaxis: {
        axisBorder: { color: isDark ? colors.dark[600] : "#CECECE" },
        labels: { show: !sparkline, rotate: -45 },
        categories: xAxis,
        title: {
          text: xAxisTitle,
          style: { fontWeight: 500, fontSize: "14px" },
        },
        ...options?.xaxis,
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
        floating: true,
        offsetY: -25,
        offsetX: -5,
        ...options?.legend,
      },
    };

    const Base = hasCard ? Card : "div";

    return (
      <Base
        elevated={hasCard ? elevated : undefined}
        bg={isDark ? "surface" : undefined}
        className={linechart({ class: className, sparkline })}
        {...propsCard}
      >
        {children}
        <ApexCharts ref={ref} options={optionsBase} series={data} type="line" height={"100%"} width={"100%"} />
      </Base>
    );
  },
);

export default LineChart;
