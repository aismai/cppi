import React, { Component } from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

class Navbar extends Component {
  render() {
    return (
      <Header style={{ background: "#fff", borderBottom: "1px solid #e8e8e8" }}>
        <div className="logo">
          <img src="/img/logo.svg" alt="logo" />
        </div>
        <Menu mode="horizontal" style={{ lineHeight: "63px" }}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default Navbar;
