import React, { useRef } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Grid, { IColumnDef, IGridProps, IGridRef } from "./Grid";
import { addDays } from "date-fns";
import moment from "moment";
import Button from "../../elements/Form/Button";

const meta = {
  component: Grid,
  args: {
    dividerData: true,
    dividerHeader: false,
    striped: true,
    reactive: true,
    size: "md",
    elevated: true,
    children: undefined,
    expanding: true,
    height: "",
  },
  argTypes: {},
  tags: ["autodocs"],
} satisfies Meta<IGridProps<any>>;

export default meta;
type Story = StoryObj<typeof meta>;

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Felipe",
    lastName: "Sene",
    age: 1,
    visits: 10,
    status: "Complicated",
    progress: 56,
  },
  {
    firstName: "ST",
    lastName: "Openh",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Charlie",
    lastName: "Oppenheimer",
    age: 2,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Joelmir",
    lastName: "França",
    age: 3,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Wesley",
    lastName: "dirte",
    age: 5,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Noronha",
    lastName: "Lucas",
    age: 12,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Diego",
    lastName: "dirte",
    age: 11,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Xagriane",
    lastName: "dirte",
    age: 10,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Ola",
    lastName: "dirte",
    age: 0,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "tanner",
    lastName: "linsleya",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Felipe",
    lastName: "Sene",
    age: 1,
    visits: 10,
    status: "Complicated",
    progress: 56,
  },
  {
    firstName: "ST",
    lastName: "Openh",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Charlie",
    lastName: "Oppenheimer",
    age: 2,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Joelmir",
    lastName: "França",
    age: 3,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Wesley",
    lastName: "dirte",
    age: 5,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Noronha",
    lastName: "Lucas",
    age: 12,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Diego",
    lastName: "dirte",
    age: 11,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Xagriane",
    lastName: "dirte",
    age: 10,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
  {
    firstName: "Ola",
    lastName: "dirte",
    age: 0,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

export const Example: Story = {
  render: (props) => {
    const ref = useRef<IGridRef<Object>>();

    const defaultColumns: IColumnDef<any>[] = [
      {
        accessorKey: "firstName",
        header: "Nome",
        enableColumnFilter: true,
        size: 300,
      },
      {
        accessorKey: "state",
        header: "Estado",
        size: 300,
        meta: {
          filterVariant: "boolean",
          filterBooleanValues: { true: "SIM", false: "NÃO" },
        },
        cell: ({ getValue }) => {
          return <>{String(getValue())}</>;
        },
      },
      {
        accessorKey: "date",
        header: "Data",
        size: 300,
        meta: { filterVariant: "date" },
        cell: ({ getValue }) => {
          return <>{moment(String(getValue())).format("DD/MM/YYYY - HH:mm")}</>;
        },
      },
      {
        size: 300,
        accessorKey: "lastName",
        header: "Sobrenome",
      },
      {
        accessorKey: "age",
        header: "Idade",
        enableColumnFilter: true,
        meta: {
          filterVariant: "number",
        },
      },
      {
        accessorKey: "visits",
        header: "Visitas",
        meta: {
          filterVariant: "number",
          editable: true,
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        meta: {
          filterVariant: "string",
        },
      },
      {
        accessorKey: "progress",
        header: "Progresso",
      },
    ];

    return (
      <Grid
        {...props}
        ref={ref}
        height={"300px"}
        data={defaultData.map((value, i) => ({
          ...value,
          state: !!(i % 2),
          date: addDays(Date(), i - 10).toISOString(),
        }))}
        columns={defaultColumns}
        emptyData={{ show: true }}
      ></Grid>
    );
  },
};

export const ColumnGroup: Story = {
  render: (props) => {
    const ref = useRef<IGridRef<Object>>();

    const defaultColumns: IColumnDef<any>[] = [
      {
        accessorKey: "firstName",
        header: "Nome",
        footer: "teste",
      },
      {
        accessorKey: "lastName",
        header: "Sobrenome",
        footer: "teste",
      },
      {
        accessorKey: "state",
        header: "Estado",
        meta: {
          filterVariant: "boolean",
          filterBooleanValues: { true: "SIM", false: "NÃO" },
        },
        cell: ({ getValue }) => {
          return <>{String(getValue())}</>;
        },
      },
      {
        accessorKey: "date",
        header: "Data",
        size: 180,
        meta: { filterVariant: "date" },
        cell: ({ getValue }) => {
          return <>{moment(String(getValue())).format("DD/MM/YYYY - HH:mm")}</>;
        },
      },

      {
        accessorKey: "age",
        header: "Idade",
        enableColumnFilter: true,
        meta: {
          filterVariant: "number",
        },
      },
      {
        accessorKey: "visits",
        header: "Visitas",
        meta: {
          filterVariant: "number",
          editable: true,
        },
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "progress",
        header: "Progresso",
      },
    ];

    return (
      <Grid
        {...props}
        ref={ref}
        data={defaultData.map((value, i) => ({
          ...value,
          state: !!(i % 2),
          date: addDays(Date(), i - 10).toISOString(),
        }))}
        columns={defaultColumns}
      ></Grid>
    );
  },
};

export const Editable: Story = {
  render: (props) => {
    const ref = useRef<IGridRef<Object>>();

    const defaultColumns: IColumnDef<any>[] = [
      {
        accessorKey: "firstName",
        header: "Nome",
        meta: {
          editable: true,
        },
      },

      {
        accessorKey: "lastName",
        header: "Sobrenome",
        meta: {
          editable: true,
        },
      },
      {
        accessorKey: "age",
        header: "Idade",
        enableColumnFilter: true,
        meta: {
          filterVariant: "number",
          editable: true,
        },
      },
      {
        accessorKey: "visits",
        header: "Visitas",
        meta: {
          filterVariant: "number",
          editable: true,
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        meta: {
          editable: true,
        },
      },
      {
        accessorKey: "progress",
        header: "Progresso",
        meta: {
          editable: true,
        },
      },
      {
        accessorKey: "date",
        header: "Data",
        size: 180,
        meta: { filterVariant: "date" },
        cell: ({ getValue }) => {
          return <>{moment(String(getValue())).format("DD/MM/YYYY - HH:mm")}</>;
        },
      },
    ];

    return (
      <Grid
        {...props}
        ref={ref}
        data={defaultData.map((value, i) => ({
          ...value,
          state: !!(i % 2),
          date: addDays(Date(), i - 10).toISOString(),
        }))}
        columns={defaultColumns}
      ></Grid>
    );
  },
};

export const Pagination: Story = {
  render: (props) => {
    const ref = useRef<IGridRef<Object>>();

    const defaultColumns: IColumnDef<any>[] = [
      {
        accessorKey: "firstName",
        header: "Nome",
      },
      {
        accessorKey: "state",
        header: "Estado",
        meta: {
          filterVariant: "boolean",
          filterBooleanValues: { true: "SIM", false: "NÃO" },
        },
        cell: ({ getValue }) => {
          return <>{String(getValue())}</>;
        },
      },
      {
        accessorKey: "date",
        header: "Data",
        size: 180,
        meta: { filterVariant: "date" },
        cell: ({ getValue }) => {
          return <>{moment(String(getValue())).format("DD/MM/YYYY - HH:mm")}</>;
        },
      },
      {
        accessorKey: "lastName",
        header: "Sobrenome",
      },
      {
        accessorKey: "age",
        header: "Idade",
        enableColumnFilter: true,
        meta: {
          filterVariant: "number",
        },
      },
      {
        accessorKey: "visits",
        header: "Visitas",
        meta: {
          filterVariant: "number",
          editable: true,
        },
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "progress",
        header: "Progresso",
      },
    ];

    return (
      <Grid
        {...props}
        ref={ref}
        data={defaultData.map((value, i) => ({
          ...value,
          state: !!(i % 2),
          date: addDays(Date(), i - 10).toISOString(),
        }))}
        pagination={{ show: true, itemsPerPage: 10 }}
        columns={defaultColumns}
      ></Grid>
    );
  },
};

export const Search: Story = {
  render: (props) => {
    const ref = useRef<IGridRef<Object>>();

    const defaultColumns: IColumnDef<any>[] = [
      {
        accessorKey: "firstName",
        header: "Nome",
      },
      {
        accessorKey: "state",
        header: "Estado",
        meta: {
          filterVariant: "boolean",
          filterBooleanValues: { true: "SIM", false: "NÃO" },
        },
        cell: ({ getValue }) => {
          return <>{String(getValue())}</>;
        },
      },
      {
        accessorKey: "date",
        header: "Data",
        size: 180,
        meta: { filterVariant: "date" },
        cell: ({ getValue }) => {
          return <>{moment(String(getValue())).format("DD/MM/YYYY - HH:mm")}</>;
        },
      },
      {
        accessorKey: "lastName",
        header: "Sobrenome",
      },
      {
        accessorKey: "age",
        header: "Idade",
        enableColumnFilter: true,
        meta: {
          filterVariant: "number",
        },
      },
      {
        accessorKey: "visits",
        header: "Visitas",
        meta: {
          filterVariant: "number",
          editable: true,
        },
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "progress",
        header: "Progresso",
      },
    ];

    return (
      <Grid
        {...props}
        ref={ref}
        data={defaultData.map((value, i) => ({
          ...value,
          state: !!(i % 2),
          date: addDays(Date(), i - 10).toISOString(),
        }))}
        columns={defaultColumns}
        inputSearch={{ show: true, keys: ["firstName", "lastName"] }}
        classNames={{ inner: "min-h-[200px]" }}
        onFilterChange={(total) => console.log({ total })}
      ></Grid>
    );
  },
};

export const Filter: Story = {
  render: (props) => {
    const ref = useRef<IGridRef<Object>>();

    const defaultColumns: IColumnDef<any>[] = [
      {
        accessorKey: "firstName",
        header: "Nome",
        enableColumnFilter: true,
        meta: { filterVariant: "string", initialFilterOption: "SELECIONAR" },
      },
      {
        accessorKey: "state",
        header: "Estado",
        enableColumnFilter: true,
        meta: {
          filterVariant: "boolean",
          filterBooleanValues: { true: "SIM", false: "NÃO" },
        },
        cell: ({ getValue }) => {
          return <>{String(getValue() ? "SIM" : "NÃO")}</>;
        },
      },
      {
        accessorKey: "date",
        header: "Data",
        size: 180,
        enableColumnFilter: true,
        meta: { filterVariant: "date" },
        cell: ({ getValue }) => {
          return <>{moment(String(getValue())).format("DD/MM/YYYY - HH:mm")}</>;
        },
      },
      {
        accessorKey: "lastName",
        header: "Sobrenome",
        enableColumnFilter: true,
      },
      {
        accessorKey: "age",
        header: "Idade",
        enableColumnFilter: true,
        meta: {
          filterVariant: "number",
        },
      },
      {
        accessorKey: "visits",
        header: "Visitas",
        enableColumnFilter: true,
        meta: {
          filterVariant: "number",
          editable: true,
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        enableColumnFilter: true,
        meta: {
          filterVariant: "string",
        },
      },
      {
        accessorKey: "progress",
        header: "Progresso",
        enableColumnFilter: true,
      },
    ];

    return (
      <Grid
        {...props}
        ref={ref}
        data={defaultData.map((value, i) => ({
          ...value,
          state: !!(i % 2),
          date: addDays(Date(), i - 10).toISOString(),
        }))}
        columns={defaultColumns}
        height={"400px"}
      ></Grid>
    );
  },
};

/**
 * Seleção de linhas
 * 
 ```tsx
   render: (props) => {
    const ref = useRef<IGridRef<Object>>();

    const defaultColumns: IColumnDef<any>[] = [
      {
        accessorKey: "firstName",
        header: "Nome",
        enableColumnFilter: true,
        meta: { filterVariant: "string" },
      },
      {
        accessorKey: "state",
        header: "Estado",
        enableColumnFilter: true,
        meta: {
          filterVariant: "boolean",
          filterBooleanValues: { true: "SIM", false: "NÃO" },
        },
        cell: ({ getValue }) => {
          return <>{String(getValue() ? "SIM" : "NÃO")}</>;
        },
      },
      {
        accessorKey: "date",
        header: "Data",
        size: 180,
        enableColumnFilter: true,
        meta: { filterVariant: "date" },
        cell: ({ getValue }) => {
          return <>{moment(String(getValue())).format("DD/MM/YYYY - HH:mm")}</>;
        },
      },
      {
        accessorKey: "lastName",
        header: "Sobrenome",
        enableColumnFilter: true,
      },
      {
        accessorKey: "age",
        header: "Idade",
        enableColumnFilter: true,
        meta: {
          filterVariant: "number",
        },
      },
      {
        accessorKey: "visits",
        header: "Visitas",
        enableColumnFilter: true,
        meta: {
          filterVariant: "number",
          editable: true,
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        enableColumnFilter: true,
        meta: {
          filterVariant: "boolean",
        },
      },
      {
        accessorKey: "progress",
        header: "Progresso",
        enableColumnFilter: true,
      },
    ];

    return (
      <>
        <Grid
          {...props}
          ref={ref}
          selectionRow={{ show: true, enableClickRow: true }}
          data={defaultData.map((value, i) => ({
            ...value,
            state: !!(i % 2),
            date: addDays(Date(), i - 10).toISOString(),
          }))}
          columns={defaultColumns}
          classNames={{ inner: "h-[400px] min-h-[400px]" }}
        ></Grid>
        <Button
          color="primary"
          className="mt-10"
          onPress={() => {
            console.log(ref.current?.getSelectedRows());
          }}
        >
          Enviar
        </Button>
      </>
    );
  },
 ```
 */
export const SelectionRows: Story = {
  render: (props) => {
    const ref = useRef<IGridRef<Object>>();

    const defaultColumns: IColumnDef<any>[] = [
      {
        accessorKey: "firstName",
        header: "Nome",
        enableColumnFilter: true,
        meta: { filterVariant: "string" },
      },
      {
        accessorKey: "state",
        header: "Estado",
        enableColumnFilter: true,
        meta: {
          filterVariant: "boolean",
          filterBooleanValues: { true: "SIM", false: "NÃO" },
        },
        cell: ({ getValue }) => {
          return <>{String(getValue() ? "SIM" : "NÃO")}</>;
        },
      },
      {
        accessorKey: "date",
        header: "Data",
        size: 180,
        enableColumnFilter: true,
        meta: { filterVariant: "date" },
        cell: ({ getValue }) => {
          return <>{moment(String(getValue())).format("DD/MM/YYYY - HH:mm")}</>;
        },
      },
      {
        accessorKey: "lastName",
        header: "Sobrenome",
        enableColumnFilter: true,
      },
      {
        accessorKey: "age",
        header: "Idade",
        enableColumnFilter: true,
        meta: {
          filterVariant: "number",
        },
      },
      {
        accessorKey: "visits",
        header: "Visitas",
        enableColumnFilter: true,
        meta: {
          filterVariant: "number",
          editable: true,
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        enableColumnFilter: true,
        meta: {
          filterVariant: "string",
        },
      },
      {
        accessorKey: "progress",
        header: "Progresso",
        enableColumnFilter: true,
      },
    ];

    return (
      <>
        <Grid
          {...props}
          ref={ref}
          selectionRow={{ show: true }}
          data={defaultData.map((value, i) => ({
            ...value,
            state: !!(i % 2),
            date: addDays(Date(), i - 10).toISOString(),
          }))}
          columns={defaultColumns}
          classNames={{ inner: "h-[400px] min-h-[400px]" }}
        ></Grid>
        <Button
          color="primary"
          className="mt-10"
          onPress={() => {
            // ref.current?.setRowSelection({ 0: true });
            console.log({ selecteds: ref.current?.getSelectedRows(), row: ref.current?.getRows() });
          }}
        >
          Enviar
        </Button>
      </>
    );
  },
};
