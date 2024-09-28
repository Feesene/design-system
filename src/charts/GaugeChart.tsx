"use client";

import React from "react";
import { tv } from "tailwind-variants";
import Card, { ICardProps } from "../components/Media/Card";
import { IChartOptionsProps, defaultLocales } from "./interfaces";
import ApexCharts from "react-apexcharts";
import colors from "../colors";
import ReactApexChart from "react-apexcharts";

const gaugechart = tv({
  base: "relative h-[300px] w-full overflow-hidden p-1",
});

export interface IGaugeChartProps {
  options?: IChartOptionsProps;
  data: number;
  title?: string;
  className?: string;
  elevated?: boolean;
  toolbar?: boolean;
  hasCard?: boolean;
  showLabel?: boolean;
  propsCard?: Omit<ICardProps, "className">;
  isDark?: boolean;
  children?: React.ReactNode;
}

const GaugeChart = React.forwardRef<ReactApexChart, IGaugeChartProps>(
  (
    {
      className,
      hasCard = true,
      showLabel = true,
      elevated = true,
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
      stroke: {
        colors: [isDark ? colors.dark[700] : "#FFF"],
      },
      colors: options?.colors ? options.colors : ["#5a81fa"],
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
          startAngle: -90,
          endAngle: 90,
          track: {
            background: isDark ? colors.dark[500] : colors.default[200],
            strokeWidth: "97%",
            margin: 8,
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: isDark ? colors.dark[700] : "#ccc",
              opacity: 1,
              blur: 1,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: "24px",
              fontWeight: 600,
              show: showLabel,
            },
          },
        },
        ...options?.plotOptions,
      },
    };

    const Base = hasCard ? Card : "div";

    return (
      <Base
        elevated={hasCard ? elevated : undefined}
        bg={hasCard ? "surface" : undefined}
        className={gaugechart({ class: className })}
        {...propsCard}
      >
        {children}
        <ApexCharts ref={ref} options={optionsBase} series={[data]} type="radialBar" height={"140%"} width={"100%"} />
      </Base>
    );
  },
);

export default GaugeChart;
