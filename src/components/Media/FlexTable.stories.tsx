import { Meta, StoryObj } from "@storybook/react";
import FlexTable, { IFlexTableMethods, IFlexTableProps } from "./FlexTable";
import React, { useRef, useState } from "react";
import moment from "moment";
import { addDays } from "date-fns";
import Button from "../../elements/Form/Button";

interface IType {
  id?: number;
  nome?: string;
  cpf?: string | number;
  setor?: string;
}

const data = [
  { id: 1, nome: "Felipe Sene Ribeiro", cpf: 45645148, setor: "TI" },
  { id: 2, nome: "Wesley", cpf: 32312, setor: "Manutenção" },
  { id: 3, nome: "Lucas", cpf: 3213123123, setor: "Info" },
  { id: 4, nome: "Bagliane", cpf: 33332112333, setor: "Controle" },
  { id: 5, nome: "Joelmir", cpf: 46145601149, setor: "Prepa" },
];

const meta = {
  component: FlexTable,
  args: {
    striped: false,
    rounded: true,
    compact: false,
    cardHeader: false,
    reactive: false,
    gap: "md",
    size: "md",
    clickable: false,
    noHeader: false,
    dividerData: false,
    dividerHeader: false,
    elevated: false,
    className: "",
    data: data,
    height: "",
    minHeight: "",
  },
  argTypes: {
    children: { control: false },
    data: { control: false },
    cardProps: { control: false },
    cellTextProps: { control: false },
    labelTextProps: { control: false },
    columns: { control: false },
    pagination: { control: false },
    inputSearch: { control: false },
    selectedRows: { control: false },
    classNames: { control: false },
    sortInitialOptions: { control: false },
    filterInitialOptions: { control: false },
    rowClass: { control: false },
    checkRow: { control: false },
  },
  tags: ["autodocs"],
} satisfies Meta<IFlexTableProps<IType>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (props: IFlexTableProps<IType>) => {
    const ref = useRef<IFlexTableMethods<IType>>();

    return (
      <FlexTable
        ref={ref}
        onClickRow={({ row, index }) => {
          // ref.current && ref.current.setFocusCell({ colIndex: 3, rowIndex: 3 });
          // console.log(ref && ref.current && ref.current.getData());
          // console.log({ row, index });
        }}
        columns={{
          id: { label: "ID", grow: 0.2 },
          nome: {
            label: "Nome",
          },
          cpf: {
            label: "CPF",
            editable: true,
            // inputProps: { type: "time" },
            onEdit: ({ value }) => {
              console.log(value);
            },
          },
          setor: {
            // editable: true,
            label: "Setor",
          },
        }}
        {...props}
        // className=" overflow-x-auto"
        // classNames={{ table: "w-[2000px]" }}
      />
    );
  },
};

