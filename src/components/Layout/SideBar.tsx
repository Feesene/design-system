"use client";

import React, { ReactElement, ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";
import Icon, { IconNames } from "../../elements/Media/Icon";
import { tv } from "tailwind-variants";
import HStack from "../../elements/Layout/HStack";
import VStack from "../../elements/Layout/VStack";
import Text from "../../elements/Typography/Text";
import { useButton } from "react-aria";
import ScrollWrapper from "../../elements/Layout/ScrollWrapper";
import PopoverTrigger from "../Media/PopoverTrigger";
import Divider from "../Media/Divider";
import Avatar from "../Media/Avatar";
import pegarIniciais from "../../utils/pegarIniciais";
import ActionButton from "../../elements/Form/ActionButton";

const SideBarContext = createContext<ISideBarContext>({} as ISideBarContext);

export const useSideBar = (): Pick<
  ISideBarContext,
  "expanded" | "changeExpanded" | "windowSize" | "isMobile" | "changePath" | "path" | "hidden" | "changeHidden"
> => {
  const context = useContext(SideBarContext);
  return context;
};

const useSideBarPrivate = (): ISideBarContext => {
  const context = useContext(SideBarContext);
  return context;
};

interface ISideBarContext {
  expanded: boolean;
  changeExpanded: (value: boolean) => void;
  hidden: boolean;
  changeHidden: (value: boolean) => void;
  closing: boolean;
  changeClosing: (value: boolean) => void;
  activeItem?: string;
  changeActiveItem: (value: string) => void;
  group?: ReactNode;
  changeGroup: (value: ReactNode) => void;
  selected?: string;
  changeSelected: (value?: string) => void;
  Link?: any;
  path?: string;
  changePath: (value: string) => void;
  colored?: boolean;
  isMobile?: boolean;
  windowSize?: {
    width: number;
    height: number;
  };
}

function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
}

