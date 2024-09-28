"use client";

import React, { forwardRef, useEffect, useMemo, useRef, useState, memo } from "react";
import { tv } from "tailwind-variants";
import HStack from "../../elements/Layout/HStack";
import Text, { ITextProps } from "../../elements/Typography/Text";
import Card, { ICardProps } from "./Card";
import { ITextFieldProps } from "../../elements/Form/TextField";
import Divider from "./Divider";
import Icon from "../../elements/Media/Icon";
import Pagination, { IPaginationProps } from "./Pagination";
import SearchField, { ISearchFieldProps } from "../../elements/Form/SearchField";
import Checkbox, { ICheckboxProps } from "../../elements/Form/Checkbox";
import { Filter, filtroIndividual } from "./Table/Filter";
import { CellEditable } from "./Table/CellEditable";
import { obterLabels } from "../../utils/obterLabels";
import VStack from "../../elements/Layout/VStack";
import Illustration, { IIllustrationProps } from "../../elements/Media/Illustration";

export type IRowCell<T> = {
  value: string;
  row: T;
  rowIndex: number;
  colIndex: number;
  key: string;
};

export type IFilterOptions = {
  key: string;
  filter: string;
  selectedFilters?: any[];
  type: ITypes;
  option: IOptionsFilter;
};

export type IOptionsFilter =
  | "CONTEM"
  | "IGUAL"
  | "COMECA COM"
  | "DIFERENTE"
  | "MAIOR"
  | "MENOR"
  | "MAIOR OU IGUAL"
  | "MENOR OU IGUAL"
  | "ENTRE"
  | "SELECIONAR";

export type ITypes = "string" | "number" | "boolean" | "date";

export type IColumn<T> = {
  [K in keyof T]: IColProps<T>;
};

export interface IFlexTableMethods<T> {
  getData(): T[];
  getCheckedData(): T[];
  setCheckedRows(values: React.SetStateAction<number[]>): void;
  setCheckedAll(): void;
  setCheckedReset(): void;
  setFocusCell(props: { colIndex: number; rowIndex: number }): void;
  setPageTable(props: { page: number }): void;
}

export type IColProps<T> = {
  label?: string;
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
  grow?: number;
  hidden?: boolean;
  sortered?: boolean;
  filtered?: {
    show: boolean;
    type: ITypes;
    values?: { true: string; false: string };
    initialFilterOption?: IOptionsFilter;
  };
  cellTextProps?: Omit<ITextProps, "className"> | ((props: IRowCell<T>) => Omit<ITextProps, "className"> | undefined);
  labelTextProps?: Omit<ITextProps, "className">;
  editable?: boolean | ((props: IRowCell<T>) => boolean | undefined);
  cellClass?: string | ((props: IRowCell<T>) => string | undefined);
  cellTextClass?: string | ((props: IRowCell<T>) => string | undefined);
  inputProps?: ITextFieldProps | ((props: IRowCell<T>) => ITextFieldProps | undefined);
  cellRenderer?: (props: IRowCell<T>) => React.ReactElement;
  format?: (props: IRowCell<T>) => string;
  onPress?: (props: IRowCell<T>) => void;
  onEdit?: (props: IRowCell<T>) => void;
  onChange?: (props: IRowCell<T>) => string;
};

