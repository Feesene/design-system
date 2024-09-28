"use client";

import React from "react";
import { tv } from "tailwind-variants";
import Card, { ICardProps } from "../components/Media/Card";
import { IChartOptionsProps, defaultColorCharts, defaultLocales } from "./interfaces";
import ApexCharts from "react-apexcharts";
import colors from "../colors";
import ReactApexChart from "react-apexcharts";

const piechart = tv({
  base: "relative h-[300px] w-full overflow-hidden p-1",
});

export interface IPieChartProps {
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

const PieChart = React.forwardRef<ReactApexChart, IPieChartProps>(
  (
    {
      className,
      hasCard = true,
      elevated = true,
      xAxis = [],
      data,
      toolbar = true,
      title,
      options,
      propsCard,
      isDark = false,
      children,
    },
    ref,
  ) => {
    const optionsBase: IChartOptionsProps | undefined = {
      ...options,
      theme: { mode: isDark ? "dark" : "light", ...options?.theme },
      stroke: {
        colors: [isDark ? colors.dark[700] : "#FFF"],
      },
      chart: {
        type: "pie",
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
      responsive: options?.responsive
        ? options.responsive
        : [
            {
              breakpoint: 100,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
      labels: xAxis,
      legend: {
        position: "right",
        horizontalAlign: "center",
        floating: true,
        offsetY: 25,
        offsetX: 10,
        ...options?.legend,
      },
    };

    const Base = hasCard ? Card : "div";

    return (
      <Base
        elevated={hasCard ? elevated : undefined}
        bg={hasCard ? "surface" : undefined}
        className={piechart({ class: className })}
        {...propsCard}
      >
        {children}
        <ApexCharts ref={ref} options={optionsBase} series={data} type="pie" height={"100%"} width={"100%"} />
      </Base>
    );
  },
);

export default PieChart;
