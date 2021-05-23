import React from 'react';
import { Menu } from 'antd';
import "./Navbar.css"
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a id="route-link" href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="archiv">
        <a id="route-link" href="/landingPage">Archiv</a>
      </Menu.Item>
      <SubMenu title={<span>Admin</span>}>
        <MenuItemGroup title="Fotografien Verwalten:">
      <Menu.Item key="addFoto" >
        <a id="route-link" href="/fotos/add">Hinzufügen</a>
      </Menu.Item>
      <Menu.Item key="viewFoto" >
        <a id="route-link" href="/fotos/view">Anschauen</a>
      </Menu.Item>
      <Menu.Item key="test">
        <a id="route-link" href="/test">Test</a>
      </Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  )
}

export default LeftMenu