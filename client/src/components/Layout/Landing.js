import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

const { Sider, Content } = Layout;

class Landing extends Component {
  state = {
    collapsed: true
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          theme="light"
        >
          <div className="logo" />
          <Menu theme="light" mode="inline" style={{ borderRight: "none" }}>
            <Menu.Item key="1">
              <NavLink to="/dashboard">
                <Icon type="dashboard" theme="outlined" />
                <span>Dashboard</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/personal-data">
                <Icon type="folder-open" theme="outlined" />
                <span>Personal Data</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/users">
                <Icon type="user" theme="outlined" />
                <span>Users</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink to="/surveys">
                <Icon type="form" theme="outlined" />
                <span>Surveys</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink to="/questions">
                <Icon type="file-unknown" theme="outlined" />
                <span>Survey Questions</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Navbar collapsed={this.state.collapsed} toggle={this.toggle} />
          {/* <div className="bread_crumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Icon type="team" style={{ paddingRight: "4px" }} />
                Users
              </Breadcrumb.Item>
            </Breadcrumb>
          </div> */}
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: "90vh"
            }}
          >
            {this.props.children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default Landing;
