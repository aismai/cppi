import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import { Layout, Icon } from "antd";

const { Header } = Layout;

class Navbar extends Component {
  toggle = () => {
    this.props.toggle();
  };

  logOut = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <Header style={{ background: "#fff", padding: 0 }}>
        <Icon
          className="trigger"
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.toggle}
        />
        <div
          className="rightWrapper"
          style={{ float: "right", paddingRight: "55px" }}
        >
          <span onClick={this.logOut} style={{ cursor: "pointer" }}>
            <Icon type="logout" />
          </span>
        </div>
      </Header>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
