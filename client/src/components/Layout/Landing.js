import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";

import Navbar from "./Navbar";

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
              <Icon type="folder-open" />
              <span>nav 1</span>
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
          {/* navbar */}
          <Navbar collapsed={this.state.collapsed} toggle={this.toggle} />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: "90vh"
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            provident nostrum omnis error delectus, deleniti incidunt. Nesciunt,
            nemo deserunt, dignissimos, obcaecati nulla pariatur atque
            laudantium libero omnis quas ad facilis!
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Landing;
