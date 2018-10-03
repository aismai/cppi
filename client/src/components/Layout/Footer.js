import React, { Component } from "react";
import { Layout } from "antd";

const { Footer } = Layout;

class MyFooter extends Component {
  render() {
    return (
      <Footer
        style={{
          textAlign: "center",
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%"
        }}
      >
        CPPI © 2018 Created by Annie's Collaboration
      </Footer>
    );
  }
}

export default MyFooter;
