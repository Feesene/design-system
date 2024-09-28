"use client";

import {
  mergeProps,
  AriaTableProps,
  useFocusRing,
  useTable,
  useTableHeaderRow,
  useTableRowGroup,
  useTableColumnHeader,
  useTableRow,
  useTableCell,
  useTableSelectAllCheckbox,
  VisuallyHidden,
  useTableSelectionCheckbox,
} from "react-aria";
import {
  Cell as CellStately,
  Column as ColumnStately,
  Row as RowStately,
  SelectionBehavior,
  TableBody as TableBodyStately,
  TableHeader as TableHeaderStately,
  TableState,
  useTableState,
} from "react-stately";
import React, { CSSProperties, Key, ReactElement, useRef } from "react";
import { GridNode } from "@react-types/grid";
import { tv } from "tailwind-variants";
import Checkbox from "../../elements/Form/Checkbox";
import type { ColumnSize, TableProps } from "@react-types/table";

const table = tv({
  slots: {
    base: "w-full border-collapse",
    tablecell: "px-2 outline-none",
    tablerow:
      "h-6 max-h-6 cursor-default cursor-pointer border-b border-b-default-100 text-xs text-default-600 outline-none hover:bg-default-50 dark:border-b-dark-500 dark:text-dark-200 dark:hover:bg-dark-600",
    columnheader:
      "border-b-2 border-b-default-100 px-2 py-1 text-left text-sm text-default-950 outline-none dark:border-b-dark-500 dark:text-white",
  },
  variants: {
    striped: {
      true: {
        tablerow: "bg-default-100/15 dark:bg-dark-500/20",
      },
      false: {
        tablerow: "",
      },
    },
    isPressed: {
      true: {
        tablerow: "!bg-primary-200 !text-white",
      },
    },
    actived: {
      true: {
        tablerow: "!dark:bg-primary-400 !bg-primary-300 !text-white",
      },
    },
    isFocusVisible: {
      true: {
        // tablerow: "border border-warning",
        // tablecell: "border border-primary",
      },
    },
  },
});

const { base, tablecell, tablerow, columnheader } = table();

//INFO TableHeaderRow
function TableHeaderRow({
  item,
  state,
  children,
}: {
  children: ReactElement[];
  item: GridNode<unknown>;
  state: TableState<unknown>;
}) {
  let ref = useRef<any>();
  let { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr {...rowProps} ref={ref}>
      {children}
    </tr>
  );
}

//INFO TableRowGroup
function TableRowGroup({ type: Element, children }: { children: ReactElement[]; type: any }) {
  let { rowGroupProps } = useTableRowGroup();
  return <Element {...rowGroupProps}>{children}</Element>;
}