const lista = [
  {
    id: "4feddd3e-94ae-470c-aed5-f5988ded7afe",
    entradaManha: "07:12",
    saidaManha: "11:00",
    entradaTarde: "12:00",
    saidaTarde: "17:20",
    dif_min: 20,
    saldoAnt: 1020,
    mes: "ABRIL/2024",
    data: "2024-04-26T00:00:00.000Z",
    diaSemana: "Sex",
    status: "",
    nome: "OTAVIO PEREIRA DA SILVA",
    matricula: "006835",
    setor: "EXPEDIÇÃO",
    expediente: "SEGaSEX-07:12/11:00_12:00/17:00",
    saldoanterior: 1000,
  },
  {
    id: "61a4b563-9f34-4d54-b083-9c58c7ed009c",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 1020,
    mes: "",
    data: "2024-04-27T00:00:00.000Z",
    diaSemana: "Sab",
    status: "COMPENSADO",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "816cb11c-bf1a-4b8a-8d93-175f9952f91d",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 1020,
    mes: "",
    data: "2024-04-28T00:00:00.000Z",
    diaSemana: "Dom",
    status: "DOMINGO",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "4d9c8a7a-2d1b-49ab-a3c0-5c3ba8db5ed4",
    entradaManha: "07:12",
    saidaManha: "11:00",
    entradaTarde: "12:00",
    saidaTarde: "17:40",
    dif_min: 40,
    saldoAnt: 1060,
    mes: "",
    data: "2024-04-29T00:00:00.000Z",
    diaSemana: "Seg",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "7ac89c37-fd37-4fd0-9a07-c582b238aa7a",
    entradaManha: "07:12",
    saidaManha: "11:00",
    entradaTarde: "12:10",
    saidaTarde: "15:55",
    dif_min: -75,
    saldoAnt: 1013,
    mes: "",
    data: "2024-04-30T00:00:00.000Z",
    diaSemana: "Ter",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "55a6ebc4-27aa-405d-ad04-5f23352e0c04",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 1013,
    mes: "",
    data: "2024-05-01T00:00:00.000Z",
    diaSemana: "Qua",
    status: "FERIADO",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "8dfd7cd5-abaa-42da-a806-af1d308aa9bc",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 1013,
    mes: "",
    data: "2024-05-02T00:00:00.000Z",
    diaSemana: "Qui",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "077edd86-3318-449c-b629-99e26a70fa33",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 1013,
    mes: "",
    data: "2024-05-03T00:00:00.000Z",
    diaSemana: "Sex",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "ade6a2c1-05ce-4ea9-8d79-d25a4aaca05d",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 1013,
    mes: "",
    data: "2024-05-04T00:00:00.000Z",
    diaSemana: "Sab",
    status: "COMPENSADO",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "c9455c38-81ec-43a7-bff8-ada17da17669",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 1013,
    mes: "",
    data: "2024-05-05T00:00:00.000Z",
    diaSemana: "Dom",
    status: "DOMINGO",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "102590bf-c3a8-4a0c-b9c8-b91edd9267f8",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 1013,
    mes: "",
    data: "2024-05-06T00:00:00.000Z",
    diaSemana: "Seg",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "028cbec2-6245-44c1-b297-3116cc0548e5",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 1013,
    mes: "",
    data: "2024-05-07T00:00:00.000Z",
    diaSemana: "Ter",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "31579509-939f-4591-922c-09d4c0d10f8f",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 1013,
    mes: "",
    data: "2024-05-08T00:00:00.000Z",
    diaSemana: "Qua",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "2fe8b617-3ab4-4c9a-9655-d5f002fa97f1",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 1013,
    mes: "",
    data: "2024-05-09T00:00:00.000Z",
    diaSemana: "Qui",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "0dc43133-2042-4f25-b650-bc2da1059daf",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 1013,
    mes: "",
    data: "2024-05-10T00:00:00.000Z",
    diaSemana: "Sex",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "a9844443-f90d-4e52-acbe-eafa872b09d9",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-11T00:00:00.000Z",
    diaSemana: "Sab",
    status: "COMPENSADO",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "2cbeeb79-37b4-4721-b80c-3c90bbaddba2",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-12T00:00:00.000Z",
    diaSemana: "Dom",
    status: "DOMINGO",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "030cd5b2-a513-4d0b-8832-b879a7261cbb",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-13T00:00:00.000Z",
    diaSemana: "Seg",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "024322cb-819b-4354-baa2-89c6a28465b8",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-14T00:00:00.000Z",
    diaSemana: "Ter",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "90d0a9e8-f0d7-486d-b9b7-8fff9c366f7e",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-15T00:00:00.000Z",
    diaSemana: "Qur",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "62af66e5-bc77-401a-9f0a-93f29f7e4dc2",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-16T00:00:00.000Z",
    diaSemana: "Qui",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "d1a1de81-02a8-4093-a715-ab694f7f6d02",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-17T00:00:00.000Z",
    diaSemana: "Sex",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "27abfd37-7e54-4f34-a698-7d62da742da8",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-18T00:00:00.000Z",
    diaSemana: "Sab",
    status: "COMPENSADO",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "c53cfb1e-e3e3-418c-bb08-b0e5476f85d5",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-19T00:00:00.000Z",
    diaSemana: "Dom",
    status: "DOMINGO",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "ae5f876e-1c30-4e4f-bc10-bba7104ad2df",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-20T00:00:00.000Z",
    diaSemana: "Seg",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "82a84f1a-2e2e-4afb-8c69-8fed62ab2214",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-21T00:00:00.000Z",
    diaSemana: "Ter",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "be3857d1-d1cc-486a-ad1a-bbc0ae1bec00",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-22T00:00:00.000Z",
    diaSemana: "Qua",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "5147a017-b5ce-44ca-9317-11a91de76ffe",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-23T00:00:00.000Z",
    diaSemana: "Qui",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "670466cf-3136-465f-bbb0-0e2eea6dda84",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-24T00:00:00.000Z",
    diaSemana: "Sex",
    status: "",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
  {
    id: "a7b72e33-42c1-45cc-8066-28e3a256849e",
    entradaManha: "",
    saidaManha: "",
    dif_min: 0,
    saldoAnt: 0,
    mes: "",
    data: "2024-05-25T00:00:00.000Z",
    diaSemana: "Sab",
    status: "COMPENSADO",
    nome: "",
    matricula: "",
    setor: "",
    expediente: "",
    saldoanterior: 0,
  },
];

export const Editable: Story = {
  render: (props: IFlexTableProps<(typeof lista)[0]>) => {
    const ref = useRef<IFlexTableMethods<(typeof lista)[0]>>();
    const [data, setData] = useState(
      lista.map((item) => ({
        data: item.data,
        entradaManha: item.entradaManha ? item.entradaManha : "",
        saidaManha: item.saidaManha ? item.saidaManha : "",
        entradaTarde: item.entradaTarde ? item.entradaTarde : "",
        saidaTarde: item.saidaTarde ? item.saidaTarde : "",
        entradaExtra: "",
        saidaExtra: "",
        movimentacao: "10",
        teste: "",
      })),
    );

    // const handle = () => {
    //   setData((old) =>
    //     old.map((val, i) =>
    //       i != 0
    //         ? val
    //         : {
    //             ...val,
    //             entradaManha: "",
    //             entradaTarde: "",
    //             entradaExtra: "",
    //             saidaManha: "",
    //             saidaExtra: "",
    //             saidaTarde: "",
    //           },
    //     ),
    //   );
    // };

    return (
      <>
        {/* <Button color="primary" onPress={handle}>
          teste
        </Button> */}
        <FlexTable
          {...props}
          ref={ref}
          size="xs"
          rounded
          reactive
          compact
          cardHeader
          dividerHeader
          striped
          className="pb-4"
          classNames={{ header: "sticky top-1 z-10" }}
          onClickRow={({ row, index }) => {
            // ref.current && ref.current.setFocusCell({ colIndex: 3, rowIndex: 3 });
            // console.log(ref && ref.current && ref.current.getData());
            // console.log({ row, index });
          }}
          data={data}
          cellTextProps={{ size: "sm" }}
          labelTextProps={{ size: "sm" }}
          columns={{
            data: {
              label: "Data",
              format: ({ value }) => {
                return moment(value).format("DD/MM - dddd");
              },
            },
            entradaManha: {
              editable: true,
              inputProps: {
                type: "time",
              },
              label: "Entrada manhã",
            },
            saidaManha: {
              editable: true,
              inputProps: { type: "time" },
              label: "Saida manhã",
            },
            entradaTarde: {
              editable: true,
              inputProps: { type: "time" },
              label: "Entrada tarde",
            },
            saidaTarde: {
              editable: true,
              inputProps: { type: "time" },
              label: "Saida tarde",
            },
            entradaExtra: {
              editable: true,
              inputProps: { type: "time" },
              label: "Entrada extra",
            },
            saidaExtra: {
              editable: true,
              inputProps: { type: "time" },
              label: "Saida extra",
            },
            // movimentacao: { label: "movimentação", cellTextProps: { size: "xs" }, labelTextProps: { size: "xs" } },
            // teste: {
            //   labelTextProps: { size: "xs" },
            //   label: "teste",
            //   cellRenderer: ({}) => {
            //     return (
            //       <Select
            //         size="xs"
            //         className="w-16 py-1 px-1"
            //         activeItemId={1}
            //         placeholder=""
            //         menuBlocks={[{ id: 1, title: "dsa" }]}
            //       />
            //     );
            //   },
            // },
          }}
        />
      </>
    );
  },
};

const dataPagination = [
  { id: 1, nome: "Felipe Sene Ribeiro", cpf: "46144401809", setor: "TI" },
  { id: 2, nome: "Wesley", cpf: "32312", setor: "Manutenção" },
  { id: 3, nome: "Lucas", cpf: "3213123123", setor: "Info" },
  { id: 4, nome: "Bagliane", cpf: "33332112333", setor: "Controle" },
  { id: 5, nome: "Joelmir", cpf: "46145601149", setor: "Prepa" },
  { id: 6, nome: "Felipe Sene Ribeiro", cpf: "46144401809", setor: "TI" },
  { id: 7, nome: "Wesley", cpf: "32312", setor: "Manutenção" },
  { id: 8, nome: "Lucas", cpf: "3213123123", setor: "Info" },
  { id: 9, nome: "Bagliane", cpf: "33332112333", setor: "Controle" },
  { id: 10, nome: "Joelmir", cpf: "46145601149", setor: "Prepa" },
  { id: 11, nome: "Felipe Sene Ribeiro", cpf: "46144401809", setor: "TI" },
  { id: 12, nome: "Wesley", cpf: "32312", setor: "Manutenção" },
  { id: 13, nome: "Lucas", cpf: "3213123123", setor: "Info" },
  { id: 14, nome: "Bagliane", cpf: "33332112333", setor: "Controle" },
  { id: 15, nome: "Joelmir", cpf: "46145601149", setor: "Prepa" },
  { id: 16, nome: "Felipe Sene Ribeiro", cpf: "46144401809", setor: "TI" },
  { id: 17, nome: "Wesley", cpf: "32312", setor: "Manutenção" },
  { id: 18, nome: "Lucas", cpf: "3213123123", setor: "Info" },
  { id: 19, nome: "Bagliane", cpf: "33332112333", setor: "Controle" },
  { id: 20, nome: "Joelmir", cpf: "46145601149", setor: "Prepa" },
  { id: 21, nome: "Felipe Sene Ribeiro", cpf: "46144401809", setor: "TI" },
  { id: 22, nome: "Wesley", cpf: "32312", setor: "Manutenção" },
  { id: 23, nome: "Lucas", cpf: "3213123123", setor: "Info" },
  { id: 24, nome: "Bagliane", cpf: "33332112333", setor: "Controle" },
  { id: 25, nome: "Joelmir", cpf: "46145601149", setor: "Prepa" },
];

export const Pagination: Story = {
  render: (props: IFlexTableProps<(typeof lista)[0]>) => {
    const ref = useRef<IFlexTableMethods<(typeof lista)[0]>>();

    return (
      <FlexTable
        {...props}
        ref={ref}
        size="md"
        rounded
        dividerHeader
        className="pb-4"
        pagination={{ show: true, itemsPerPage: 5, position: "center" }}
        data={dataPagination}
        columns={{
          id: { label: "ID", grow: 0.2 },
          nome: {
            label: "Nome",
          },
          cpf: {
            label: "CPF",
          },
          setor: {
            label: "Setor",
          },
        }}
      />
    );
  },
};

export const Search: Story = {
  render: (props: IFlexTableProps<(typeof lista)[0]>) => {
    const ref = useRef<IFlexTableMethods<(typeof lista)[0]>>();

    return (
      <FlexTable
        {...props}
        ref={ref}
        size="md"
        rounded
        inputSearch={{
          show: true,
          keys: ["nome", "cpf"],
          onTotalChange: (total) => {
            console.log(total);
          },
          props: { rounded: true },
        }}
        classNames={{ header: "min-h-8" }}
        cardHeader
        className="pb-4"
        pagination={{ show: true, itemsPerPage: 10 }}
        data={dataPagination}
        columns={{
          id: { label: "ID", grow: 0.2 },
          nome: {
            label: "Nome",
          },
          cpf: {
            label: "CPF",
          },
          setor: {
            label: "Setor",
          },
        }}
      />
    );
  },
};

export const Filter: Story = {
  render: (props: IFlexTableProps<(typeof lista)[0]>) => {
    const ref = useRef<IFlexTableMethods<(typeof lista)[0]>>();

    return (
      <FlexTable
        {...props}
        ref={ref}
        size="md"
        minHeight={"200px"}
        rounded
        emptyData={{ show: true }}
        inputSearch={{
          show: true,
          keys: ["nome", "cpf"],
          props: { rounded: true },
        }}
        classNames={{ header: "min-h-8" }}
        cardHeader
        className="pb-4"
        // pagination={{ show: true, itemsPerPage: 10 }}
        data={data.map((value, i) => ({
          ...value,
          status: !!(i % 2),
          date: addDays(Date(), i - 10).toISOString(),
        }))}
        columns={{
          id: { label: "ID", grow: 0.2, filtered: { show: true, type: "number" } },
          nome: {
            label: "Nome",
            sortered: true,
            filtered: { show: true, type: "string" },
          },
          cpf: {
            label: "CPF",
            filtered: { show: true, type: "string" },
          },
          setor: {
            label: "Setor",
            filtered: { show: true, type: "string", initialFilterOption: "SELECIONAR" },
          },
          status: {
            label: "Status",
            filtered: { show: true, type: "boolean", values: { true: "ATIVO", false: "DESATIVADO" } },
            format: ({ value }) => {
              const valor = Boolean(value);
              return valor ? "ATIVO" : "DESATIVADO";
            },
          },
          date: {
            grow: 1.5,
            label: "Data",
            filtered: { show: true, type: "date" },
          },
        }}
      />
    );
  },
};

export const Sorter: Story = {
  render: (props: IFlexTableProps<(typeof lista)[0]>) => {
    const ref = useRef<IFlexTableMethods<(typeof lista)[0]>>();

    return (
      <FlexTable
        {...props}
        ref={ref}
        size="md"
        rounded
        // inputSearch={{
        //   show: true,
        //   keys: ["nome", "cpf"],
        //   onTotalChange: (total) => {
        //     console.log(total);
        //   },
        //   props: { rounded: true },
        // }}
        classNames={{ header: "min-h-8" }}
        cardHeader
        className="pb-4"
        // pagination={{ show: true, itemsPerPage: 10 }}
        data={dataPagination}
        columns={{
          id: { label: "ID", grow: 0.2, sortered: true },
          nome: {
            label: "Nome",
            sortered: true,
          },
          cpf: {
            label: "CPF",
          },
          setor: {
            label: "Setor",
            sortered: true,
          },
        }}
      />
    );
  },
};

export const SelectedRows: Story = {
  render: (props: IFlexTableProps<(typeof lista)[0]>) => {
    const ref = useRef<IFlexTableMethods<(typeof lista)[0]>>();

    return (
      <FlexTable
        {...props}
        compact={props.compact}
        ref={ref}
        size="md"
        rounded
        cardHeader
        data={dataPagination}
        selectedRows={[1, 4]}
        columns={{
          id: { label: "ID", grow: 0.2 },
          nome: {
            label: "Nome",
            sortered: true,
          },
          cpf: {
            label: "CPF",
          },
          setor: {
            label: "Setor",
            sortered: true,
          },
        }}
      />
    );
  },
};

export const CheckedRows: Story = {
  render: (props: IFlexTableProps<(typeof lista)[0]>) => {
    const ref = useRef<IFlexTableMethods<(typeof lista)[0]>>();

    return (
      <>
        <FlexTable
          {...props}
          compact={props.compact}
          ref={ref}
          rounded
          cardHeader
          data={dataPagination}
          checkRow={{
            show: true,
            buttonSelectAll: true,
            colProps: { grow: 0.1 },
          }}
          // selectedRows={selecteds}
          columns={{
            id: {
              label: "ID",
              grow: 0.2,
            },
            nome: {
              label: "Nome",
              sortered: true,
              filtered: { show: true, type: "string" },
            },
            cpf: {
              label: "CPF",
            },
            setor: {
              label: "Setor",
              sortered: true,
            },
          }}
        />
        <Button
          color="primary"
          className="mt-10"
          onPress={() => {
            console.log(ref.current?.getCheckedData());
          }}
        >
          Enviar
        </Button>
      </>
    );
  },
};
