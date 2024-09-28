import { Column, FilterFn } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import PopoverTrigger from "../PopoverTrigger";
import Form from "../../../elements/Form/Form";
import VStack from "../../../elements/Layout/VStack";
import SelectField from "../../../elements/Form/SelectField";
import TextField from "../../../elements/Form/TextField";
import Checkbox from "../../../elements/Form/Checkbox";
import DatePicker from "../../../elements/Form/DatePicker";
import { getLocalTimeZone } from "@internationalized/date";
import DateRangePicker from "../../../elements/Form/DateRangePicker";
import HStack from "../../../elements/Layout/HStack";
import Button from "../../../elements/Form/Button";
import Icon from "../../../elements/Media/Icon";
import { format, parseISO, isSameDay, isAfter, isBefore, isEqual, isWithinInterval } from "date-fns";
import ScrollWrapper from "../../../elements/Layout/ScrollWrapper";
import ListView from "../../../elements/Form/ListView";

const opcoes: { id: string; title: string; name: IOptionsFilter }[] = [
  { id: "1", name: "CONTEM", title: "Contém" },
  { id: "2", name: "IGUAL", title: "Igual" },
  { id: "3", name: "COMECA COM", title: "Começa com" },
  { id: "4", name: "DIFERENTE", title: "Diferente" },
  { id: "5", name: "MENOR", title: "Menor" },
  { id: "6", name: "MENOR OU IGUAL", title: "Menor ou igual" },
  { id: "7", name: "MAIOR OU IGUAL", title: "Maior ou igual" },
  { id: "8", name: "MAIOR", title: "Maior" },
  { id: "9", name: "ENTRE", title: "Entre" },
  { id: "10", name: "SELECIONAR", title: "Selecionar" },
];

type ITypes = "string" | "number" | "boolean" | "date";

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

interface FilterValue {
  filterValue: string;
  filterValues: any[];
  type: ITypes;
  option: IOptionsFilter;
}

