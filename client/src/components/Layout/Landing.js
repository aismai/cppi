import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";

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
          <div className="logo">
            <img src="/img/eye-open.svg" alt="eye-logo" />
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="team" />
              <span>Users</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Navbar collapsed={this.state.collapsed} toggle={this.toggle} />
          <div className="bread_crumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Icon type="team" style={{ paddingRight: "4px" }} />
                Users
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
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
