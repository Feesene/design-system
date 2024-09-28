import { useEffect, useMemo, useState } from "react";
import { IFilterOptions, IOptionsFilter, ITypes } from "../FlexTable";
import PopoverTrigger from "../PopoverTrigger";
import VStack from "../../../elements/Layout/VStack";
import SelectField from "../../../elements/Form/SelectField";
import React from "react";
import TextField from "../../../elements/Form/TextField";
import Checkbox from "../../../elements/Form/Checkbox";
import DatePicker from "../../../elements/Form/DatePicker";
import { getLocalTimeZone } from "@internationalized/date";
import DateRangePicker from "../../../elements/Form/DateRangePicker";
import HStack from "../../../elements/Layout/HStack";
import Button from "../../../elements/Form/Button";
import Icon from "../../../elements/Media/Icon";
import { format, isAfter, isBefore, isEqual, isSameDay, isWithinInterval, parseISO } from "date-fns";
import Form from "../../../elements/Form/Form";
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

export const filtroIndividual = (
  itemValue: any,
  filterValue: string,
  type: ITypes,
  option: IOptionsFilter,
  selectedFilters?: any[],
): boolean => {
  if (itemValue === undefined) return false;

  if (option == "SELECIONAR" && selectedFilters) {
    const filtered = selectedFilters.find((a) => {
      if (a == "(Vazios)" && (itemValue == "" || !itemValue) && itemValue !== 0) {
        return true;
      }

      return String(a) === String(itemValue);
    });
    return filtered === 0 ? true : !!filtered;
  }

  switch (type) {
    case "string":
      const stringItemValue = String(itemValue);
      switch (option) {
        case "CONTEM":
          return stringItemValue.toLowerCase().includes(filterValue.toLowerCase());
        case "IGUAL":
          return stringItemValue.toLowerCase() === filterValue.toLowerCase();
        case "COMECA COM":
          return stringItemValue.toLowerCase().startsWith(filterValue.toLowerCase());
        case "DIFERENTE":
          return stringItemValue.toLowerCase() !== filterValue.toLowerCase();
        default:
          return false;
      }

    case "number":
      const numItemValue = Number(itemValue);
      const numFilterValue = Number(filterValue) || 0;
      switch (option) {
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
          return String(numItemValue).toLowerCase().includes(filterValue.toLowerCase());
        case "ENTRE":
          const [min, max] = filterValue.split(",").map(Number);
          return numItemValue >= min && numItemValue <= max;
        default:
          return false;
      }

    case "boolean":
      return itemValue === (filterValue.toLowerCase() === "true");

    case "date":
      try {
        const formatedItemValue = format(itemValue, "yyyy-MM-dd'T'HH:mm:ss.SSSX");
        const dateItemValue = parseISO(formatedItemValue);
        const dateFilterValue = parseISO(filterValue);

        switch (option) {
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
            const [startDate, endDate] = filterValue.split(",").map((date) => parseISO(date));
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

export const Filter = ({
  set,
  keyName: key,
  type,
  filters,
  values,
  uniqueValues = [],
  initialFilterOption,
}: {
  initialFilterOption?: IOptionsFilter;
  uniqueValues: any[];
  keyName: string;
  type: ITypes;
  filters: IFilterOptions[];
  set: React.Dispatch<React.SetStateAction<IFilterOptions[]>>;
  values?: { true: string; false: string };
}) => {
  uniqueValues.sort((a, b) => (a > b ? 1 : -1));
  const initialSelect = initialFilterOption ? opcoes.find((a) => a.name == initialFilterOption)?.id : false;
  const [filter, setFilter] = useState(filters.find((a) => a.key == key)?.filter || "");
  const [select, changeSelect] = useState<string>(
    initialSelect ? initialSelect : type == "date" || type == "number" ? "2" : "1",
  );
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const active = useMemo(() => {
    return !!filters.find((a) => a.key == key);
  }, [filters]);
  const [state, setState] = useState(false);
  const [selectedValues, setSelectedValues] = useState<any[]>([]); //INFO "(Vazios)", ...uniqueValues
  const selectedValuesSet = new Set(uniqueValues);

  const addFilter = () => {
    const option = opcoes.find((a) => a.id === select)?.name || "CONTEM";

    set((filters) => {
      const existingFilter = filters.find((value) => value.key === key);
      if (existingFilter) {
        existingFilter.filter = filter;
        existingFilter.type = type;
        existingFilter.selectedFilters = selectedValues;
        existingFilter.option = option;
      } else {
        filters.push({ key, filter, type, option, selectedFilters: selectedValues });
      }
      return [...filters];
    });
    setState(false);
  };

  const cleanFilter = () => {
    set((filters) => {
      const updatedFilters = filters.filter((value) => value.key !== key);
      return updatedFilters;
    });
    setFilter("");
    setSelectedValues([]);
    setEndDate(undefined);
    setStartDate(undefined);
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
            {type == "string" && (
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
            {type == "number" && (
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
            {type == "date" && (
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
            {type == "string" && select != "10" && (
              <TextField
                aria-label="filtro"
                value={filter}
                onChange={setFilter}
                autoFocus
                isBlock
                size="sm"
                placeholder="Filtro"
              />
            )}
            {type == "boolean" && (
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
                  {values?.true || "Verdadeiro"}
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
                  {values?.false || "Falso"}
                </Checkbox>
              </>
            )}
            {type == "number" && select != "9" && select != "10" && (
              <TextField
                aria-label="filtro"
                type="number"
                value={filter}
                onChange={setFilter}
                autoFocus
                isBlock
                size="sm"
                placeholder="Filtro"
              />
            )}
            {type == "date" && select != "9" && (
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
            {type == "number" && select == "9" && (
              <>
                <TextField
                  aria-label="filtro"
                  type="number"
                  value={filter.split(",")[0] || ""}
                  onChange={(value) => {
                    setFilter(value + "," + filter.split(",")[1]);
                  }}
                  autoFocus
                  isBlock
                  size="sm"
                  placeholder="Inicio"
                />
                <TextField
                  aria-label="filtro"
                  type="number"
                  value={filter.split(",")[1] || ""}
                  onChange={(value) => {
                    setFilter(filter.split(",")[0] + "," + value);
                  }}
                  isBlock
                  size="sm"
                  placeholder="Fim"
                />
              </>
            )}
            {type == "date" && select == "9" && (
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
                    aria-label="verdadeiro"
                    onChange={(bol) => {
                      const array = uniqueValues.filter((a) => a).map((a) => String(a));
                      const newvalues =
                        selectedValuesSet.has("") || selectedValuesSet.has(undefined) || selectedValuesSet.has(null)
                          ? ["(Vazios)", ...array]
                          : [...array];

                      if (bol) {
                        setSelectedValues(newvalues);
                      } else {
                        setSelectedValues([]);
                      }
                    }}
                    className="pb-1"
                    classNames={{ input: "dark:bg-dark-950" }}
                    isSelected={selectedValues.length >= uniqueValues.length}
                    color="primary"
                  >
                    {`(Selecionar Tudo)`}
                  </Checkbox>
                  <ListView
                    selectionMode="multiple"
                    onSelectionChange={(e) => {
                      const selectedItems = [...e].map((key) => key);
                      setSelectedValues(selectedItems);
                    }}
                    autoFocus
                    selectedKeys={selectedValues}
                    classNames={{
                      input: "dark:bg-dark-950",
                      label: "max-w-[200px] overflow-hidden text-ellipsis text-nowrap",
                    }}
                  >
                    {uniqueValues.map((value, i) => {
                      if ((value && value != "") || value === 0) {
                        return <ListView.Option key={value}>{String(value)}</ListView.Option>;
                      }
                    })}

                    {(selectedValuesSet.has("") || selectedValuesSet.has(undefined) || selectedValuesSet.has(null)) && (
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
        name={active ? "PiFunnelFill" : "PiFunnel"}
        size="xs"
        className={
          state || active
            ? "outline-focused-group ml-1 rounded-full text-default-700 outline-0 hover:text-default-900 active:text-default-700"
            : "outline-focused-group ml-1 hidden rounded-full text-default-700 hover:text-default-900 active:text-default-700 group-focus-within:block group-hover:block"
        }
      />
    </PopoverTrigger>
  );
};
