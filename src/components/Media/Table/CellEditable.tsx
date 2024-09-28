import React, { forwardRef, useEffect, useState } from "react";
import Icon from "../../../elements/Media/Icon";
import Divider from "../Divider";
import { IColProps, IColumn, IRowCell, cellText, cell } from "../FlexTable";
import { useFocusRing } from "react-aria";
import TextField from "../../../elements/Form/TextField";
import Text from "../../../elements/Typography/Text";

export const CellEditable = forwardRef(
  (
    {
      colProps,
      value,
      row,
      columns,
      rowIndex,
      size,
      chave,
      colIndex,
      onEdit,
      onChange,
      set,
      format,
      hasDivider,
      reactive,
      selected,
      compact,
      cellTextClass,
      cellClass,
      cellTextProps,
      datakey: key,
      data,
    }: {
      colProps: IColProps<any>;
      value: string;
      row: any;
      columns: IColumn<any>;
      rowIndex: number;
      reactive: boolean;
      colIndex: number;
      size: "2xs" | "xs" | "sm" | "md" | "lg" | "xl";
      onEdit?: (props: IRowCell<any>) => void;
      onChange?: (props: IRowCell<any>) => string;
      set: React.Dispatch<React.SetStateAction<any[]>>;
      format?: (props: IRowCell<any>) => string;
      cellClass?: string;
      cellTextClass?: string;
      cellTextProps?: any;
      chave: string;
      hasDivider: boolean | undefined;
      selected: boolean;
      compact: boolean;
      datakey: any;
      data: any;
    },
    ref: any,
  ) => {
    const inputProps =
      typeof colProps.inputProps === "function"
        ? colProps.inputProps({ value, row, colIndex, rowIndex, key })
        : colProps.inputProps;

    const [state, setState] = useState(false);
    const [text, setText] = useState(value);

    useEffect(() => {
      setText(value);
    }, [data, value]);

    let { isFocused, focusProps } = useFocusRing();

    useEffect(() => {
      isFocused && setState(true);
    }, [isFocused]);

    return (
      <button
        ref={ref}
        aria-label="celula"
        onFocus={() => {
          setState(true);
        }}
        onClick={() => {
          setState(true);
          colProps.onPress && colProps.onPress({ value, row, colIndex, rowIndex, key });
        }}
        style={{ flexGrow: colProps.grow }}
        className={cell({ class: cellClass, editable: true, size, textAlign: columns && colProps.align })}
        {...focusProps}
      >
        {state ? (
          <TextField
            isBlock
            onBlur={() => {
              set((prevData) => {
                return prevData.map((dataItem, dataIndex) => {
                  if (row.pk === dataItem.pk) {
                    return {
                      ...dataItem,
                      [chave]: text,
                    };
                  }
                  return dataItem;
                });
              });
              onEdit && onEdit({ value: text, row, rowIndex, colIndex, key });
              setState(false);
            }}
            size={
              size == "2xs" || size == "xs" || size == "sm" ? "xs" : size == "md" ? "sm" : size == "lg" ? "md" : "md"
            }
            onChange={(value) => {
              const newValue = onChange && onChange({ value, row, rowIndex, colIndex, key });
              setText(newValue ? newValue : value);
            }}
            value={text}
            className="ml-1 pr-2"
            aria-label="input"
            {...inputProps}
            autoFocus
            classNames={{ ...inputProps?.classNames, inner: `!border-primary-400 ${inputProps?.classNames?.inner}` }}
          />
        ) : (
          <Text
            {...cellTextProps}
            as={"span"}
            className={cellText({
              class: cellTextClass,
              editable: true,
              reactive,
              textAlign: columns && colProps.align,
              selected,
              compact,
            })}
          >
            {format ? format({ value, row, colIndex, rowIndex, key }) : value}
            <Icon name="MdEdit" size="xs" color="primary" className="-mt-1 ml-2 hidden group-hover:block" />
          </Text>
        )}
        {hasDivider && (
          <Divider orientation="vertical" className="absolute right-0 top-1/2 m-0 h-1/2 -translate-y-1/2" />
        )}
      </button>
    );
  },
);