//INFO TableColumnHeader
function TableColumnHeader({
  column,
  state,
  className,
}: {
  column: GridNode<unknown>;
  state: TableState<unknown>;
  className?: string;
}) {
  let ref = useRef<any>();
  let { columnHeaderProps } = useTableColumnHeader({ node: column }, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();
  let arrowIcon = state.sortDescriptor?.direction === "ascending" ? "▲" : "▼";

  return (
    <th
      {...mergeProps(columnHeaderProps, focusProps)}
      colSpan={column.colspan}
      className={columnheader({ class: className })}
      ref={ref}
    >
      {column.rendered}
      {column.props.allowsSorting && (
        <span
          aria-hidden="true"
          style={{
            visibility: state.sortDescriptor?.column === column.key ? "visible" : "hidden",
          }}
        >
          {arrowIcon}
        </span>
      )}
    </th>
  );
}

//INFO TableRow
function TableRow({
  item,
  children,
  state,
  className,
  striped,
  actived,
  activedKeys,
}: {
  item: GridNode<unknown>;
  children: ReactElement[];
  state: TableState<unknown>;
  striped?: boolean;
  className?: string;
  actived?: boolean;
  activedKeys?: string[];
}) {
  let ref = useRef<any>();

  let isSelected = state.selectionManager.isSelected(item.key);
  let { rowProps, isPressed } = useTableRow(
    {
      node: item,
    },
    state,
    ref,
  );
  let { isFocusVisible, focusProps } = useFocusRing();

  const isActive = activedKeys?.find((value) => value == String(item.index));

  return (
    <tr
      style={
        {
          // backgroundColor: isActive ? "red" : "greenyellow",
          // background: isSelected
          //   ? "blueviolet"
          //   : isPressed
          //   ? "var(--spectrum-global-color-gray-400)"
          //   : Number(item.index) % 2
          //   ? "var(--spectrum-alias-highlight-hover)"
          //   : "none",
          // color: isSelected ? "white" : "#323232",
        }
      }
      className={tablerow({
        class: className,
        isFocusVisible,
        isPressed,
        actived: !!isActive,
        striped: striped ? (Number(item.index) % 2 ? true : false) : false,
      })}
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
    >
      {children}
    </tr>
  );
}

//INFO TableCell
function TableCell({
  cell,
  state,
  className,
}: {
  cell: GridNode<unknown>;
  state: TableState<unknown>;
  className?: string;
}) {
  let ref = useRef<any>();

  let { gridCellProps } = useTableCell({ node: cell }, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      className={tablecell({ class: className, isFocusVisible })}
      ref={ref}
    >
      {cell.rendered}
    </td>
  );
}

//INFO CHECKBOX CELL
function TableCheckboxCell({ cell, state }: { cell: GridNode<unknown>; state: TableState<unknown> }) {
  let ref = useRef<any>();
  let { gridCellProps } = useTableCell({ node: cell }, state, ref);
  let { checkboxProps } = useTableSelectionCheckbox({ key: Number(cell.parentKey) }, state);
  return (
    <td {...gridCellProps} ref={ref}>
      <Checkbox {...checkboxProps} />
    </td>
  );
}

//INFO SELECT ALL CELL
function TableSelectAllCell({ column, state }: { column: GridNode<unknown>; state: TableState<unknown> }) {
  let ref = useRef<any>();
  let { columnHeaderProps } = useTableColumnHeader({ node: column }, state, ref);
  let { checkboxProps } = useTableSelectAllCheckbox(state);
  return (
    <th {...columnHeaderProps} ref={ref}>
      {state.selectionManager.selectionMode === "single" ? (
        <VisuallyHidden>{checkboxProps["aria-label"]}</VisuallyHidden>
      ) : (
        <Checkbox {...checkboxProps} />
      )}
    </th>
  );
}

export interface ITableProps<T> extends AriaTableProps, TableProps<T> {
  selectionBehavior?: SelectionBehavior;
  onResizeStart?: (widths: Map<Key, ColumnSize>) => void;
  onResize?: (widths: Map<Key, ColumnSize>) => void;
  onResizeEnd?: (widths: Map<Key, ColumnSize>) => void;
  className?: string;
  children: any;
  striped?: boolean;
  style?: CSSProperties;
  classNames?: {
    tablecell?: string;
    tablerow?: string;
  };
  activedKeys?: string[];
}

/**
 * ```tsx
 *  <Table aria-label="Example static collection table" className="h-[200px] w-[500px]">
 *        <Table.Header>
 *        <Table.Column>Name</Table.Column>
 *        <Table.Column>Type</Table.Column>
 *        <Table.Column>Date Modified</Table.Column>
 *      </Table.Header>
 *      <Table.Body>
 *        <Table.Row>
 *          <Table.Cell>Games</Table.Cell>
 *          <Table.Cell>File folder</Table.Cell>
 *          <Table.Cell>6/7/2020</Table.Cell>
 *        </Table.Row>
 *        <Table.Row>
 *          <Table.Cell>Program Files</Table.Cell>
 *          <Table.Cell>File folder</Table.Cell>
 *          <Table.Cell>4/7/2021</Table.Cell>
 *        </Table.Row>
 *        <Table.Row>
 *          <Table.Cell>bootmgr</Table.Cell>
 *          <Table.Cell>System file</Table.Cell>
 *          <Table.Cell>11/20/2010</Table.Cell>
 *        </Table.Row>
 *        <Table.Row>
 *          <Table.Cell>log.txt</Table.Cell>
 *          <Table.Cell>Text Document</Table.Cell>
 *          <Table.Cell>1/18/2016</Table.Cell>
 *        </Table.Row>
 *      </Table.Body>
 *    </Table>
 * ```
 */
const Table = <T extends object>({ className, activedKeys, classNames, striped = false, ...props }: ITableProps<T>) => {
  let state = useTableState({
    ...props,
    showSelectionCheckboxes: true,
    // showSelectionCheckboxes: selectionMode === "multiple" && selectionBehavior !== "replace",
  });

  let ref = useRef<any>();
  let { collection } = state;
  let { gridProps } = useTable(props, state, ref);

  return (
    <table {...gridProps} ref={ref} className={base({ class: className })}>
      <TableRowGroup type="thead">
        {collection.headerRows.map((headerRow) => (
          <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
            {[...headerRow.childNodes].map((column) =>
              column.props.isSelectionCell ? (
                <TableSelectAllCell key={column.key} column={column} state={state} />
              ) : (
                <TableColumnHeader key={column.key} column={column} state={state} />
              ),
            )}
          </TableHeaderRow>
        ))}
      </TableRowGroup>
      <TableRowGroup type="tbody">
        {[...collection.body.childNodes].map((row) => (
          <TableRow
            key={row.key}
            item={row}
            state={state}
            striped={striped}
            activedKeys={activedKeys}
            className={classNames?.tablerow}
          >
            {[...row.childNodes].map((cell) =>
              cell.props.isSelectionCell ? (
                <TableCheckboxCell key={cell.key} cell={cell} state={state} />
              ) : (
                <TableCell key={cell.key} cell={cell} state={state} className={classNames?.tablecell} />
              ),
            )}
          </TableRow>
        ))}
      </TableRowGroup>
    </table>
  );
};

Table.Cell = CellStately;
Table.Column = ColumnStately;
Table.Row = RowStately;
Table.Body = TableBodyStately;
Table.Header = TableHeaderStately;

export default Table;
