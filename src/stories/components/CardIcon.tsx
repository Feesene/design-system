import React, { useState } from "react";
import Icon, { IconNames } from "../../elements/Media/Icon";
import Text from "../../elements/Typography/Text";

import * as iconsPi from "react-icons/pi";
import * as iconsMd from "react-icons/md";
import VStack from "../../elements/Layout/VStack";
import HStack from "../../elements/Layout/HStack";
import Card from "../../components/Media/Card";
import Pagination from "../../components/Media/Pagination";
import SearchField from "../../elements/Form/SearchField";
import { tags } from "./tagsIcons";
import PopoverTrigger from "../../components/Media/PopoverTrigger";
import Badge from "../../components/Media/Badge";

const getObjectKeys = <T extends object>(obj: T) => Object.keys(obj) as Array<keyof T>;
const iconNamesPi: IconNames[] = getObjectKeys(iconsPi);
const iconNamesMd: IconNames[] = getObjectKeys(iconsMd);

export const allIconNames: IconNames[] = [...iconNamesPi, ...iconNamesMd];

export const C = () => {
  const MAX = 1000;
  const [icons, setIcons] = useState(allIconNames);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [state, setState] = useState(false);
  const [timer, setTimer] = useState<number | NodeJS.Timeout | null>(null);

  const handleInputChange = (value: string) => {
    setState(true);
    setSearch(value);

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      setPage(1);
      searchFilteredIcons(value);
      setState(false);
    }, 500);

    setTimer(newTimer);
  };

  const searchFilteredIcons = (value: string) => {
    const regexWithOutSymbols = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(regexWithOutSymbols, "i");

    if (!value) {
      setIcons(allIconNames);
      return;
    }

    // const filteredIcons = allIconNames.filter((iconName) => regex.test(iconName));

    const filteredIcons = allIconNames.filter((iconName) => {
      const iconBaseName = iconName.replace(/^Pi|Md/, "").toLowerCase();

      const iconData = tags.find((icon) => icon.pascal_name.toLowerCase() === iconBaseName);

      if (iconData) {
        return (
          regex.test(iconName) ||
          iconData.tags.some((tag) => regex.test(tag)) ||
          iconData.categories.some((categorie) => regex.test(categorie))
        );
      }

      return regex.test(iconName);
    });

    setIcons(filteredIcons);
  };

  return (
    <VStack bg="background" alignItems="center">
      <SearchField
        aria-label="Pesquisar"
        placeholder="Pesquisar"
        isLoading={state}
        rounded
        // type="search"
        className="pt-4"
        value={search}
        onChange={handleInputChange}
      />
      <HStack className="w-full px-6">
        <Text className="!text-xs !text-default-600">{icons.length} Ícones encontrados</Text>
      </HStack>
      <HStack className="relative w-[98%] flex-wrap items-center justify-start gap-2 rounded-sm px-4">
        {icons.map((value, i) => {
          if (i >= (page - 1) * MAX && i <= (page - 1) * MAX + MAX) {
            const iconBaseName = value.replace(/^Pi|Md/, "").toLowerCase();
            const iconBaseNameWithouWeigh = iconBaseName.replace(/bold|duotone|fill|light|thin/, "").toLowerCase();

            const iconData = tags.find((icon) => icon.pascal_name.toLowerCase() === iconBaseNameWithouWeigh);

            const tagsFromIcon = iconData?.tags;
            const categoryFromIcon = iconData?.categories;

            return (
              <Card
                key={i}
                bg="surface"
                animation
                className="h-20 w-32 items-center justify-center gap-2 overflow-hidden rounded-md shadow-md"
              >
                <PopoverTrigger
                  placement="bottom"
                  asChild
                  arrow
                  popover={
                    <VStack className="items-center">
                      <Text className="pb-2">{value}</Text>
                      <Icon color="default" name={value} size="lg" className="mb-4 h-24 w-24 dark:text-white" />
                      <HStack gap={2} className="w-64 flex-wrap">
                        {categoryFromIcon &&
                          categoryFromIcon.map((tag, i) => (
                            <Badge key={i} size="sm" color="success" variant="outline" className="">
                              {tag}
                            </Badge>
                          ))}
                        {tagsFromIcon &&
                          tagsFromIcon.map((tag, i) => (
                            <Badge key={i} size="sm" color="primary" variant="outline" className="">
                              {tag}
                            </Badge>
                          ))}
                      </HStack>
                    </VStack>
                  }
                >
                  <button className="select-all">
                    <Icon color="default" name={value} size="md" className="dark:text-white" />
                  </button>
                </PopoverTrigger>
                <Text color="contentTernary" className="!my-0 !text-[11px] !text-default-500">
                  {value}
                </Text>
              </Card>
            );
          }
        })}
      </HStack>
      <Pagination
        totalPages={Math.floor(icons.length / MAX) + 1}
        currentPage={page}
        onChange={(value) => {
          setPage(Number(value));
        }}
        className="py-4"
      />
    </VStack>
  );
};
