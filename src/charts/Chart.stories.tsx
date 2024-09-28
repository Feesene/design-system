import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Chart, { IChartProps } from "./Chart";
import { IChartDataProps } from "./interfaces";
import { useDarkMode } from "storybook-dark-mode";

const meta = {
  component: Chart,
  args: {
    elevated: true,
    hasCard: true,
    className: "",
    options: {},
    propsCard: {},
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<IChartProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicExample: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<IChartDataProps[] | undefined>([
      { name: "Desktops", data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
      { name: "PC", data: [41, 35, 51, 49, 62, 69, 91, 148, 10] },
      { name: "Geladeiras", data: [60, 70, 20, 10, 16, 30, 40, 60, 80] },
    ]);

    return (
      <Chart
        {...props}
        isDark={dark}
        // options={{ chart: { fontFamily: "monospace", offsetX: 10 }, title: { text: "Titulo" } }}
        series={series}
      />
    );
  },
};

export const HorizontalBarExample: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<IChartDataProps[] | undefined>([
      {
        name: "Móveis",
        data: [44, 55, 41, 37, 22, 43, 21],
      },
      {
        name: "Eletro",
        data: [53, 32, 33, 52, 13, 43, 32],
      },
      {
        name: "Celulares",
        data: [12, 17, 11, 9, 15, 11, 20],
      },
      {
        name: "Geladeiras",
        data: [9, 7, 5, 8, 6, 9, 4],
      },
      {
        name: "Camas",
        data: [25, 12, 19, 32, 25, 24, 10],
      },
    ]);

    const [options] = React.useState<ApexCharts.ApexOptions>({
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "Vendas do ano",
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    });

    return <Chart {...props} isDark={dark} options={options} series={series} type="bar" className="h-[400px]" />;
  },
};

export const MixedExample: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<IChartDataProps[] | undefined>([
      {
        name: "Setor 1",
        type: "column",
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
      },
      {
        name: "Setor 2",
        type: "area",
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
      },
      {
        name: "Setor 3",
        type: "line",
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
      },
    ]);

    const [options] = React.useState<ApexCharts.ApexOptions>({
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [
        "01/01/2024",
        "02/01/2024",
        "03/01/2024",
        "04/01/2024",
        "05/01/2024",
        "06/01/2024",
        "07/01/2024",
        "08/01/2024",
        "09/01/2024",
        "10/01/2024",
        "11/01/2024",
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Produtividade",
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          },
        },
      },
    });

    return <Chart {...props} isDark={dark} options={options} series={series} type="line" className="h-[400px]" />;
  },
};

export const FunnelExample: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<IChartDataProps[] | undefined>([
      {
        name: "Qtde",
        data: [1380, 1100, 990, 880, 740, 548, 330, 200],
      },
    ]);

    const [options] = React.useState<ApexCharts.ApexOptions>({
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          barHeight: "80%",
          isFunnel: true,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        dropShadow: {
          enabled: true,
        },
      },
      title: {
        text: "Quantidade de funcionários",
        align: "center",
      },
      xaxis: {
        categories: [
          "Categoria 1",
          "Categoria 2",
          "Categoria 3",
          "Categoria 4",
          "Categoria 5",
          "Categoria 6",
          "Categoria 7",
          "Categoria 8",
        ],
      },
      legend: {
        show: false,
      },
    });

    return <Chart {...props} isDark={dark} options={options} series={series} type="bar" className="h-[400px]" />;
  },
};

export const RadarExample: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<IChartDataProps[] | undefined>([
      {
        name: "Series 1",
        data: [80, 50, 60, 40, 100, 20],
      },
    ]);

    const [options] = React.useState<ApexCharts.ApexOptions>({
      chart: {
        height: 350,
        type: "radar",
      },
      title: {
        text: "Basic Radar Chart",
      },
      xaxis: {
        categories: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
      },
    });

    return <Chart {...props} isDark={dark} options={options} series={series} type="radar" className="h-[400px]" />;
  },
};

export const BubbleExample: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<IChartDataProps[] | undefined>([
      {
        name: "Tipo 1",
        data: [
          [10, 10, 40],
          [50, 20, 35],
          [40, 82, 25],
          [80, 21, 30],
          [60, 93, 15],
          [5, 62, 8],
          [90, 56, 15],
          [30, 68, 16],
          [10, 90, 20],
        ],
      },
      {
        name: "Tipo 2",
        data: [
          [25, 43, 8],
          [42, 51, 40],
          [61, 76, 28],
          [36, 68, 16],
          [74, 40, 24],
          [89, 22, 14],
          [52, 63, 12],
          [61, 85, 10],
          [4, 76, 5],
        ],
      },
      {
        name: "Tipo 3",
        data: [
          [82, 22, 40],
          [20, 10, 30],
          [44, 63, 25],
          [25, 53, 11],
          [56, 72, 30],
          [97, 47, 12],
          [82, 61, 10],
          [71, 34, 4],
          [30, 30, 13],
        ],
      },
      {
        name: "Tipo 4",
        data: [
          [60, 71, 20],
          [90, 22, 12],
          [50, 34, 30],
          [40, 78, 38],
          [70, 15, 24],
          [60, 47, 4],
          [40, 86, 22],
          [30, 51, 45],
          [34, 2, 4],
        ],
      },
    ]);

    const [options] = React.useState<ApexCharts.ApexOptions>({
      chart: {
        height: 350,
        type: "bubble",
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      plotOptions: { bubble: { zScaling: false } },
      title: {
        text: "Simple Bubble Chart",
      },
      xaxis: {
        tickAmount: 12,
        type: "category",
      },
      yaxis: {
        max: 100,
      },
    });

    return <Chart {...props} isDark={dark} options={options} series={series} type="bubble" className="h-[400px]" />;
  },
};