export interface IFlexTableProps<T> {
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
  noHeader?: boolean;
  clickable?: boolean;
  compact?: boolean;
  className?: string;
  reactive?: boolean;
  rounded?: boolean;
  cellTextProps?: Omit<ITextProps, "className">;
  labelTextProps?: Omit<ITextProps, "className">;
  data: T[];
  columns?: IColumn<T>;
  gap?: "sm" | "md" | "lg" | "xl";
  cardProps?: Omit<ICardProps, "className" | "onClick">;
  cardHeader?: boolean;
  dividerHeader?: boolean;
  dividerData?: boolean;
  striped?: boolean;
  pagination?: { show: boolean; itemsPerPage: number; position?: "start" | "center" | "end"; props?: IPaginationProps };
  inputSearch?: { show: boolean; keys?: string[]; props?: ISearchFieldProps; onTotalChange?: (total: number) => void };
  selectedRows?: number[];
  elevated?: boolean;
  children?: React.ReactNode;
  classNames?: {
    header?: string;
    headerText?: string;
    body?: string;
    table?: string;
  };
  emptyData?: {
    show?: boolean;
    propsImage?: IIllustrationProps;
    text?: string;
    alternative?: React.ReactNode;
  };
  sortInitialOptions?: { key?: string; order?: "asc" | "desc" };
  filterInitialOptions?: IFilterOptions[];
  rowClass?: string | ((props: { row: T; rowIndex: number }) => string | undefined);
  checkRow?: {
    show: boolean;
    checkBoxProps?: ICheckboxProps | ((props: IRowCell<T>) => ICheckboxProps | undefined);
    defaultChecked?: number[];
    buttonSelectAll?: boolean;
    selectionMode?: "multiple" | "single";
    colProps?: IColProps<T>;
  };
  height?: number | string;
  minHeight?: number | string;
  onClickRow?: (props: { row: T; index: number }) => void;
  onDbClickRow?: (props: { row: T; index: number }) => void;
}

const flexTable = tv({
  slots: {
    base: "",
    header: "z-10 w-full flex-row items-center justify-center gap-1 px-4 transition-all",
    headerText:
      "group relative flex w-full flex-1 flex-row items-center items-center overflow-hidden whitespace-nowrap break-keep px-1",
    table: "",
    body: "overflow-y-auto",
    row: "w-full flex-row items-center justify-center gap-1 px-4 transition-all",
    cell: "no-scrollbar relative w-full flex-1 flex-row items-center overflow-auto whitespace-nowrap break-keep px-1 outline-none",
    cellText: "group relative flex w-full flex-row items-center text-left",
  },
  variants: {
    editable: {
      true: { cell: "h-full min-h-6 cursor-text py-1", cellText: "hover:font-semibold" },
    },
    size: {
      "2xs": { header: "min-h-8", cell: "min-h-6", row: "min-h-6" },
      xs: { header: "min-h-8", cell: "min-h-8", row: "min-h-8" },
      sm: { header: "min-h-10", cell: "min-h-10", row: "min-h-10" },
      md: { header: "min-h-12", cell: "min-h-12", row: "min-h-12" },
      lg: { header: "min-h-14", cell: "min-h-14", row: "min-h-14" },
      xl: { header: "min-h-16", cell: "min-h-16", row: "min-h-16" },
    },
    gap: {
      sm: { header: "mb-1", row: "mb-1" },
      md: { header: "mb-2", row: "mb-2" },
      lg: { header: "mb-2", row: "mb-3" },
      xl: { header: "mb-2", row: "mb-4" },
    },
    elevated: {
      true: {},
    },
    clickable: {
      true: { row: "cursor-pointer", headerText: "cursor-pointer select-none" },
    },
    striped: {
      true: {
        row: "bg-[#fbfbfb] dark:bg-[#222222]",
      },
    },
    reactive: {
      true: { row: "hover:bg-info-100 hover:shadow-md dark:hover:bg-dark-600 dark:hover:shadow-dark-800" },
    },
    cardHeader: {
      true: { header: "" },
      false: { header: "border-none bg-transparent dark:bg-transparent" },
    },
    rounded: {
      true: { table: "rounded-lg" },
      false: { table: "rounded-sm" },
    },
    compact: {
      true: {
        header: "mb-0 border-b-0",
        row: "mb-0 border-b-0 last:border-b",
      },
    },
    selected: {
      true: {},
    },
    textAlign: {
      left: {},
      center: { cellText: "justify-center text-center", cell: "justify-center" },
      right: { cellText: "justify-end text-right", cell: "justify-end" },
    },
  },
  compoundSlots: [
    { class: "rounded-sm ", slots: ["row", "header"], compact: false, rounded: false },
    { class: "rounded-md ", slots: ["row", "header"], compact: false, rounded: true },
    // SEM CARDHEADER
    {
      class: "rounded-none first:rounded-t-sm last:rounded-b-sm",
      slots: ["row"],
      compact: true,
      rounded: false,
      cardHeader: false,
    },
    {
      class: "rounded-none first:rounded-t-md last:rounded-b-md ",
      slots: ["row"],
      compact: true,
      rounded: true,
      cardHeader: false,
    },
    //COM CARDHEADER
    {
      class: "rounded-none last:rounded-b-sm",
      slots: ["row"],
      compact: true,
      rounded: false,
      cardHeader: true,
    },
    {
      class: "rounded-none rounded-t-sm",
      slots: ["header"],
      compact: true,
      rounded: false,
      cardHeader: true,
    },
    {
      class: "rounded-none last:rounded-b-md ",
      slots: ["row"],
      compact: true,
      rounded: true,
      cardHeader: true,
    },
    {
      class: "rounded-none rounded-t-md ",
      slots: ["header"],
      compact: true,
      rounded: true,
      cardHeader: true,
    },
    // SELECTED ROWS
    {
      class: "bg-primary-300 hover:bg-primary-200 dark:bg-primary-400 hover:dark:bg-primary-300/80",
      slots: ["row"],
      compact: true,
      selected: true,
    },
    {
      class: "!text-white",
      slots: ["cellText"],
      compact: true,
      selected: true,
    },
    { class: "border-primary dark:border-primary-300", slots: ["row"], compact: false, selected: true },
    // ELEVATED
    { class: "shadow-md dark:shadow-dark-800", slots: ["table", "body"], elevated: true },
    {
      class: "shadow-sm dark:shadow-md dark:shadow-dark-800",
      slots: ["row", "header"],
      elevated: true,
      compact: false,
    },
  ],
});

