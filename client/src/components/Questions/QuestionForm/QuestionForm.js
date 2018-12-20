import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createQuestion,
  updateQuestion
} from "../../../actions/questionActions";

import { Form, Icon, Input, Drawer, Button, Checkbox } from "antd";

const FormItem = Form.Item;
let uuid = 0;

class QuestionForm extends Component {
  state = { visible: false, disabled: true };

  componentWillUnmount = () => {
    uuid = 0;
  };

  add = () => {
    const { form, question } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    uuid = question && !uuid ? form.getFieldValue(`answers`).length : uuid;

    const nextKeys = keys.concat(uuid);
    uuid++;

    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
    this.setState({ disabled: false });
  };

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    const filteredKeys = keys.filter(key => {
      if (key._id) {
        return key._id !== k._id;
      }

      return key !== k;
    });

    // can use data-binding to set
    form.setFieldsValue({
      keys: filteredKeys
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { question } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        // return;
        question
          ? this.updateQuestion(values, this.props.question)
          : this.createQuestion(values);

        this.props.closeDrawer();
      }
    });
  };

  updateQuestion = (values, question) => {
    const updatedQuestion = { ...question };
    const { keys, answers } = values;

    updatedQuestion.body = values.body;
    updatedQuestion.isUsedInStatistics = values.isUsedInStatistics;

    const editedAnswers = answers.map((answer, index) => {
      if (keys[index]._id) {
        if (keys[index].body !== answer) {
          keys[index].body = answer;
        }

        return keys[index];
      } else {
        return { body: answer };
      }
    });

    updatedQuestion.answers = [...editedAnswers];

    return this.props.updateQuestion(updatedQuestion);
  };

  createQuestion = values => {
    const newQuestion = {
      body: values.body,
      isUsedInStatistics: values.isUsedInStatistics,
      answers: values.answers.map(answer => ({ body: answer }))
    };

    this.props.createQuestion(newQuestion);
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const answers = this.props.question ? this.props.question.answers : [];

    getFieldDecorator("keys", {
      initialValue: answers
    });

    const keys = getFieldValue("keys");
    const questionAnswersLayout = keys.map((k, index) => {
      return (
        <FormItem label={index === 0 ? "Ответы" : ""} required key={index}>
          {getFieldDecorator(`answers[${index}]`, {
            initialValue: k.body || "",
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input answer or delete this field."
              }
            ]
          })(
            <Input
              placeholder="Answer"
              style={{ width: "80%", marginRight: 4 }}
            />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });

    return (
      <Drawer
        title={this.props.title}
        placement="right"
        width="60%"
        closable
        onClose={this.props.closeDrawer}
        visible={this.props.visible}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="Вопрос"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
          >
            {getFieldDecorator("body", {
              rules: [{ required: true, message: "Пожалуйста впишите вопрос!" }]
            })(<Input />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("isUsedInStatistics", {
              valuePropName: "checked"
            })(<Checkbox>Использовать в статистике</Checkbox>)}
          </FormItem>
          {questionAnswersLayout}
          <FormItem>
            <Button type="dashed" onClick={this.add}>
              <Icon type="plus" /> Добавить Ответ
            </Button>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              <Icon type="plus-square" />
            </Button>
          </FormItem>
        </Form>
      </Drawer>
    );
  }
}

export default connect(
  null,
  { createQuestion, updateQuestion }
)(
  Form.create({
    mapPropsToFields(props) {
      const { question } = props;

      if (!question) {
        const questionFields = {
          body: Form.createFormField({
            value: ""
          })
        };

        questionFields[`answers[0]`] = Form.createFormField({
          value: ""
        });

        return questionFields;
      }

      const questionFields = {
        body: Form.createFormField({
          ...props.question.body,
          value: props.question.body
        }),
        isUsedInStatistics: Form.createFormField({
          ...props.question.isUsedInStatistics,
          value: props.question.isUsedInStatistics
        })
      };

      props.question.answers.forEach((answer, index) => {
        questionFields[`answers[${index}]`] = Form.createFormField({
          value: answer.body
        });
      });

      return questionFields;
    }
  })(QuestionForm)
);