export const SideBarProvider = ({
  children,
  colored = true,
  componentLink,
}: {
  children: React.ReactNode;
  componentLink?: any;
  colored?: boolean;
}) => {
  const [isColored] = useState(colored);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);
  const [group, setGroup] = useState<ReactNode>();
  const [selected, setSelected] = useState<string>();
  const [activeItem, setActiveItem] = useState<string>();
  const [path, setPath] = useState<string | undefined>(undefined);
  const [Link] = useState(componentLink);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number } | undefined>(getWindowDimensions());
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(location.pathname);
    }
  }, [expanded, group, selected, Link]);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowDimensions());
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (windowSize && windowSize.width <= 640) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [windowSize]);

  const changePath = (isSelect: string) => {
    setPath(isSelect);
  };

  const changeClosing = (isSelect: boolean) => {
    setClosing(isSelect);
  };

  const changeActiveItem = (isSelect: string) => {
    setActiveItem(isSelect);
  };

  const changeExpanded = (isSelect: boolean) => {
    setExpanded(isSelect);
  };

  const changeGroup = (isSelect: ReactNode) => {
    setGroup(isSelect);
  };

  const changeSelected = (isSelect?: string) => {
    setSelected(isSelect);
  };

  const changeHidden = (isSelect: boolean) => {
    setHidden(isSelect);
  };

  return (
    <SideBarContext.Provider
      value={{
        changeHidden,
        hidden,
        changeExpanded,
        changeClosing,
        closing,
        expanded,
        changeGroup,
        group,
        changePath,
        changeSelected,
        selected,
        Link,
        path,
        colored: isColored,
        isMobile,
        windowSize,
        activeItem,
        changeActiveItem,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export interface ISideBar {
  children?: React.ReactNode;
  className?: string;
  classNames?: {
    relative?: string;
    inner?: string;
    group?: string;
    label?: string;
    groupInner?: string;
    header?: string;
  };
  logo?: React.ReactElement;
}

const sidebar = tv({
  slots: {
    base: "absolute select-none max-mobile:w-full mobile:h-screen",
    relative: "h-full min-w-[70px] mobile:shadow-md",
    inner:
      "z-30 h-full min-w-[70px] overflow-hidden bg-default-100 dark:bg-dark-600 max-mobile:w-20 max-mobile:animate-fade-right max-mobile:animate-duration-200",
    group: "z-20 h-full bg-white py-4 shadow-md dark:bg-dark-500 dark:shadow-dark-800",
    label: "mb-2 px-6",
    groupInner: "min-w-[16rem] gap-1 overflow-hidden overflow-y-auto px-6",
    navBarMobile:
      "z-30 min-h-[60px] w-full overflow-hidden bg-primary-500 shadow-md dark:bg-dark-600 dark:shadow-dark-800",
    iconMobile: "absolute left-4 cursor-pointer text-white",
  },
  variants: {
    closing: {
      true: { group: "animate-fade-out-sidebar" },
      false: { group: "animate-fade-in-sidebar" },
    },
    isColored: {
      true: { inner: "bg-primary-500 max-mobile:bg-primary-600" },
      false: {},
    },
    isMobile: {
      true: {},
      false: { inner: "max-mobile:hidden" },
    },
  },
})();

/**
 *
 * Um componente React Sidebar é um elemento visual de interface de usuário que geralmente é posicionado ao lado principal do conteúdo em um layout de página. É comumente utilizado em aplicações web para fornecer navegação e acesso rápido a diferentes seções, funcionalidades ou páginas da aplicação.
 *
 * ## Como usar
 *
 * ```tsx
 *  <Pattern sideBar={
 *     <SideBar logo={<Logo logo="1" size={50}></Logo>}>
 *       <SideBar.Content>
 *         <SideBar.Item label="Home" href="/home" icon={"PiHouse"} activeIcon={"PiHouseFill"} />
 *         <SideBar.Item label="Layout" icon={"PiCircuitry"} activeIcon={"PiCircuitryFill"}>
 *           <SideBar.Group href="/layout/lists" label="Lists" />
 *           <SideBar.Group label="Chart examples">
 *             <SideBar.GroupItem href="/chart1" icon={"MdLineAxis"} label="chart 1" />
 *             <SideBar.GroupItem href="/layout/chart2" icon={"MdLineAxis"} label="chart 2" />
 *             <SideBar.GroupItem href="/layout/charts/chart3" icon={"MdLineAxis"} label="chart 3" />
 *           </SideBar.Group>
 *           <SideBar.Group label="Examples">
 *             <SideBar.GroupItem href="/layout/examples/teste1" icon={"MdAddChart"} label="teste 1" />
 *             <SideBar.GroupItem href="/layout/examples/teste2" icon={"MdAddChart"} label="teste 2" />
 *             <SideBar.GroupItem href="/layout/examples/teste3" icon={"MdAddChart"} label="teste 3" />
 *           </SideBar.Group>
 *         </SideBar.Item>
 *         <SideBar.Item label="Usuários" icon={"PiUsers"} activeIcon={"PiUsersFill"}>
 *           <SideBar.Group href="/usuarios/adicionar" label="Adicionar" />
 *           <SideBar.Group href="/usuarios/remover" label="Remover" />
 *           <SideBar.Group label="Listar">
 *             <SideBar.GroupItem href="/usuarios/lista1" icon={"MdList"} label="Lista 1" />
 *             <SideBar.GroupItem href="/usuarios/lista2" icon={"MdList"} label="Lista 2" />
 *             <SideBar.GroupItem href="/usuarios/lista3" icon={"MdList"} label="Lista 3" />
 *           </SideBar.Group>
 *         </SideBar.Item>
 *         <SideBar.Item href="/veiculos" label="Carros" icon={"PiCar"} activeIcon={"PiCarFill"} />
 *       </SideBar.Content>
 *       <SideBar.Footer>
 *         <SideBar.Avatar
 *              user="Felipe Sene"
 *              subTitle="Programador"
 *              content={[
 *                {
 *                  icon: "PiUser",
 *                  label: "Perfil",
 *                  description: "Ver seu perfil",
 *                  onPress: () => {
 *                    alert("perfil");
 *                  },
 *                },
 *                { icon: "PiUsersThree", label: "Equipe", description: "Gerenciar equipe" },
 *                { icon: "PiGear", label: "Configurações", description: "Configurações da conta" },
 *              ]}
 *              footer={
 *                <Button leftIcon="PiSignOut" isBlock color="primary">
 *                  Logout
 *                </Button>
 *              }
 *           ></SideBar.Avatar>
 *     </SideBar.Footer>
 *     </SideBar>
 * }>
 *    {sua_pagina}
 *  </Pattern>
 * ```
 *
 * ### Para utilizar variáveis do sideBar use `UseSideBAr`
 *
 */
const SideBar = ({ children, className, classNames, logo }: ISideBar) => {
  const { expanded, group, changeHidden, hidden, changeClosing, closing, colored, activeItem, changePath, isMobile } =
    useSideBarPrivate();
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closing && expanded) {
      return;
    }
    if (!expanded) {
      changeClosing(true);
      setTimeout(() => {
        setClosed(expanded);
        changeClosing(false);
      }, 300);
    } else {
      setClosed(expanded);
    }
  }, [expanded]);

  return isMobile ? (
    <>
      <HStack
        onClick={() => {
          if (typeof window !== "undefined") {
            changePath(location.pathname);
          }
        }}
        className={sidebar.base({ class: className })}
      >
        <HStack justifyContent="center" alignItems="center" className={sidebar.navBarMobile({ class: "" })}>
          <Icon
            name={hidden ? "MdOutlineArrowBackIos" : "PiListBold"}
            onClick={() => {
              changeHidden(!hidden);
            }}
            className={sidebar.iconMobile({})}
          />
          {logo && <SideBarHeader className={classNames?.header}>{logo}</SideBarHeader>}
        </HStack>
      </HStack>
      <div className={"min-h-[60px] w-full"} />
      {hidden && (
        <HStack className="h-safe absolute left-0 top-[60px] h-24">
          <VStack className={sidebar.inner({ isColored: colored, isMobile })}>{children}</VStack>
          {expanded && group && (
            <VStack className={sidebar.group({ class: classNames?.group, closing })}>
              {activeItem && (
                <Text weight="medium" size="lg" className={sidebar.label({ class: classNames?.label })}>
                  {activeItem}
                </Text>
              )}
              <VStack
                justifyContent="start"
                alignItems="start"
                className={sidebar.groupInner({ class: classNames?.groupInner })}
              >
                {group}
              </VStack>
            </VStack>
          )}
        </HStack>
      )}
    </>
  ) : (
    <>
      <HStack
        onClick={() => {
          if (typeof window !== "undefined") {
            changePath(location.pathname);
          }
        }}
        className={sidebar.base({ class: className })}
      >
        <HStack
          justifyContent="center"
          alignItems="center"
          className={sidebar.navBarMobile({ class: "mobile:hidden" })}
        >
          <Icon
            name={hidden ? "MdOutlineArrowBackIos" : "PiListBold"}
            onClick={() => {
              changeHidden(!hidden);
            }}
            className={sidebar.iconMobile({})}
          />
          {logo && <SideBarHeader className={classNames?.header}>{logo}</SideBarHeader>}
        </HStack>
        <VStack
          justifyContent="between"
          alignItems="center"
          className={sidebar.inner({ class: classNames?.inner, isColored: colored, isMobile })}
        >
          {logo && <SideBarHeader>{logo}</SideBarHeader>}
          {children}
        </VStack>
        {closed && group && (
          <VStack className={sidebar.group({ class: classNames?.group, closing })}>
            {activeItem && (
              <Text weight="medium" size="lg" className={sidebar.label({ class: classNames?.label })}>
                {activeItem}
              </Text>
            )}
            <VStack
              justifyContent="start"
              alignItems="start"
              className={sidebar.groupInner({ class: classNames?.groupInner })}
            >
              {group}
            </VStack>
          </VStack>
        )}
      </HStack>
      <div className={sidebar.relative({ class: classNames?.relative })} />
    </>
  );
};

