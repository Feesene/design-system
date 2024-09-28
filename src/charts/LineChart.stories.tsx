import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import LineChart, { ILineChartProps } from "./LineChart";
import { IChartDataProps } from "./interfaces";
import AreaChart from "./AreaChart";
import Card from "../components/Media/Card";
import { useDarkMode } from "storybook-dark-mode";

const meta = {
  component: LineChart,
  args: {
    title: "Vendas do ano",
    xAxisTitle: "",
    yAxisTitle: "",
    elevated: true,
    grid: false,
    toolbar: true,
    zoom: true,
    hasCard: true,
    sparkline: false,
    className: "",
    options: {},
    xAxis: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Aug", "Set", "Out", "Nov", "Dez"],
    isDark: false,
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<ILineChartProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<IChartDataProps[] | undefined>([
      { name: "Desktops", data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
      { name: "PC", data: [41, 35, 51, 49, 62, 69, 91, 148, 10] },
      { name: "Geladeiras", data: [60, 70, 20, 10, 16, 30, 40, 60, 80] },
    ]);

    return <LineChart data={series} {...props} isDark={dark} />;
  },
};

export const ExampleBrush: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<IChartDataProps[] | undefined>([
      { name: "Desktops", data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 150, 160, 170] },
      { name: "PC", data: [41, 35, 51, 49, 62, 69, 91, 148, 10, 50, 30, 40] },
      { name: "Geladeiras", data: [60, 70, 20, 10, 16, 30, 40, 60, 80, 90, 120, 140] },
    ]);

    return (
      <Card bg="surface" className="flex items-center justify-center py-4">
        <LineChart
          data={series}
          className="p-0"
          zoom={false}
          {...props}
          isDark={dark}
          hasCard={false}
          options={{
            chart: {
              id: "chart1",
              toolbar: {
                autoSelected: "pan",
                show: false,
              },
            },
          }}
        />
        <AreaChart
          data={series}
          elevated={false}
          toolbar={false}
          isDark={dark}
          propsCard={{ style: { height: "40px", width: "90%" } }}
          sparkline={true}
          options={{
            chart: {
              sparkline: { enabled: true },
              id: "chart2",
              brush: {
                target: "chart1",
                enabled: true,
              },
              selection: {
                enabled: true,
                xaxis: {
                  min: 1,
                  max: 6,
                },
              },
            },
          }}
        />
      </Card>
    );
  },
};

export const ExampleDataLable: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<IChartDataProps[] | undefined>([
      { name: "Desktops", data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
      { name: "PC", data: [41, 35, 51, 49, 62, 69, 91, 148, 10] },
      { name: "Geladeiras", data: [60, 70, 20, 10, 16, 30, 40, 60, 80] },
    ]);

    return <LineChart data={series} {...props} isDark={dark} options={{ dataLabels: { enabled: true } }} />;
  },
};

export const ExampleAnotations: Story = {
  render: (props) => {
    const dark = useDarkMode();
    const [series] = React.useState<IChartDataProps[] | undefined>([
      { name: "Desktops", data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
      { name: "PC", data: [41, 35, 51, 49, 62, 69, 91, 148, 10] },
      { name: "Geladeiras", data: [60, 70, 20, 10, 16, 30, 40, 60, 80] },
    ]);

    return (
      <LineChart
        data={series}
        {...props}
        isDark={dark}
        propsCard={{ style: { height: "600px" } }}
        options={{
          annotations: {
            yaxis: [
              {
                y: 115,
                borderColor: "#D95A5A",
                label: {
                  borderColor: "#D95A5A",
                  style: {
                    color: "#fff",
                    background: "#D95A5A",
                  },
                  text: "Limit",
                },
              },
              {
                y: 80,
                y2: 90,
                borderColor: "#000",
                fillColor: "#FEB019",
                opacity: 0.2,
                label: {
                  borderColor: "#333",
                  style: {
                    fontSize: "10px",
                    color: "#333",
                    background: "#FEB019",
                  },
                  text: "Attention",
                },
              },
            ],

            xaxis: [
              {
                x: "Jun",
                strokeDashArray: 0,
                borderColor: "#775DD0",
                label: {
                  borderColor: "#775DD0",
                  style: {
                    color: "#fff",
                    background: "#775DD0",
                  },
                  text: "Tempo limite",
                },
              },
              {
                x: "Mar",
                x2: "Abr",
                fillColor: "#B3F7CA",
                opacity: 0.4,
                label: {
                  borderColor: "#B3F7CA",
                  style: {
                    fontSize: "10px",
                    color: "#fff",
                    background: "#00E396",
                  },
                  offsetY: -10,
                  text: "Intervalo das datas",
                },
              },
            ],
            points: [
              {
                x: "Mai",
                y: 60,
                marker: {
                  size: 8,
                  fillColor: "#fff",
                  strokeColor: "red",
                  radius: 2,
                  cssClass: "apexcharts-custom-class",
                },
                label: {
                  borderColor: "#FF4560",
                  offsetY: 0,
                  style: {
                    color: "#fff",
                    background: "#FF4560",
                  },
                  text: "Meta",
                },
              },
            ],
          },
        }}
      />
    );
  },
};

