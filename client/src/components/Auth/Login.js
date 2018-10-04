import React, { Component } from "react";
import { Row, Col } from "antd";
import { Form, Icon, Input, Button, Checkbox } from "antd";

const FormItem = Form.Item;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const loginUser = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(loginUser);
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={8} />
          <Col span={8}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  name="email"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={this.onChange}
                />
              </FormItem>
              <FormItem>
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.onChange}
                />
              </FormItem>
              <FormItem>
                <Checkbox>Remember me</Checkbox>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </FormItem>
            </Form>
          </Col>
          <Col span={8} />
        </Row>
      </div>
    );
  }
}

export default Login;