const sidebarheader = tv({
  slots: {
    base: "h-[10%] w-full",
  },
  variants: {},
})();

const SideBarHeader = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return (
    <VStack justifyContent="center" alignItems="center" className={sidebarheader.base({ class: className })}>
      {children}
    </VStack>
  );
};

const sidebarcontent = tv({
  slots: {
    base: "no-scrollbar h-[78%] w-full gap-2 overflow-y-auto overflow-x-hidden max-mobile:h-[82%]",
  },
  variants: {},
})();

const SideBarContent = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return <ScrollWrapper className={sidebarcontent.base({ class: className })}>{children}</ScrollWrapper>;
};

const sidebarfooter = tv({
  slots: {
    base: "h-[12%] w-full",
  },
  variants: {},
})();

const SideBarFooter = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return (
    <VStack alignItems="center" justifyContent="center" className={sidebarfooter.base({ class: className })}>
      {children}
    </VStack>
  );
};

const sidebaritem = tv({
  slots: {
    base: "group relative mb-1 flex h-12 w-full cursor-pointer flex-col items-center justify-center outline-none transition-all duration-300 focus-within:!text-white",
    title: "absolute top-9 text-center text-2xs leading-3",
  },
  variants: {
    isActive: {
      true: { base: "dark:text-primary-400" },
      false: { base: "dark:text-dark-200 dark:hover:text-primary-400" },
    },
    isColored: {
      true: {},
      false: {},
    },
  },
  compoundSlots: [
    { slots: ["base"], isColored: true, isActive: true, class: "text-white" },
    { slots: ["base"], isColored: true, isActive: false, class: "text-default-400 hover:text-default-100" },
    { slots: ["base"], isColored: false, isActive: true, class: "text-primary-400" },
    { slots: ["base"], isColored: false, isActive: false, class: "text-neutral-400 hover:text-primary-400" },
  ],
})();