export const { base, headerText, table, row: r, body, cell, header, cellText } = flexTable();

/**
 * 
 * 
 * 
O componente FlexTable é uma tabela flexível e altamente configurável construída em React. Aqui estão os principais pontos sobre seu uso:

`Cabeçalho`: Renderiza colunas baseadas na configuração fornecida em columns.

`Corpo`: Renderiza linhas e células baseadas nos dados fornecidos, aplicando formatação e renderização customizadas conforme especificado em columns.

`Filtragem e Paginação`: Usa useMemo para memorizar e otimizar a filtragem e paginação dos dados.

`Checkboxes`: Suporta seleção de linhas usando checkboxes, com funcionalidades adicionais como "selecionar tudo".


 ```tsx
  const ref = useRef<IFlexTableMethods<TypeData>>();

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
      />
    );
 ```

 ### Métodos `ref.current`

| Função          | Descrição                                         |
| --------------  | ------------------------------------------------- |
| getData         | Retorna os dados da tabela filtrados e ordenados  |
| getCheckedData  | Retorna os dados selecionados através do checkbox |
| setCheckedAll   | Seleciona todos os checkbox                       |
| setCheckedReset | Limpa todos os checkbox                           |
| setCheckedRows  | Seleciona as seguintes células                    |
| setFocusCell    | Foca na célula editável                           |
| setPageTable    | Alterar página selecionada                        |

 */
