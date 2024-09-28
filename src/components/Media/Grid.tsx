"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  RowData,
  PaginationState,
  getPaginationRowModel,
  Table,
  FilterFn,
} from "@tanstack/react-table";
import Icon from "../../elements/Media/Icon";
import TextField, { ITextFieldProps } from "../../elements/Form/TextField";
import VStack from "../../elements/Layout/VStack";
import HStack from "../../elements/Layout/HStack";
import Checkbox, { ICheckboxProps } from "../../elements/Form/Checkbox";
import Pagination, { IPaginationProps } from "./Pagination";
import { useButton } from "react-aria";
import SearchField, { ISearchFieldProps } from "../../elements/Form/SearchField";
import { Filter, filtroIndividual, IOptionsFilter } from "./Grid/Filter";
import Illustration, { IIllustrationProps } from "../../elements/Media/Illustration";
import Text from "../../elements/Typography/Text";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "string" | "number" | "boolean" | "date";
    filterBooleanValues?: { true?: string; false?: string };
    editable?: boolean;
    inputProps?: ITextFieldProps;
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
    cellAlign?: "left" | "center" | "right";
    footerAlign?: "left" | "center" | "right";
    initialFilterOption?: IOptionsFilter;
    hidden?: boolean;
  }
}

const grid = tv({
  slots: {
    base: "",
    inner:
      "overflow-x-auto rounded-md bg-white outline outline-1 outline-default-200 dark:bg-dark-700 dark:outline-dark-600",
    table: "w-fit",
    header: "w-fit bg-white dark:bg-dark-700",
    headerCell: "group relative p-1 px-2 text-sm font-bold text-default-content first:pl-4 dark:text-default-50",
    row: "w-fit",
    cell: "px-2 text-sm text-content-primary first:pl-4 dark:text-dark-100",
    footer: "w-fit",
    footerCell: "relative px-2 text-sm font-bold text-default-content first:pl-4 dark:text-default-50",
    resizer: "absolute right-0 cursor-col-resize touch-none select-none",
    divider: "absolute right-0 w-[1px] bg-default-300 dark:bg-dark-500",
  },
  variants: {
    align: {
      left: { cell: "text-left", footerCell: "text-left" },
      center: { cell: "text-center", footerCell: "text-center" },
      right: { cell: "text-right", footerCell: "text-right" },
    },
    reactive: {
      true: {
        row: "cursor-pointer hover:bg-primary-50 active:bg-primary-100 dark:hover:bg-dark-800 dark:active:bg-dark-900",
      },
    },
    elevated: {
      true: { inner: "shadow-lg dark:shadow-dark-800" },
    },
    striped: {
      true: { row: "bg-[#fbfbfb] dark:bg-[#222222]" },
    },

    size: {
      xs: {
        header: "h-5",
        headerCell: "h-5 text-xs",
        row: "h-4",
        cell: "h-4 text-xs",
        footer: "h-4",
        footerCell: "h-4 text-xs",
      },
      sm: {
        header: "h-7",
        headerCell: "h-7 text-sm",
        row: "h-6",
        cell: "h-6 text-sm",
        footer: "h-6",
        footerCell: "h-6 text-sm",
      },
      md: {
        header: "h-8",
        headerCell: "h-8 text-sm",
        row: "h-7",
        cell: "h-7 text-sm",
        footer: "h-7",
        footerCell: "h-7 text-sm",
      },
      lg: {
        header: "h-10",
        headerCell: "h-10 text-sm",
        row: "h-9",
        cell: "h-9 text-sm",
        footer: "h-9",
        footerCell: "h-9 text-sm",
      },
      xl: {
        header: "h-12",
        headerCell: "h-12 text-base",
        row: "h-10",
        cell: "h-10 text-base",
        footer: "h-10",
        footerCell: "h-10 text-base",
      },
    },
    divider: {
      true: {
        divider: "top-0 h-full",
        cell: "border-b border-r border-default-200 dark:border-dark-600",
        footerCell: "border-b border-r border-default-200 dark:border-dark-600",
        resizer: "resizer-hover top-0 h-full w-1 bg-dark-300",
      },
      false: {
        divider: "top-1/2 h-1/2 -translate-y-1/2",
        cell: "border-b border-b-default-200 dark:border-b-dark-500",
        footerCell: "",
        resizer: "resizer-hover top-1/2 h-1/2 w-[3px] -translate-y-1/2 bg-default-300 dark:bg-dark-500",
      },
    },
    isResizing: {
      true: { resizer: "!bg-primary-400 !opacity-100" },
    },
    isSelected: {
      true: {
        row: "bg-primary-400 hover:bg-primary-300 dark:bg-primary-400 hover:dark:bg-primary-300 ",
        cell: "text-white dark:text-white",
      },
    },
    activeRow: {
      true: {
        cell: "overflow-hidden text-ellipsis ",
      },
      false: {
        cell: "overflow-hidden text-ellipsis text-nowrap",
      },
    },
  },
});