const SideBarItem = ({
  children,
  href,
  activeIcon,
  label,
  icon,
  className,
  links,
}: {
  children?: React.ReactNode;
  icon: IconNames;
  activeIcon?: IconNames;
  href?: string;
  label: string;
  className?: string;
  links?: string[];
}) => {
  const {
    changeActiveItem,
    changeExpanded,
    colored,
    path,
    Link,
    selected,
    expanded,
    closing,
    changeSelected,
    changeGroup,
  } = useSideBarPrivate();
  const [actived, setActived] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [A, setA] = useState<any>("span");
  const ref = useRef<HTMLSpanElement | null>(null);

  let { buttonProps } = useButton(
    {
      elementType: "span",
      onPress: (e) => {
        if (!href) {
          if (e.target.childNodes[1] && e.target.childNodes[1].hasChildNodes()) {
            if (closing) return;
            changeGroup(children);
            changeSelected(label);
            changeActiveItem(label);

            if (!selected) {
              changeExpanded(!expanded);
            }

            if (label == selected) {
              changeExpanded(!expanded);
              changeSelected();
            }

            return;
          }
        }
        changeSelected();
        changeExpanded(false);
      },
    },
    ref,
  );

  useEffect(() => {
    if (href && Link) {
      setA(Link);
    } else if (href && !Link) {
      setA("a");
    } else {
      setA("span");
    }
  }, [Link, href]);

  useEffect(() => {
    if (selected == label) {
      return setActived(true);
    } else if (!selected && path && href && path == href) {
      return setActived(true);
    } else if (href) {
      return setActived(false);
    } else if (!href && selected && selected != label) {
      return setActived(false);
    }

    let testing = false;

    if (!children) {
      if (!testing) {
        const finded = links?.find((a) => a == path);
        if (finded) testing = true;
        setActived(testing);
        return;
      }
    }

    const newChildren: any = children;

    if (newChildren && newChildren.props && newChildren.props.href) {
      if (newChildren.props.href == path) {
        testing = true;
      }
    } else {
      const isObject =
        typeof newChildren === "object" && !Array.isArray(newChildren) && newChildren !== null ? true : false;

      const childs =
        newChildren.props && newChildren.props.children
          ? newChildren.props.children
          : isObject
            ? [newChildren]
            : newChildren;

      childs &&
        childs.map &&
        childs.map((child: ReactElement) => {
          if (child && child.props && child.props.href) {
            if (child.props.href == path) {
              testing = true;
            }
          }
          if (child && child.props && child.props.children) {
            const subChilds: any = child.props.children;
            if (subChilds && subChilds.props && subChilds.props.href) {
              if (subChilds.props.href == path) {
                testing = true;
              }
            } else {
              subChilds.map((subChild: ReactElement) => {
                if (subChild && subChild.props && subChild.props.href) {
                  if (subChild.props.href == path) {
                    testing = true;
                  }
                }
              });
            }
            if (child && child.props && child.props.href && child.props.href == path) {
              testing = true;
            }
          }
        });
    }

    if (!testing) {
      const finded = links?.find((a) => a == path);
      if (finded) testing = true;
    }

    setActived(testing);
  }, [children, href, label, selected, path]);

  useEffect(() => {
    if (!expanded) {
      changeSelected();
    }
  }, [expanded]);

  return (
    <A
      ref={ref}
      {...buttonProps}
      href={String(href)}
      to={String(href)}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={sidebaritem.base({
        class: className,
        isColored: colored,
        isActive: actived,
      })}
    >
      {activeIcon && actived ? <Icon name={activeIcon} size={"lg"} /> : <Icon name={icon} size={"lg"} />}
      {
        <p className={sidebaritem.title({ class: `${hovered ? "" : "group-focus-within:block mobile:hidden"}` })}>
          {label}
        </p>
      }
      <div className="hidden">{children}</div>
    </A>
  );
};

