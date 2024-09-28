import { ApexOptions } from "apexcharts";

export interface IChartOptionsProps extends ApexOptions {}

export interface IChartDataProps {
  name?: string;
  type?: string;
  color?: string;
  group?: string;
  zIndex?: number;
  data:
    | (number | null)[]
    | {
        x: any;
        y: any;
        fill?: ApexFill;
        fillColor?: string;
        strokeColor?: string;
        meta?: any;
        goals?: any;
        barHeightOffset?: number;
        columnWidthOffset?: number;
      }[]
    | [number, number | null][]
    | [number, (number | null)[]][]
    | number[][];
}

export const defaultColorCharts = [
  "#93AFFD",
  "#B2E8D2",
  "#F3D8A8",
  "#F1B0B0",
  "#ADADAD",
  "#B5CFEC",
  "#5A81FA",
  "#88D9BE",
  "#EEC583",
  "#EA9393",
  "#888888",
  "#87A0D9",
  "#2A2FA9",
];

export const defaultLocales = [
  {
    name: "pt-br",
    options: {
      months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      toolbar: {
        exportToSVG: "Download SVG",
        exportToPNG: "Download PNG",
        exportToCSV: "Download CSV",
        selection: "Selecionar",
        selectionZoom: "Selecionar Zoom",
        zoomIn: "Aumentar Zoom",
        zoomOut: "Diminuir Zoom",
        pan: "Arrastar",
        reset: "Resetar",
      },
    },
  },
];