const {
  base,
  inner,
  cell: c,
  header: h,
  headerCell: hc,
  row: r,
  table: t,
  resizer: re,
  footer: f,
  footerCell: fc,
  divider,
} = grid();

export interface IGridRef<T> extends Table<T> {
  getSelectedRows: () => T[];
  getRows: () => T[];
  rerender: () => void;
  updateData: (value?: T[]) => void;
}

export type IColumnDef<TData extends RowData = any, TValue = unknown> = Omit<
  ColumnDef<TData, TValue>,
  | "aggregatedCell"
  | "accessorFn"
  | "aggregationFn"
  | "enableGlobalFilter"
  | "enableHiding"
  | "enableMultiSort"
  | "enablePinning"
  | "filterFn"
  | "sortingFn"
> & {
  accessorKey?: TValue;
};

export interface IGridProps<T> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  height?: number | string;
  className?: string;
  classNames?: {
    inner?: string;
    cell?: string;
    header?: string;
    headerCell?: string;
    row?: string;
    table?: string;
    resizer?: string;
    footer?: string;
    footerCell?: string;
  };
  data?: T[];
  columns?: IColumnDef<any>[];
  dividerData?: boolean;
  dividerHeader?: boolean;
  striped?: boolean;
  elevated?: boolean;
  reactive?: boolean;
  children?: React.ReactNode;
  pagination?: { show: boolean; itemsPerPage: number; position?: "start" | "center" | "end"; props?: IPaginationProps };
  selectionRow?: {
    show: boolean;
    disabled?: boolean;
    checkBoxProps?: ICheckboxProps;
    enableClickRow?: boolean;
    selectionMode?: "multiple" | "single";
    checkbox?: boolean;
    fillLine?: boolean;
  };
  emptyData?: {
    show?: boolean;
    propsImage?: IIllustrationProps;
    text?: string;
    alternative?: React.ReactNode;
  };
  expanding?: boolean;
  inputSearch?: { show: boolean; keys?: string[]; props?: ISearchFieldProps };
  autoSizing?: boolean;
  onClickRow?: (props: { row: T; index: number; props: any }) => void;
  onDbClickRow?: (props: { row: T; index: number; props: any }) => void;
  onFilterChange?: (total: number) => void;
}

/**
 *  Um componente Grid em React que usa o TanStack Table v8, é projetado para exibir e gerenciar dados em um formato de tabela com várias funcionalidades avançadas. 
 * 
 Componente baseado nessa biblioteca, veja em: [Tanstack Table V8](https://tanstack.com/table/latest/docs/introduction) para mais funcionalidades e possibilidades.


 ```tsx
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
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        meta: {
          filterVariant: "boolean",
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
        data={defaultData.map((value, i) => ({
          ...value,
          state: !!(i % 2),
          date: addDays(Date(), i - 10).toISOString(),
        }))}
        columns={defaultColumns}
      ></Grid>
    );
 ```

 ### Métodos `ref.current` próprios

| Função          | Descrição                                         |
| --------------  | ------------------------------------------------- |
| rerender        | Renderiza novamente a tabela                      |
| getSelectedRows | Retorna todas as linhas selecionadas              |
| getRows         | Retorna todas as linhas                           |


 */
