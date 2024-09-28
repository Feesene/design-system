"use client";

import React from "react";
import { tv } from "tailwind-variants";
import Card, { ICardProps } from "../components/Media/Card";
import { IChartDataProps, IChartOptionsProps, defaultColorCharts, defaultLocales } from "./interfaces";
import ApexCharts from "react-apexcharts";
import colors from "../colors";
import ReactApexChart from "react-apexcharts";

const barchart = tv({
  base: "relative h-[300px] w-full overflow-hidden p-4",
  variants: {
    sparkline: {
      true: "p-0",
    },
  },
});

export interface IBarChartProps {
  children?: React.ReactNode;
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
  hasCard?: boolean;
  sparkline?: boolean;
  propsCard?: Omit<ICardProps, "className">;
  isDark?: boolean;
}

const BarChart = React.forwardRef<ReactApexChart, IBarChartProps>(
  (
    {
      className,
      hasCard = true,
      sparkline = false,
      elevated = true,
      yAxisTitle,
      xAxisTitle,
      xAxis = [],
      grid = false,
      data,
      toolbar = true,
      title,
      options,
      propsCard,
      isDark = false,
      children,
    }: IBarChartProps,
    ref,
  ) => {
    const optionsBase: IChartOptionsProps | undefined = {
      ...options,
      theme: { mode: isDark ? "dark" : "light", ...options?.theme },
      chart: {
        type: "bar",
        background: "transparent",
        toolbar: { show: toolbar },
        sparkline: {
          enabled: sparkline,
        },
        fontFamily: "Roboto, 'Nunito Sans', sans-serif",
        foreColor: isDark ? colors.default[300] : colors.default[900],
        ...options?.chart,
        locales: defaultLocales,
        defaultLocale: "pt-br",
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        fillSeriesColor: false,
        ...options?.tooltip,
      },
      plotOptions: {
        bar: {
          dataLabels: { position: "top" },
        },
        ...options?.plotOptions,
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: "10px",
          fontWeight: "400",
          colors: [isDark ? colors.dark[100] : colors.default[800]],
        },
        ...options?.dataLabels,
      },
      stroke: {
        width: 1,
        ...options?.stroke,
      },
      grid: {
        borderColor: isDark ? colors.dark[600] : colors.default[100],
        show: !sparkline,
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
        title: {
          text: yAxisTitle,
          style: { fontWeight: 500, fontSize: "14px" },
        },
        labels: { show: !sparkline },
        ...options?.yaxis,
      },
      xaxis: {
        categories: xAxis,
        axisBorder: { color: isDark ? colors.dark[600] : colors.default[300] },
        labels: { show: !sparkline, rotate: -45 },
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
        className={barchart({ class: className, sparkline })}
        bg={hasCard ? "surface" : undefined}
        {...propsCard}
      >
        {children}
        <ApexCharts ref={ref} options={optionsBase} series={data} type="bar" height={"100%"} width={"100%"} />
      </Base>
    );
  },
);

export default BarChart;
