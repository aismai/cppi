import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Link } from "react-router-dom";

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
              <Link to="/dashboard">
                <Icon type="dashboard" theme="outlined" />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/users">
                <Icon type="user" theme="outlined" />
                <span>Users</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/questions">
                <Icon type="file-unknown" theme="outlined" />
                <span>Survey Questions</span>
              </Link>
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
