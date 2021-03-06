import React from 'react';
import { Menu } from 'antd';
import "./Navbar.css"
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state => state.user)

  if (user.userData && user.userData.isAuth && user.userData.role === 1) {
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
            <Menu.Item key="editFoto" >
              <a id="route-link" href="/fotos/edit">Bearbeiten</a>
            </Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Benutzer Verwalten">
            <Menu.Item key="editUsers" >
              <a id="route-link" href="/users/edit">Rechtevergabe</a>
            </Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    )
  } else if (user.userData && user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a id="route-link" href="/">Home</a>
        </Menu.Item>
        <Menu.Item key="archiv">
          <a id="route-link" href="/landingPage">Archiv</a>
        </Menu.Item>
      </Menu>
    )
  }else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a id="route-link" href="/">Home</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default LeftMenu