const FlexTable = memo(
  forwardRef(
    (
      {
        children,
        height,
        emptyData = { show: false },
        minHeight,
        className,
        compact = false,
        noHeader = false,
        columns,
        data: d = [],
        rounded = true,
        cardHeader = false,
        reactive = false,
        gap = "md",
        clickable = false,
        size = "md",
        selectedRows,
        cardProps,
        onClickRow,
        onDbClickRow,
        classNames,
        dividerData = false,
        dividerHeader = false,
        striped = false,
        pagination,
        inputSearch,
        sortInitialOptions = { key: undefined, order: undefined },
        cellTextProps: cellTextPropsCol,
        labelTextProps: labelTextPropsCol,
        elevated,
        filterInitialOptions = [],
        rowClass,
        checkRow,
      }: IFlexTableProps<any>,
      ref: React.Ref<any>,
    ) => {
      const [headers, setHeaders] = useState<string[]>([]);
      const [data, setData] = useState(d.map((value, id) => ({ ...value, pk: id + 1 })));
      const cellRefs = useRef<{ [key: string]: React.RefObject<HTMLButtonElement> }>({});
      const [page, setPage] = useState(1);
      const [checkeds, setCheckeds] = useState<number[]>(checkRow?.defaultChecked || []);

      const [searchTerm, setSearchTerm] = useState<string>("");
      const [sortOptions, setSortOptions] = useState<{ key?: string; order?: "asc" | "desc" }>(sortInitialOptions);
      const [filterOptions, setFilterOptions] = useState<IFilterOptions[]>(filterInitialOptions);

      useEffect(() => {
        setData(d.map((value, id) => ({ ...value, pk: id + 1 })));
      }, [d]);

      const getUniqueColumnValues = (columnKey: string) => {
        return Array.from(new Set(data.map((item) => item[columnKey])));
      };

      const sortedData = useMemo(() => {
        if (!sortOptions.key || !sortOptions.order || !data) return data;

        const comparator = (a: any, b: any) => {
          const valueA = a[sortOptions.key as keyof typeof a];
          const valueB = b[sortOptions.key as keyof typeof b];

          // Verifica se os valores são numéricos
          const isNumeric = !isNaN(valueA) && !isNaN(valueB);

          if (isNumeric) {
            const numA = parseFloat(valueA);
            const numB = parseFloat(valueB);

            if (sortOptions.order === "asc") {
              return numA - numB;
            } else {
              return numB - numA;
            }
          } else {
            const strA = (valueA || "").toString().toLowerCase();
            const strB = (valueB || "").toString().toLowerCase();

            if (sortOptions.order === "asc") {
              if (strA < strB) return -1;
              if (strA > strB) return 1;
              return 0;
            } else {
              if (strA > strB) return -1;
              if (strA < strB) return 1;
              return 0;
            }
          }
        };

        return [...data].sort(comparator);
      }, [data, sortOptions]);

      const itemsFiltrados = useMemo<any[]>(() => {
        if (!sortedData) return sortedData;

        const anyDisp: any = sortedData;

        // Filtragem por inputSearch
        let filteredItems = anyDisp;

        if (inputSearch && inputSearch.keys && inputSearch.keys.length > 0) {
          const keys = inputSearch.keys;
          filteredItems = anyDisp.filter((input: any) =>
            keys.some(
              (parametro) =>
                input[parametro] && String(input[parametro]).toLowerCase().includes(searchTerm.toLowerCase()),
            ),
          );
        }

        // Filtragem adicional por filterOptions
        filterOptions.forEach(({ key, type, filter, option, selectedFilters }) => {
          filteredItems = filteredItems.filter((item: any) => {
            const itemValue = item[key];
            return filtroIndividual(itemValue, filter, type, option, selectedFilters);
          });
        });

        return filteredItems;
      }, [sortedData, filterOptions, searchTerm]);

      const itemsPaginados = useMemo(() => {
        if (!pagination) return itemsFiltrados;
        const startIndex = (page - 1) * pagination.itemsPerPage;
        const endIndex = startIndex + pagination.itemsPerPage;
        return itemsFiltrados.slice(startIndex, endIndex);
      }, [itemsFiltrados, page]);

      //INFO função total de filtrados
      useEffect(() => {
        if (inputSearch && inputSearch.onTotalChange) {
          inputSearch.onTotalChange(itemsFiltrados.length);
        }
      }, [itemsFiltrados]);

      //INFO resetar paginação quando pesquisar
      useEffect(() => {
        setPage(1);
      }, [searchTerm]);

      //INFO obter headers
      useEffect(() => {
        const newcolumns = obterLabels(columns);
        setHeaders(newcolumns);
      }, [columns, itemsFiltrados]);

      //INFO Função para a ref da tabela
      useEffect(() => {
        if (ref) {
          const tableref = ref as React.MutableRefObject<IFlexTableMethods<any>>;

          const getData = () => {
            return itemsFiltrados;
          };

          const getCheckedData = () => {
            return data.filter((value) => {
              return checkeds.find((b) => b == value.pk);
            });
          };

          const setFocusCell = ({ colIndex, rowIndex }: { colIndex: number; rowIndex: number }) => {
            const cellKey = `${rowIndex}-${colIndex}`;

            const cellRef = cellRefs.current[cellKey]?.current;

            if (cellRef) {
              cellRef.focus(); // Focar na célula
            }
          };

          const setCheckedAll = () => {
            const values: number[] = [];
            itemsFiltrados.map((value) => {
              values.push(value.pk);
            });
            setCheckeds(values);
          };

          const setCheckedReset = () => {
            setCheckeds([]);
          };

          const setPageTable = (props: { page: number }) => {
            setPage(props.page);
          };

          const setCheckedRows = (props: React.SetStateAction<number[]>) => {
            setCheckeds(props);
          };

          tableref.current = {
            getData,
            setFocusCell,
            setPageTable,
            getCheckedData,
            setCheckedAll,
            setCheckedReset,
            setCheckedRows,
          };
          ref = tableref;
        }
      }, [itemsFiltrados, checkeds]);

      //INFO REF INPUTS
      useEffect(() => {
        const refs: any = {};
        itemsPaginados.forEach((columns, rowIndex) => {
          Object.keys(columns).forEach((_col, colIndex) => {
            const cellKey = `${rowIndex + 1}-${colIndex + 1}`;
            refs[cellKey] = React.createRef();
          });
        });
        cellRefs.current = refs;
      }, [itemsPaginados, columns]);

      return (
        <div ref={ref} className={base({ class: className })}>
          <HStack alignItems="center">
            {inputSearch && inputSearch.show && (
              <SearchField
                aria-label="pesquisar"
                placeholder="Pesquisar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e)}
                className="py-2 "
                elevated
                rounded
                classNames={{
                  inner: "shadow-sm",
                }}
                {...inputSearch.props}
              />
            )}
            {children}
          </HStack>
          <div
            className={table({
              class: classNames?.table,
              compact,
              rounded,
              elevated: compact && cardHeader && elevated,
            })}
          >
            <Card
              className={header({
                class: classNames?.header,
                cardHeader,
                size: cardHeader ? size : undefined,
                compact,
                rounded,
                gap,
                elevated: cardHeader && elevated,
              })}
            >
              {checkRow && checkRow.show && (
                <Text
                  as={"span"}
                  key={"colCheck"}
                  color="default"
                  weight="bold"
                  style={{ flexGrow: checkRow.colProps?.grow }}
                  className={headerText({
                    class: classNames?.headerText,
                  })}
                  {...labelTextPropsCol}
                  {...checkRow.colProps?.labelTextProps}
                >
                  <HStack
                    alignItems="center"
                    justifyContent={
                      checkRow.colProps?.headerAlign == "center"
                        ? "center"
                        : checkRow.colProps?.headerAlign == "right"
                          ? "end"
                          : "start"
                    }
                  >
                    {checkRow.buttonSelectAll && (
                      <Checkbox
                        className="p-2"
                        color="default"
                        onChange={(value) => {
                          if (value) {
                            const values: number[] = [];
                            itemsFiltrados.map((value) => {
                              values.push(value.pk);
                            });
                            setCheckeds(values);
                          } else {
                            setCheckeds([]);
                          }
                        }}
                        {...(typeof checkRow.checkBoxProps === "function"
                          ? checkRow.checkBoxProps({ value: "", row: {}, colIndex: 0, rowIndex: 0, key: "colCheck" })
                          : checkRow.checkBoxProps)}
                        isSelected={
                          itemsFiltrados.length > 0 && itemsFiltrados.every((item) => checkeds.includes(item.pk))
                        }
                      />
                    )}
                    {checkRow.colProps?.label}
                  </HStack>
                  {dividerHeader && cardHeader && (
                    <Divider orientation="vertical" className="absolute right-0 top-0 m-0 h-full" />
                  )}
                </Text>
              )}

              {!noHeader &&
                columns &&
                headers &&
                headers.map((col, index) => {
                  if (!col || !columns || !columns[col]) {
                    return;
                  }

                  const uniqueValues = getUniqueColumnValues(col);

                  //PEGAR TODAS  AS POSSIBILIDADES DESSA COLUNA AQUI
                  const colProps = columns[col];

                  if (colProps.hidden) {
                    return;
                  }

                  return (
                    <Text
                      as={"span"}
                      key={index}
                      color="default"
                      weight="bold"
                      style={{ flexGrow: colProps.grow }}
                      className={headerText({
                        class: classNames?.headerText,
                        clickable: colProps.sortered,
                      })}
                      {...labelTextPropsCol}
                      {...colProps.labelTextProps}
                    >
                      <HStack
                        alignItems="center"
                        className="w-full"
                        justifyContent={
                          colProps.headerAlign == "center"
                            ? "center"
                            : colProps.headerAlign == "right"
                              ? "end"
                              : "start"
                        }
                        onClick={() => {
                          if (colProps.sortered) {
                            const order =
                              col != sortOptions.key
                                ? "asc"
                                : sortOptions.order == undefined
                                  ? "asc"
                                  : sortOptions.order == "asc"
                                    ? "desc"
                                    : undefined;
                            setSortOptions({ key: col, order });
                          }
                        }}
                      >
                        {colProps.label}
                        {colProps.sortered && sortOptions.key == col && sortOptions.order && (
                          <Icon
                            size="xs"
                            name={sortOptions.order == "asc" ? "PiArrowDown" : "PiArrowUp"}
                            className="ml-2"
                          />
                        )}
                      </HStack>
                      {colProps.filtered && colProps.filtered.show && (
                        <Filter
                          initialFilterOption={colProps.filtered.initialFilterOption}
                          uniqueValues={uniqueValues}
                          values={colProps.filtered.values}
                          filters={filterOptions}
                          set={setFilterOptions}
                          type={colProps.filtered.type}
                          keyName={col}
                        />
                      )}
                      {headers.length - 1 != index && dividerHeader && cardHeader && (
                        <Divider orientation="vertical" className="absolute right-0 top-0 m-0 h-full" />
                      )}
                    </Text>
                  );
                })}
            </Card>
            <div
              style={{ height: height, minHeight: minHeight, maxHeight: height }}
              className={body({
                class: classNames?.body,
                compact,
                elevated: compact && !cardHeader && elevated,
              })}
            >
              {itemsPaginados &&
                itemsPaginados.length > 0 &&
                itemsPaginados.map((row, rowI) => (
                  <Card
                    key={rowI}
                    onClick={() => {
                      onClickRow && onClickRow({ row: row, index: rowI + 1 });
                    }}
                    onDoubleClick={() => {
                      onDbClickRow && onDbClickRow({ row: row, index: rowI + 1 });
                    }}
                    className={r({
                      class: typeof rowClass === "function" ? rowClass({ row, rowIndex: rowI + 1 }) : rowClass,
                      gap,
                      size,
                      rounded,
                      clickable,
                      compact,
                      reactive,
                      cardHeader,
                      elevated,
                      selected: !!selectedRows?.find((a) => a == row.pk),
                      striped: striped ? (Number(rowI) % 2 ? true : false) : false,
                    })}
                    {...cardProps}
                  >
                    {checkRow && checkRow.show && (
                      <HStack
                        key={"cellKeyCheck"}
                        style={{ flexGrow: checkRow.colProps?.grow }}
                        className={cell({
                          size,
                          class:
                            typeof checkRow.colProps?.cellClass === "function"
                              ? checkRow.colProps?.cellClass({
                                  value: "true",
                                  row,
                                  colIndex: 0,
                                  rowIndex: rowI,
                                  key: "check",
                                })
                              : checkRow.colProps?.cellClass,
                          textAlign: checkRow.colProps?.align,
                        })}
                      >
                        <Checkbox
                          className="p-2"
                          color="default"
                          onChange={() => {
                            setCheckeds((prevSelecteds) => {
                              if (checkRow.selectionMode === "single") {
                                if (prevSelecteds.includes(row.pk)) {
                                  return [];
                                } else {
                                  return [row.pk];
                                }
                              } else {
                                if (prevSelecteds.includes(row.pk)) {
                                  return prevSelecteds.filter((item) => item !== row.pk);
                                } else {
                                  return [...prevSelecteds, row.pk];
                                }
                              }
                            });
                          }}
                          {...(typeof checkRow.checkBoxProps === "function"
                            ? checkRow.checkBoxProps({
                                value: String(checkeds.includes(row.pk)),
                                row,
                                colIndex: 0,
                                rowIndex: rowI + 1,
                                key: "colCheck",
                              })
                            : checkRow.checkBoxProps)}
                          isSelected={checkeds.includes(row.pk)}
                        />
                        {dividerData && <Divider orientation="vertical" className="absolute right-0 m-0 h-1/2" />}
                      </HStack>
                    )}

                    {headers &&
                      headers.map((key, colI) => {
                        const colIndex = colI + 1;
                        const rowIndex = rowI + 1;
                        const cellKey = `${rowIndex}-${colIndex}`;

                        if (!key || !columns || !columns[key]) {
                          return;
                        }

                        if (columns[key].hidden) {
                          return;
                        }

                        const {
                          cellRenderer,
                          onPress,
                          onEdit,
                          format,
                          cellTextClass: ct,
                          editable: edit,
                          grow,
                          cellTextProps: ctp,
                          align,
                          cellClass: c,
                        } = columns[key];

                        const selected = !!selectedRows?.find((a) => a == row.pk);
                        const colProps = columns[key];
                        const value = row[key as keyof typeof row];
                        const hasDivider = Object.keys(row).length - 1 != colIndex && dividerData;
                        const cellTextClass =
                          typeof ct === "function" ? ct({ value, row, colIndex, rowIndex, key }) : ct;
                        const cellClass = typeof c === "function" ? c({ value, row, colIndex, rowIndex, key }) : c;
                        const editable =
                          typeof edit === "function" ? edit({ value, row, colIndex, rowIndex, key }) : edit;
                        const cellTextProps = {
                          ...cellTextPropsCol,
                          ...(typeof ctp === "function" ? ctp({ value, row, colIndex, rowIndex, key }) : ctp),
                        };

                        if (columns && cellRenderer) {
                          return (
                            <HStack
                              onClick={() => {
                                onPress && onPress({ value, row, colIndex, rowIndex, key });
                              }}
                              key={cellKey}
                              style={{ flexGrow: grow }}
                              className={cell({ class: cellClass, size, textAlign: columns && align })}
                            >
                              {cellRenderer({ value, row, colIndex, rowIndex, key })}
                              {hasDivider && <Divider orientation="vertical" className="absolute right-0 m-0 h-1/2" />}
                            </HStack>
                          );
                        }

                        if (columns && editable) {
                          return (
                            <CellEditable
                              reactive={reactive}
                              selected={selected}
                              size={size}
                              rowIndex={rowIndex}
                              colIndex={colIndex}
                              onEdit={onEdit}
                              columns={columns}
                              row={row}
                              format={format}
                              value={value}
                              colProps={colProps}
                              key={cellKey}
                              onChange={colProps.onChange}
                              chave={key}
                              set={setData}
                              data={d}
                              hasDivider={hasDivider}
                              ref={cellRefs.current[cellKey]}
                              compact={compact}
                              cellTextClass={cellTextClass}
                              cellClass={cellClass}
                              cellTextProps={cellTextProps}
                              datakey={key}
                            />
                          );
                        }

                        return (
                          <HStack
                            onClick={() => {
                              onPress && onPress({ value, row, colIndex, rowIndex, key });
                            }}
                            key={cellKey}
                            style={{ flexGrow: grow }}
                            className={cell({
                              size,
                              class: cellClass,
                              textAlign: columns && align,
                            })}
                          >
                            <Text
                              {...cellTextProps}
                              as={"span"}
                              className={cellText({
                                class: cellTextClass,
                                compact,
                                selected,
                                reactive,
                                textAlign: columns && align,
                              })}
                            >
                              {format ? format({ value, row, colIndex, rowIndex, key }) : value}
                            </Text>
                            {hasDivider && <Divider orientation="vertical" className="absolute right-0 m-0 h-1/2" />}
                          </HStack>
                        );
                      })}
                  </Card>
                ))}
              {!itemsPaginados ||
                (itemsPaginados.length == 0 && emptyData.show && (
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
                ))}
            </div>
          </div>
          {pagination &&
            pagination.show &&
            itemsFiltrados &&
            itemsFiltrados.length > 0 &&
            Math.ceil(itemsFiltrados.length / pagination.itemsPerPage) != 1 && (
              <HStack
                justifyContent={
                  pagination.position == "center" ? "center" : pagination.position == "end" ? "end" : "start"
                }
                className="w-full"
              >
                <Pagination
                  totalPages={Math.ceil(itemsFiltrados.length / pagination.itemsPerPage)}
                  currentPage={page}
                  onChange={(value) => {
                    value && setPage(value);
                  }}
                  control
                  className="py-2"
                  {...pagination.props}
                />
              </HStack>
            )}
        </div>
      );
    },
  ),
);

export default FlexTable;