const sidebargroup = tv({
  slots: {
    base: "w-full cursor-pointer py-2",
    inner: "flex w-full cursor-pointer flex-col items-center justify-start text-sm text-neutral-400 dark:text-dark-200",
    group: "mt-2 w-full animate-fade-down animate-duration-75",
    icon: "transition-all",
  },
  variants: {
    expanded: {
      true: { icon: "rotate-90" },
      false: { group: "hidden" },
    },
    actived: {
      true: "",
      false: { inner: "hover:text-neutral-600 dark:hover:text-dark-100" },
    },
    href: {
      true: { group: "hidden" },
    },
  },
  compoundSlots: [
    {
      slots: ["inner"],
      expanded: true,
      href: false,
      class: "font-semibold text-neutral-500 dark:text-dark-100",
    },
    {
      slots: ["inner"],
      actived: true,
      href: false,
      class: "font-semibold text-neutral-600 dark:text-white",
    },
    {
      slots: ["inner"],
      actived: true,
      href: true,
      class: "font-semibold text-primary-400 hover:text-primary-400 dark:text-primary-400 dark:hover:text-primary-400",
    },
  ],
})();

const SideBarGroup = ({
  children,
  href,
  label,
  icon,
}: {
  children?: React.ReactNode;
  icon?: IconNames;
  label: string;
  href?: string;
}) => {
  const { Link, path, changeExpanded } = useSideBarPrivate();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [actived, setActived] = useState(false);
  const [A, setA] = useState<any>("span");

  useEffect(() => {
    if (href && Link) {
      setA(Link);
    } else if (href && !Link) {
      setA("a");
    } else {
      setA("span");
    }
  }, [Link, href]);

  useEffect(() => {
    if (actived) {
      setExpanded(true);
    } else setExpanded(false);
  }, [actived]);

  useEffect(() => {
    if (path && href && path == href) {
      setActived(true);
    } else {
      setActived(false);
    }

    if (!children) return;
    let testing = false;
    const newChildren: any = children;
    if (newChildren && newChildren.props) {
      if (newChildren.props.href && newChildren.props.href == path) {
        testing = true;
      }
    } else {
      const isObject =
        typeof newChildren === "object" && !Array.isArray(newChildren) && newChildren !== null ? true : false;

      const childs =
        newChildren.props && newChildren.props.children
          ? newChildren.props.children
          : isObject
            ? [newChildren]
            : newChildren;

      childs &&
        childs.map &&
        childs.map((child: ReactElement) => {
          if (child && child.props && child.props.href) {
            if (child.props.href == path) {
              testing = true;
            }
          }
        });
    }

    setActived(testing);
  }, [children, href, label, expanded, path]);

  return (
    <VStack
      onClick={() => {
        if (href) {
          changeExpanded(false);
        }
      }}
      alignItems="center"
      justifyContent="center"
      className={sidebargroup.base({})}
    >
      <A to={String(href)} href={String(href)} className={sidebargroup.inner({ expanded, actived, href: !!href })}>
        <HStack justifyContent="between" alignItems="center" className="relative w-full">
          <HStack alignItems="center">
            {icon && <Icon name={icon} size={"sm"} className="mr-2" />}
            {label}
          </HStack>
          <div
            onClick={() => {
              if (!href) setExpanded(!expanded);
            }}
            className="absolute h-full w-full py-4"
          />
          {!href && <Icon name="MdArrowForwardIos" size={"xs"} className={sidebargroup.icon({ expanded })} />}
        </HStack>

        <VStack className={sidebargroup.group({ expanded, href: !!href })}>{children}</VStack>
      </A>
    </VStack>
  );
};

const sidebargroupitem = tv({
  slots: {
    base: "flex w-full cursor-pointer flex-row items-center justify-start gap-2 py-2 pl-4 font-light",
  },
  variants: {
    isActive: {
      false: {
        base: "text-neutral-400 hover:font-semibold hover:text-neutral-600 dark:text-dark-200 dark:hover:text-dark-100",
      },
      true: { base: "font-semibold text-primary-400 dark:text-primary-400" },
    },
  },
})();

