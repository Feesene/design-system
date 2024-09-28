import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import SideBar, { ISideBar, Pattern, SideBarProvider, useSideBar } from "./SideBar";
import Button from "../../elements/Form/Button";

const meta = {
  component: SideBar,
  args: {},
  argTypes: {},
  decorators: [
    (Story) => (
      <SideBarProvider componentLink={"button"}>
        <Story />
      </SideBarProvider>
    ),
  ],
  render: (props) => {
    const { windowSize } = useSideBar();

    return (
      <Pattern
        sideBar={
          <SideBar logo={<>LOGO</>}>
            <SideBar.Content>
              <SideBar.Item label="Home" href="/dsa" icon={"PiHouse"} activeIcon={"PiHouseFill"} />
              <SideBar.Item label="Layout de gelipes" icon={"PiCircuitry"} activeIcon={"PiCircuitryFill"}>
                <SideBar.Group href="/layout/lists" label="Lists" />
                <SideBar.Group label="Chart examples">
                  <SideBar.GroupItem href="/iframe.html" icon={"MdLineAxis"} label="chart 1" />
                  <SideBar.GroupItem href="/layout/charts/chart2" icon={"MdLineAxis"} label="chart 2" />
                  <SideBar.GroupItem href="/teste" icon={"MdLineAxis"} label="chart 3" />
                </SideBar.Group>
                <SideBar.Group label="Examples">
                  <SideBar.GroupItem href="/layout/examples/teste1" icon={"MdAddChart"} label="teste 1" />
                  <SideBar.GroupItem href="/layout/examples/teste2" icon={"MdAddChart"} label="teste 2" />
                  <SideBar.GroupItem href="/layout/examples/teste3" icon={"MdAddChart"} label="teste 3" />
                </SideBar.Group>
              </SideBar.Item>
              <SideBar.Item label="Usuários" icon={"PiUsers"} activeIcon={"PiUsersFill"}>
                <SideBar.Group href="/usuarios/adicionar" label="Adicionar" />
                <SideBar.Group href="/teste" label="Remover" />
                <SideBar.Group label="Listar">
                  <SideBar.GroupItem href="/usuarios/lista1" icon={"MdList"} label="Lista 1" />
                  <SideBar.GroupItem href="/usuarios/lista2" icon={"MdList"} label="Lista 2" />
                  <SideBar.GroupItem href="/usuarios/lista3" icon={"MdList"} label="Lista 3" />
                </SideBar.Group>
              </SideBar.Item>
              <SideBar.Item href="/veiculos" label="Carros" icon={"PiCar"} activeIcon={"PiCarFill"} />
            </SideBar.Content>
            <SideBar.Footer>
              <SideBar.Avatar
                user="Felipe Sene Ribeiro"
                subTitle="Programador"
                content={[
                  {
                    icon: "PiUser",
                    label: "Perfil",
                    description: "Ver seu perfil",
                    onPress: () => {
                      alert("perfil");
                    },
                  },
                  { icon: "PiUsersThree", label: "Equipe", description: "Gerenciar equipe" },
                  { icon: "PiGear", label: "Configurações", description: "Configurações da conta" },
                ]}
                footer={
                  <Button leftIcon="PiSignOut" isBlock color="primary">
                    Logout
                  </Button>
                }
              ></SideBar.Avatar>
            </SideBar.Footer>
          </SideBar>
        }
      >
        {windowSize?.width}
      </Pattern>
    );
  },
  tags: ["autodocs"],
} satisfies Meta<ISideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
