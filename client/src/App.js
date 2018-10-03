import React, { Component } from "react";
import "./App.css";
import { Layout } from "antd";

import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Navbar />
        <h1>CPPI APP</h1>
        <Footer />
      </Layout>
    );
  }
}

export default App;