const Grid = forwardRef(
  <T extends object>(
    {
      className,
      size = "md",
      elevated = true,
      striped = true,
      classNames,
      dividerData = true,
      dividerHeader = false,
      expanding = true,
      data: d = [],
      pagination: pag,
      columns: cols = [],
      reactive = true,
      selectionRow = { show: false, disabled: false, enableClickRow: true, selectionMode: "multiple" },
      children,
      inputSearch,
      height,
      emptyData = { show: true },
      autoSizing = true,
      onFilterChange,
      onClickRow,
      onDbClickRow,
    }: IGridProps<T>,
    ref: any,
  ) => {
    const [data, setData] = React.useState(() => [...d]);
    const bodyRef = useRef<any>();

    useEffect(() => {
      setData(d);
    }, [d]);

    const columns = useMemo<any>(() => {
      const visibleColumns = cols.filter((col) => !col.meta?.hidden);

      return selectionRow.show && selectionRow.checkbox != false
        ? [
            {
              id: "select",
              size: 15,
              maxSize: 15,
              header: ({ table }: any) => {
                return selectionRow?.selectionMode != "single" ? (
                  <Checkbox
                    aria-label="linha seleção todos"
                    color="primary"
                    variant="solid"
                    className="ml-1"
                    isSelected={table.getIsAllRowsSelected()}
                    onChange={() => table.toggleAllRowsSelected()}
                    {...selectionRow?.checkBoxProps}
                  />
                ) : (
                  <></>
                );
              },
              cell: ({ row }: any) => (
                <div
                  className="px-1"
                  onClick={() => {
                    row.getToggleSelectedHandler();
                  }}
                >
                  <Checkbox
                    aria-label="linha seleção"
                    color="primary"
                    variant="solid"
                    isSelected={row.getIsSelected()}
                    isDisabled={!row.getCanSelect()}
                    onChange={() => !(selectionRow.enableClickRow != false) && row.toggleSelected(!row.getIsSelected())}
                    {...selectionRow?.checkBoxProps}
                  />
                </div>
              ),
            },
            ...visibleColumns,
          ]
        : [...visibleColumns];
    }, [cols, selectionRow]);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: pag?.itemsPerPage || 10,
    });
    const [activeRow, setActiveRow] = useState<string | null>(null);

    const rerender = React.useReducer(() => ({}), {})[1];

    function useSkipper() {
      const shouldSkipRef = React.useRef(true);
      const shouldSkip = shouldSkipRef.current;

      const skip = React.useCallback(() => {
        shouldSkipRef.current = false;
      }, []);

      React.useEffect(() => {
        shouldSkipRef.current = true;
      });

      return [shouldSkip, skip] as const;
    }

    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

    const getNestedValue = (obj: any, path: string) => {
      return path.split(".").reduce((value, key) => value?.[key], obj);
    };

    //INFO FILTERS
    const filterFn: any = "filtroIndividual";

    const globalFilterFn: FilterFn<any> = (row, column, searchTerm) => {
      const columnNested = column.replaceAll("_", ".");

      const itemValue: any = String(getNestedValue(row.original, columnNested));

      if (inputSearch && inputSearch.keys && inputSearch.keys.length > 0 && inputSearch.keys.includes(columnNested)) {
        return itemValue.toLowerCase().includes(searchTerm.toLowerCase());
      }
    };

    //INFO USETABLE
    const table = useReactTable<T>({
      columnResizeDirection: "ltr",
      data,
      columns,
      defaultColumn: {
        enableColumnFilter: false,
        maxSize: 800,
        filterFn,
        ...defaultColumn,
      },
      columnResizeMode: "onChange",
      filterFns: { filtroIndividual },
      globalFilterFn,
      enableRowSelection: selectionRow?.disabled ? false : true,
      enableMultiRowSelection: selectionRow?.selectionMode == "single" ? false : true,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: pag?.show ? getPaginationRowModel() : undefined,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      onPaginationChange: setPagination,
      onRowSelectionChange: setRowSelection,
      autoResetPageIndex,
      state: {
        sorting,
        columnFilters,
        pagination,
        rowSelection,
        globalFilter,
      },
      meta: {
        updateData: (rowIndex: any, columnId: any, value: any) => {
          skipAutoResetPageIndex();
          setData((old) =>
            old.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...old[rowIndex]!,
                  [columnId]: value,
                };
              }
              return row;
            }),
          );
        },
      },
      // autoResetPageIndex: false,
    });

    useEffect(() => {
      if (onFilterChange) {
        const total = table.getFilteredRowModel().rows;
        onFilterChange(total.length);
      }
    }, [globalFilter, columnFilters]);

    //INFO REF
    useImperativeHandle(ref, () => ({
      getSelectedRows: () => {
        const rowsSelected = table.getSelectedRowModel();
        return rowsSelected.rows.map((val) => val.original);
      },
      getRows: () => {
        const rowsFiltered = table.getFilteredRowModel();
        return rowsFiltered.rows.map((val) => val.original);
      },
      rerender: () => {
        rerender();
      },
      updateData: (newData?: T[]) => {
        setData(newData ? newData : d);
      },
      ...table,
    }));

    const columnSizeVars = React.useMemo(() => {
      const headers = table.getFlatHeaders();
      const colSizes: { [key: string]: number } = {};
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i]!;

        const headerS = `--header-${header.id}-size`;
        const colS = `--col-${header.column.id}-size`;

        colSizes[headerS] = header.getSize();
        colSizes[colS] = header.column.getSize();
      }
      return colSizes;
    }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

    const sizing = useMemo(() => {
      const sideTable = table.getTotalSize();

      if (autoSizing && bodyRef.current?.offsetWidth >= sideTable) {
        return "99.9%";
      }

      return sideTable;
    }, [bodyRef.current, table.getTotalSize()]);

    return (
      <VStack className={base({ class: className })}>
        <HStack alignItems="center">
          {inputSearch && inputSearch.show && (
            <SearchField
              aria-label="pesquisar"
              placeholder="Pesquisar"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e)}
              className="mb-2 py-2"
              elevated
              rounded
              size="md"
              classNames={{
                inner: "shadow-sm",
              }}
              {...inputSearch.props}
            />
          )}
          {children}
        </HStack>

        <div
          ref={bodyRef}
          style={{ minHeight: height, maxHeight: height, height: height }}
          className={inner({ class: classNames?.inner, elevated })}
        >
          <table style={{ ...columnSizeVars, width: sizing }} className={t({ class: classNames?.table })}>
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className={h({ class: classNames?.header })}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: `calc(var(--header-${header?.id}-size) * 1px)` }}
                        className={hc({
                          class: classNames?.headerCell,
                          size,
                          divider: dividerHeader,
                        })}
                      >
                        {header.isPlaceholder ? null : (
                          <HStack alignItems="center" justifyContent="between">
                            <div
                              className={
                                header.column.getCanSort()
                                  ? "flex w-full cursor-pointer select-none flex-row items-center text-ellipsis text-nowrap"
                                  : "flex flex-row items-center justify-between text-nowrap"
                              }
                              onClick={header.column.getToggleSortingHandler()}
                              title={
                                header.column.getCanSort()
                                  ? header.column.getNextSortingOrder() === "asc"
                                    ? "Ordernar em ascendente"
                                    : header.column.getNextSortingOrder() === "desc"
                                      ? "Ordernar em decrescente"
                                      : "Limpar ordenação"
                                  : undefined
                              }
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              <HStack className="px-2">
                                {{
                                  asc: <Icon size="xs" name={"PiArrowDown"} />,
                                  desc: <Icon size="xs" name={"PiArrowUp"} />,
                                }[header.column.getIsSorted() as string] ?? <div></div>}
                              </HStack>
                            </div>
                            {header.column.getCanFilter() ? <Filter column={header.column} /> : null}
                          </HStack>
                        )}
                        {!(header.column.columnDef.enableResizing === false) && (
                          <div
                            onDoubleClick={() => header.column.resetSize()}
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={re({
                              class: classNames?.resizer,
                              size,
                              isResizing: header.column.getIsResizing(),
                              divider: dividerHeader,
                            })}
                          />
                        )}
                        <div className={divider({ divider: dividerHeader })} />
                      </th>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td>
                  <div className="absolute bottom-[2px] h-[1px] w-full bg-default-300 dark:bg-dark-400"></div>
                </td>
              </tr>
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  onClick={() => {
                    setActiveRow(String(row.id));
                    selectionRow.enableClickRow !== false && row.toggleSelected(!row.getIsSelected());
                    onClickRow && onClickRow({ index: i, row: row.original, props: row });
                  }}
                  onDoubleClick={() => {
                    onDbClickRow && onDbClickRow({ index: i, row: row.original, props: row });
                  }}
                  className={r({
                    class: classNames?.row,
                    reactive,
                    size,
                    striped: striped ? (Number(i) % 2 ? true : false) : false,
                    isSelected: selectionRow.fillLine && row.getIsSelected(),
                  })}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={
                        activeRow == row.id && expanding
                          ? {
                              width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                            }
                          : {
                              maxWidth: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                            }
                      }
                      className={c({
                        class: classNames?.cell,
                        size,
                        activeRow: activeRow == row.id && expanding,
                        divider: dividerData,
                        align: cell.column.columnDef.meta?.cellAlign || "left",
                        isSelected: selectionRow.fillLine && row.getIsSelected(),
                      })}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            {table
              .getFooterGroups()
              .some((footerGroup) => footerGroup.headers.some((header) => header.column.columnDef.footer)) && (
              <tfoot>
                {table.getFooterGroups().map((footerGroup) => (
                  <tr key={footerGroup.id} className={f({ class: classNames?.footer, size })}>
                    {footerGroup.headers.map((header) => (
                      <th
                        style={{
                          width: `calc(var(--header-${header?.id}-size) * 1px)`,
                        }}
                        key={header.id}
                        className={fc({
                          class: classNames?.footerCell,
                          size,
                          divider: dividerData,
                          align: header.column.columnDef.meta?.footerAlign || "left",
                        })}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            )}
          </table>
          {table.getRowModel().rows.length == 0 && emptyData?.show && (
            <VStack className="h-[80%] w-[99%] py-4" justifyContent="center" alignItems="center">
              {emptyData.alternative ? (
                emptyData.alternative
              ) : (
                <>
                  <Illustration image="empty" className="max-h-48 max-w-48" {...emptyData.propsImage} />
                  <Text>{emptyData.text || "Não foi encontrado nenhum dado !"}</Text>
                </>
              )}
            </VStack>
          )}
        </div>
        {pag && pag.show && (
          <HStack
            justifyContent={pag.position == "center" ? "center" : pag.position == "end" ? "end" : "start"}
            className="w-full"
          >
            <Pagination
              totalPages={table.getPageCount()}
              onChange={(value) => {
                table.setPageIndex(Number(value) - 1);
              }}
              control
              className="sticky bottom-0 py-2"
              {...pag?.props}
            />
          </HStack>
        )}
      </VStack>
    );
  },
);

const defaultColumn: Partial<ColumnDef<any>> = {
  cell: ({ getValue, row: { index }, column: { id, columnDef }, table }) => {
    const ref = useRef<any>();
    const tableO: any = table;
    const initialValue = getValue();
    const [value, setValue] = React.useState(initialValue);
    const [focused, setFocused] = React.useState(false);

    const onBlur = () => {
      tableO.options.meta?.updateData(index, id, value);
      setFocused(false);
    };

    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    let { buttonProps } = useButton(
      {
        elementType: "div",
        onFocus: () => {
          setFocused(true);
        },
      },
      ref,
    );

    return columnDef.meta?.editable ? (
      focused ? (
        <TextField
          autoFocus
          size="sm"
          aria-label="input"
          classNames={{ inner: "!border-primary-400" }}
          value={value as string}
          onChange={(e) => setValue(e)}
          onBlur={onBlur}
          className="m-1"
          {...columnDef.meta?.inputProps}
        />
      ) : (
        <div {...buttonProps} className="w-full cursor-text">
          {!value ? <div className="h-4"></div> : String(value)}
        </div>
      )
    ) : (
      value
    );
  },
};

export default Grid;
