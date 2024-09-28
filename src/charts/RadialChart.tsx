"use client";

import React from "react";
import { tv } from "tailwind-variants";
import Card, { ICardProps } from "../components/Media/Card";
import { IChartOptionsProps, defaultColorCharts, defaultLocales } from "./interfaces";
import ApexCharts from "react-apexcharts";
import colors from "../colors";
import ReactApexChart from "react-apexcharts";

const radialchart = tv({
  base: "h-[300px] w-full overflow-hidden p-1",
});

export interface IRadialChartProps {
  options?: IChartOptionsProps;
  data?: number[];
  title?: string;
  className?: string;
  xAxis?: string[];
  elevated?: boolean;
  toolbar?: boolean;
  hasCard?: boolean;
  propsCard?: Omit<ICardProps, "className">;
  isDark?: boolean;
  children?: React.ReactNode;
}

const RadialChart = React.forwardRef<ReactApexChart, IRadialChartProps>(
  (
    {
      className,
      children,
      hasCard = true,
      elevated = true,
      xAxis = [],
      data,
      toolbar = true,
      title,
      options,
      propsCard,
      isDark,
    },
    ref,
  ) => {
    const optionsBase: IChartOptionsProps | undefined = {
      ...options,
      theme: { mode: isDark ? "dark" : "light", ...options?.theme },
      chart: {
        type: "radialBar",
        background: "transparent",
        toolbar: { show: toolbar, offsetX: -5, offsetY: 10 },
        fontFamily: "Roboto, 'Nunito Sans', sans-serif",
        foreColor: isDark ? colors.default[300] : colors.default[900],
        ...options?.chart,
        locales: defaultLocales,
        defaultLocale: "pt-br",
      },
      dataLabels: {
        enabled: true,
        ...options?.dataLabels,
      },
      colors: options?.colors ? options.colors : defaultColorCharts,
      title: {
        text: title ? title : undefined,
        align: "left",
        offsetX: 10,
        offsetY: 10,
        style: { fontWeight: 700, fontSize: "14px" },
        ...options?.title,
      },
      plotOptions: {
        radialBar: {
          track: {
            background: isDark ? colors.dark[600] : colors.default[100],
          },
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              offsetY: 4,
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                let sum = 0;
                data?.map((value) => {
                  sum += Number(value);
                });
                return String(sum);
              },
            },
          },
        },
        ...options?.plotOptions,
      },
      labels: xAxis,
    };

    const Base = hasCard ? Card : "div";

    return (
      <Base
        elevated={hasCard ? elevated : undefined}
        bg={hasCard ? "surface" : undefined}
        className={radialchart({ class: className })}
        {...propsCard}
      >
        {children}
        <ApexCharts ref={ref} options={optionsBase} series={data} type="radialBar" height={"100%"} width={"100%"} />
      </Base>
    );
  },
);

export default RadialChart;
