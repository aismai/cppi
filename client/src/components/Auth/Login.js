import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import { Form, Icon, Input, Button } from "antd";

const FormItem = Form.Item;

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    // todo: redirect with router
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginUser(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-form-box">
        <div className="login-form-box--logo">
          <img src="/img/padlock.svg" alt="logo" className="login-logo" />
          <span>CPPI</span>
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem hasFeedback>
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Please input your email" },
                {
                  type: "email",
                  message: "Must be a valid email address"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password" },
                { min: 8, message: "Password must be at least 8 characters" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Form.create()(Login));