const SideBarGroupItem = ({
  icon,
  label,
  href,
}: {
  children?: React.ReactNode;
  icon?: IconNames;
  href?: string;
  label: string;
}) => {
  const { Link, path, changeExpanded } = useSideBarPrivate();
  const [actived, setActived] = useState(false);
  const [A, setA] = useState<any>("span");

  useEffect(() => {
    if (href && Link) {
      setA(Link);
    } else if (href && !Link) {
      setA("a");
    } else {
      setA("span");
    }
  }, [Link, href]);

  useEffect(() => {
    if (path && href && path == href) {
      setActived(true);
    } else {
      setActived(false);
    }
  }, [path, href]);

  return (
    <HStack
      onClick={() => {
        if (href) {
          changeExpanded(false);
        }
      }}
    >
      <A to={String(href)} href={String(href)} className={sidebargroupitem.base({ isActive: actived })}>
        {icon && <Icon name={icon} size={"md"} />}
        {label}
      </A>
    </HStack>
  );
};

export const Pattern = ({ children, sideBar }: { sideBar?: React.ReactNode; children?: React.ReactNode }) => {
  const { expanded, changeExpanded } = useSideBarPrivate();
  return (
    <HStack
      bg="background"
      justifyContent="start"
      alignItems="start"
      className="relative h-screen w-full content-start overflow-hidden max-mobile:flex-wrap"
    >
      {sideBar}
      <ScrollWrapper
        onClick={() => {
          if (expanded) {
            changeExpanded(false);
          }
        }}
        className={"relative h-full w-full px-16 py-4 max-mobile:px-4"}
      >
        <VStack justifyContent="start" alignItems="center" className="h-full w-full">
          {children}
        </VStack>
      </ScrollWrapper>
    </HStack>
  );
};

interface IMenuValue {
  label: string;
  description?: string;
  icon?: IconNames;
  iconColor?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  hasDivider?: boolean;
  onPress?: () => void;
}

const SideBarAvatar = ({
  user,
  subTitle,
  header,
  footer,
  children,
  content,
}: {
  user?: string;
  subTitle?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  content?: IMenuValue[];
}) => {
  return (
    <PopoverTrigger
      showFocus
      placement="right top"
      popoverProps={{ offset: 20 }}
      classNames={{ button: "rounded-full" }}
      popover={
        <VStack gap={1} className="w-72 px-2 py-3">
          <HStack>
            <Avatar size="xl" initials={pegarIniciais(user)} />
            <VStack justifyContent="center" className="overflow-hidden px-4">
              <Text weight="bold" color="default" size="md" className="overflow-hidden text-ellipsis text-nowrap">
                {user}
              </Text>
              {subTitle && (
                <Text color="contentSecondary" className="overflow-hidden text-ellipsis text-nowrap">
                  {subTitle}
                </Text>
              )}
            </VStack>
          </HStack>

          {header}
          {(children || content) && (
            <>
              <Divider orientation="horizontal" />
              <VStack>
                {content &&
                  content.map((value, i) => {
                    return (
                      <>
                        {value.hasDivider && (
                          <Divider
                            key={"divider" + i}
                            orientation="horizontal"
                            size="sm"
                            className="bg-default-100 dark:bg-dark-700"
                          />
                        )}

                        <ActionButton
                          key={i}
                          onPress={value.onPress}
                          className={
                            "group flex w-full cursor-pointer items-center justify-start py-[6px] hover:bg-default-100/60 dark:hover:bg-dark-700"
                          }
                        >
                          {value.icon && (
                            <Icon
                              name={value.icon}
                              color="contentPrimary"
                              size={"lg"}
                              className={"ml-1 group-hover:text-primary-400"}
                            />
                          )}
                          <VStack className="px-4" justifyContent="start" alignItems="start">
                            <Text weight="bold" size={"md"} className={"text-default-900 dark:text-dark-100"}>
                              {value.label}
                            </Text>
                            {value.description && (
                              <Text size={"md"} className={"text-default-500 dark:text-dark-300"}>
                                {value.description}
                              </Text>
                            )}
                          </VStack>
                        </ActionButton>
                      </>
                    );
                  })}
              </VStack>

              <VStack gap={2}>{children}</VStack>
            </>
          )}
          {footer && (
            <>
              <Divider orientation="horizontal" color="contentTernary" />
              {footer}
            </>
          )}
        </VStack>
      }
    >
      <Avatar initials={pegarIniciais(user)} className="cursor-pointer" />
    </PopoverTrigger>
  );
};

SideBar.Header = SideBarHeader;
SideBar.Content = SideBarContent;
SideBar.Footer = SideBarFooter;
SideBar.Item = SideBarItem;
SideBar.Group = SideBarGroup;
SideBar.GroupItem = SideBarGroupItem;
SideBar.Avatar = SideBarAvatar;

export default SideBar;
