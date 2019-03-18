import React, { Component } from "react";
import { connect } from "react-redux";

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
    //todo:  break into seperate components, remove content and side menu

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
                <span>Статистика</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/personal-data">
                <Icon type="folder-open" theme="outlined" />
                <span>Анкетные Данные</span>
              </NavLink>
            </Menu.Item>
            {this.props.user.isAdmin && (
              <Menu.Item key="3">
                <NavLink to="/surveys">
                  <Icon type="form" theme="outlined" />
                  <span>Формы</span>
                </NavLink>
              </Menu.Item>
            )}
            {this.props.user.isAdmin && (
              <Menu.Item key="4">
                <NavLink to="/questions">
                  <Icon type="file-unknown" theme="outlined" />
                  <span>Вопросы</span>
                </NavLink>
              </Menu.Item>
            )}
            {this.props.user.isAdmin && (
              <Menu.Item key="5">
                <NavLink to="/users">
                  <Icon type="user" theme="outlined" />
                  <span>Пользователи</span>
                </NavLink>
              </Menu.Item>
            )}
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

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Landing);
