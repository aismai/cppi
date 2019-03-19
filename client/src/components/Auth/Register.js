import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import { Form, Input, Icon, Button } from "antd";

const FormItem = Form.Item;

class Register extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (!this.props.auth.user.isAdmin) {
      this.props.history.push("/");
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.registerUser(values, this.props.history);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div className="register-box">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Name" hasFeedback>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please input your name"
                },
                { min: 2, message: "Name must be at least 2 characters" },
                { max: 20, message: "Name should not exceed 8 characters" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Name"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Last Name" hasFeedback>
            {getFieldDecorator("lastname", {
              rules: [
                {
                  required: true,
                  message: "Please input your last name"
                },
                { min: 2, message: "Last name must be at least 2 characters" },
                { max: 20, message: "Last name should not exceed 8 characters" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Last Name"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="E-mail" hasFeedback>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "Must be a valid email address"
                },
                {
                  required: true,
                  message: "Please input your E-mail"
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
          <FormItem {...formItemLayout} label="Password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password"
                },
                {
                  min: 8,
                  message: "Password must be at least 8 characters"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input
                type="password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm Password" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input
                type="password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Confirm Password"
              />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Create User
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Form.create()(Register)));