export const filtroIndividual: FilterFn<any> = (row, columnId, filterValue: FilterValue) => {
  const itemValue: any = row.getValue(columnId);

  if (!filterValue) return true;

  if (filterValue.option == "SELECIONAR") {
    const filtered = filterValue.filterValues.find((a) => {
      if (a == "(Vazios)" && (itemValue == "" || !itemValue) && itemValue !== 0) {
        return true;
      }

      return String(a) === String(itemValue);
    });
    return filtered === 0 ? true : !!filtered;
  }

  switch (filterValue.type) {
    case "string":
      const itemValueString = String(itemValue);
      switch (filterValue.option) {
        case "CONTEM":
          return itemValueString.toLowerCase().includes(filterValue.filterValue.toLowerCase());
        case "IGUAL":
          return itemValueString.toLowerCase() === filterValue.filterValue.toLowerCase();
        case "COMECA COM":
          return itemValueString.toLowerCase().startsWith(filterValue.filterValue.toLowerCase());
        case "DIFERENTE":
          return itemValueString.toLowerCase() !== filterValue.filterValue.toLowerCase();
        default:
          return false;
      }

    case "number":
      const numItemValue = Number(itemValue);
      const numFilterValue = Number(filterValue.filterValue) || 0;
      switch (filterValue.option) {
        case "IGUAL":
          return numItemValue === numFilterValue;
        case "DIFERENTE":
          return numItemValue !== numFilterValue;
        case "MAIOR":
          return numItemValue > numFilterValue;
        case "MENOR":
          return numItemValue < numFilterValue;
        case "MAIOR OU IGUAL":
          return numItemValue >= numFilterValue;
        case "MENOR OU IGUAL":
          return numItemValue <= numFilterValue;
        case "CONTEM":
          return String(numItemValue).toLowerCase().includes(filterValue.filterValue.toLowerCase());
        case "ENTRE":
          const [min, max] = filterValue.filterValue.split(",").map(Number);
          return numItemValue >= min && numItemValue <= max;
        default:
          return false;
      }

    case "boolean":
      return itemValue === (filterValue.filterValue.toLowerCase() === "true");

    case "date":
      try {
        const formatedItemValue = format(itemValue, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
        const dateItemValue = parseISO(formatedItemValue);
        const dateFilterValue = parseISO(filterValue.filterValue);

        switch (filterValue.option) {
          case "IGUAL":
            return isSameDay(dateItemValue, dateFilterValue);
          case "DIFERENTE":
            return !isSameDay(dateItemValue, dateFilterValue);
          case "MAIOR":
            return isAfter(dateItemValue, dateFilterValue);
          case "MENOR":
            return isBefore(dateItemValue, dateFilterValue);
          case "MAIOR OU IGUAL":
            return isAfter(dateItemValue, dateFilterValue) || isEqual(dateItemValue, dateFilterValue);
          case "MENOR OU IGUAL":
            return isBefore(dateItemValue, dateFilterValue) || isEqual(dateItemValue, dateFilterValue);
          case "ENTRE":
            const [startDate, endDate] = filterValue.filterValue.split(",").map((date) => parseISO(date));
            return isWithinInterval(dateItemValue, { start: startDate, end: endDate });
          default:
            return false;
        }
      } catch (err) {
        console.error(err);
        return false;
      }

    default:
      return false;
  }
};

function useFacetedUniqueValues(column: Column<any, unknown>) {
  const [uniqueValues, setUniqueValues] = useState<any[]>([]);

  useEffect(() => {
    const computeUniqueValues = () => {
      const rowModel = column.getFacetedRowModel();
      const uniqueValuesSet = new Set<any>();

      rowModel.flatRows.forEach((row) => {
        const value = row.getValue(column.id);
        uniqueValuesSet.add(value);
      });

      const uniqueValuesArray = Array.from(uniqueValuesSet);
      uniqueValuesArray.sort((a, b) => (a > b ? 1 : -1));

      setUniqueValues(uniqueValuesArray);
    };

    computeUniqueValues();
  }, [column]);

  return uniqueValues;
}

export function Filter({ column }: { column: Column<any, unknown> }) {
  const { filterVariant = "string", filterBooleanValues, initialFilterOption } = column.columnDef.meta ?? {};
  const initialSelect = initialFilterOption ? opcoes.find((a) => a.name == initialFilterOption)?.id : false;
  const [state, setState] = useState(false);
  const [filter, setFilter] = useState<string | number>(String(column.getFilterValue() || ""));
  const [select, changeSelect] = useState<string>(
    initialSelect ? initialSelect : filterVariant == "date" || filterVariant == "number" ? "2" : "1",
  );
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const uniqueValuesMap = useFacetedUniqueValues(column);
  const uniqueValuesSet = new Set(uniqueValuesMap);
  const [values, setValues] = useState<any[]>(uniqueValuesMap);

  const addFilter = () => {
    column.setFilterValue({
      filterValues: values,
      filterValue: filter,
      type: filterVariant,
      option: opcoes.find((a) => select === a.id)?.name,
    });
    setState(false);
  };

  const cleanFilter = () => {
    column.setFilterValue(null);
    setFilter("");
    setValues([]);
    setState(false);
  };

  return (
    <PopoverTrigger
      onOpenChange={setState}
      isOpen={state}
      popoverProps={{ className: "bg-default-50 rounded-sm" }}
      popover={
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            addFilter();
          }}
        >
          <VStack className="gap-3 p-3">
            {filterVariant == "string" && (
              <SelectField
                aria-label="tipo"
                selectedKey={String(select)}
                onSelectionChange={(value) => {
                  changeSelect(String(value));
                }}
                size="sm"
                popoverProps={{ offset: 8 }}
              >
                {opcoes.map((value) => {
                  if (value.id == "1" || value.id == "2" || value.id == "3" || value.id == "4" || value.id == "10") {
                    return <SelectField.Option key={value.id}>{value.title}</SelectField.Option>;
                  }
                })}
              </SelectField>
            )}
            {filterVariant == "number" && (
              <SelectField
                aria-label="tipo"
                selectedKey={String(select)}
                onSelectionChange={(value) => {
                  changeSelect(String(value));
                }}
                size="sm"
                popoverProps={{ offset: 8 }}
              >
                {opcoes.map((value) => {
                  if (
                    value.id == "1" ||
                    value.id == "2" ||
                    value.id == "4" ||
                    value.id == "5" ||
                    value.id == "6" ||
                    value.id == "7" ||
                    value.id == "8" ||
                    value.id == "9" ||
                    value.id == "10"
                  ) {
                    return <SelectField.Option key={value.id}>{value.title}</SelectField.Option>;
                  }
                })}
              </SelectField>
            )}
            {filterVariant == "date" && (
              <SelectField
                aria-label="tipo"
                selectedKey={String(select)}
                onSelectionChange={(value) => {
                  changeSelect(String(value));
                }}
                size="sm"
                popoverProps={{ offset: 8 }}
              >
                {opcoes.map((value) => {
                  if (
                    value.id == "2" ||
                    value.id == "4" ||
                    value.id == "5" ||
                    value.id == "6" ||
                    value.id == "7" ||
                    value.id == "8" ||
                    value.id == "9" ||
                    value.id == "10"
                  ) {
                    return <SelectField.Option key={value.id}>{value.title}</SelectField.Option>;
                  }
                })}
              </SelectField>
            )}
            {filterVariant == "string" && select != "10" && (
              <TextField
                aria-label="filtro"
                value={String(filter)}
                onChange={setFilter}
                autoFocus
                isBlock
                size="sm"
                placeholder="Filtro"
              />
            )}

            {filterVariant == "boolean" && (
              <>
                <Checkbox
                  aria-label="verdadeiro"
                  onChange={(value) => {
                    setFilter("true");
                  }}
                  classNames={{ input: "dark:bg-dark-950" }}
                  isSelected={filter == "true" ? true : false}
                  color="primary"
                >
                  {filterBooleanValues?.true || "Verdadeiro"}
                </Checkbox>
                <Checkbox
                  aria-label="falso"
                  onChange={(value) => {
                    setFilter("false");
                  }}
                  classNames={{ input: "dark:bg-dark-950" }}
                  isSelected={filter == "false" ? true : false}
                  color="primary"
                >
                  {filterBooleanValues?.false || "Falso"}
                </Checkbox>
              </>
            )}
            {filterVariant == "number" && select != "9" && select != "10" && (
              <TextField
                aria-label="filtro"
                type="number"
                value={String(filter)}
                onChange={setFilter}
                autoFocus
                isBlock
                size="sm"
                placeholder="Filtro"
              />
            )}
            {filterVariant == "date" && select != "9" && select != "10" && (
              <DatePicker
                aria-label="filtro"
                size="sm"
                value={startDate}
                onChange={(value) => {
                  setStartDate(value);
                  setFilter(value.toDate(getLocalTimeZone()).toISOString());
                }}
                autoFocus
                className="w-full"
                granularity="minute"
              />
            )}
            {filterVariant == "number" && select == "9" && (
              <>
                <TextField
                  aria-label="filtro"
                  type="number"
                  value={String(filter).split(",")[0] || ""}
                  onChange={(value) => {
                    setFilter(value + "," + String(filter).split(",")[1]);
                  }}
                  autoFocus
                  isBlock
                  size="sm"
                  placeholder="Inicio"
                />
                <TextField
                  aria-label="filtro"
                  type="number"
                  value={String(filter).split(",")[1] || ""}
                  onChange={(value) => {
                    setFilter(String(filter).split(",")[0] + "," + value);
                  }}
                  isBlock
                  size="sm"
                  placeholder="Fim"
                />
              </>
            )}
            {filterVariant == "date" && select == "9" && (
              <DateRangePicker
                aria-label="dias"
                size="sm"
                granularity="minute"
                value={{ start: startDate, end: endDate }}
                onChange={(value) => {
                  setStartDate(value.start);
                  setEndDate(value.end);
                  setFilter(
                    value.start.toDate(getLocalTimeZone()).toISOString() +
                      "," +
                      value.end.toDate(getLocalTimeZone()).toISOString(),
                  );
                }}
              />
            )}
            {select == "10" && (
              <ScrollWrapper className="max-h-48 max-w-[250px] select-none overflow-x-hidden p-1">
                <VStack className="w-full">
                  <Checkbox
                    aria-label="Selecionar todos"
                    onChange={(bol) => {
                      const array = uniqueValuesMap.filter((a) => a).map((a) => String(a));
                      const newvalues =
                        uniqueValuesSet.has("") || uniqueValuesSet.has(undefined) || uniqueValuesSet.has(null)
                          ? ["(Vazios)", ...array]
                          : [...array];

                      if (bol) {
                        setValues(newvalues);
                      } else {
                        setValues([]);
                      }
                    }}
                    className="pb-1"
                    classNames={{ input: "dark:bg-dark-950" }}
                    isSelected={values.length >= uniqueValuesMap.length}
                    color="primary"
                  >
                    {`(Selecionar Tudo)`}
                  </Checkbox>
                  <ListView
                    selectionMode="multiple"
                    onSelectionChange={(e) => {
                      const selectedItems = [...e].map((key) => key);
                      setValues(selectedItems);
                    }}
                    autoFocus
                    selectedKeys={values}
                    classNames={{
                      input: "dark:bg-dark-950",
                      label: "max-w-[200px] overflow-hidden text-ellipsis text-nowrap",
                    }}
                  >
                    {uniqueValuesMap.map((value, i) => {
                      if ((value && value != "") || value === 0) {
                        return <ListView.Option key={value}>{String(value)}</ListView.Option>;
                      }
                    })}

                    {(uniqueValuesSet.has("") || uniqueValuesSet.has(undefined) || uniqueValuesSet.has(null)) && (
                      <ListView.Option key={"(Vazios)"}>{String(`(Vazios)`)}</ListView.Option>
                    )}
                  </ListView>
                </VStack>
              </ScrollWrapper>
            )}

            <HStack className="gap-2">
              <Button isBlock type="submit" size="sm" color="primary" variant="solid" aria-label="aplicar">
                Aplicar
              </Button>
              <Button isBlock onPress={cleanFilter} size="sm" variant="outline" color="error" aria-label="limpar">
                Limpar
              </Button>
            </HStack>
          </VStack>
        </Form>
      }
    >
      <Icon
        name={column.getFilterValue() ? "PiFunnelFill" : "PiFunnel"}
        size="xs"
        className={`outline-focused-group mr-1 rounded-full text-default-700 hover:text-default-900 active:text-default-700 group-focus-within:opacity-100
            ${state || column.getFilterValue() ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
      />
    </PopoverTrigger>
  );
}
