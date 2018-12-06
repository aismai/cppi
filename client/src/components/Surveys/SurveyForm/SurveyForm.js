import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fillSurveyForm,
  updateFilledSurveyForm
} from "../../../actions/surveyActions";

import { REGION, DEPARTMENT } from "../../../constants";

import {
  Form,
  Icon,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Drawer,
  Button,
  Row,
  Col
} from "antd";

import moment from "moment";
import "moment/locale/ru";
import locale from "antd/lib/date-picker/locale/ru_RU";

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const CheckboxGroup = Checkbox.Group;

const dateFormat = "DD/MM/YYYY";

class SurveyForm extends Component {
  state = {
    checkedList: []
  };

  handleSubmit = e => {
    e.preventDefault();

    const { personalData, survey } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (survey.surveyPrototype) {
          const updatedSurvey = {
            ...survey,
            ...values,
            selectedAnswers: values.answers.map(answer => ({
              answerId: answer
            }))
          };

          this.props.updateFilledSurveyForm(updatedSurvey);
        } else {
          const newSurvey = {
            person: personalData._id,
            surveyPrototype: survey._id,
            ...values,
            selectedAnswers: values.answers.map(answerId => ({ answerId }))
          };

          this.props.fillSurveyForm(newSurvey);
        }

        this.props.closeDrawer();
      }
    });
  };

  renderSelectOptions = optionsList =>
    optionsList.map(option => (
      <Option value={option} key={option}>
        {option}
      </Option>
    ));

  onChange = checkedValues => {
    console.log("checked = ", checkedValues);
  };

  onClose = () => {
    this.setState({
      checkedList: []
    });
    this.props.closeDrawer();
  };

  renderQuestions = survey => {
    const { getFieldDecorator } = this.props.form;
    const surveyQuestions = survey.surveyPrototype
      ? survey.surveyPrototype.questions
      : survey.questions;

    return surveyQuestions.map((question, index) => {
      const answersOptions = [];
      question.answers.map(answer =>
        answersOptions.push({
          label: answer.body,
          value: answer._id
        })
      );
      return (
        <FormItem label={question.body} key={question._id}>
          {getFieldDecorator(`answers`)(
            <CheckboxGroup options={answersOptions} />
          )}
        </FormItem>
      );
    });
  };

  render() {
    const dataLoaded = this.props.survey && this.props.personalData;

    const { getFieldDecorator } = this.props.form;

    return dataLoaded ? (
      <Drawer
        title={`${this.props.survey.name}: ${this.props.personalData.code}`}
        placement="right"
        width="60%"
        closable
        onClose={this.onClose}
        visible={this.props.visible}
      >
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={8}>
            <Col span={10}>
              <FormItem label="Дата регистрации">
                {getFieldDecorator("date", {
                  rules: [
                    {
                      type: "object",
                      required: true,
                      message: "Please select time!"
                    }
                  ]
                })(
                  <DatePicker
                    style={{ width: "100%" }}
                    format={dateFormat}
                    locale={locale}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={14}>
              <FormItem label="Регион">
                {getFieldDecorator("region", {
                  rules: [
                    { required: true, message: "Выберите регион из списка!" }
                  ]
                })(
                  <Select placeholder="Выберите регион">
                    {this.renderSelectOptions(REGION)}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="Село">
                {getFieldDecorator("village", {
                  rules: [
                    {
                      message: "Впишите название села."
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="Конкретное место">
                {getFieldDecorator("place", {
                  rules: [
                    {
                      message: "Впишите название села."
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem label="Ведомство">
                {getFieldDecorator("department", {
                  rules: [
                    {
                      required: true,
                      message: "Выберите ведомство проводившее задержание!"
                    }
                  ]
                })(
                  <Select placeholder="Выберите ведомство">
                    {this.renderSelectOptions(DEPARTMENT)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Подразделение">
                {getFieldDecorator("subDepartment")(
                  <Input placeholder="Впишите название подразделения" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="Количество лиц производивших задержание">
                {getFieldDecorator("numberOfPersons")(
                  <Input placeholder="Впишите количество" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="Опишите подробно обстоятельства нарушения в повествовательной форме">
                {getFieldDecorator("description")(
                  <TextArea
                    rows={4}
                    placeholder="Впишите обстоятельства нарушения"
                  />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormItem label="Опишите, получал ли респондент медицинскую помощь связанную с нарушением">
                {getFieldDecorator("evidence")(
                  <TextArea
                    rows={4}
                    placeholder="Опишите, получал ли респондент медицинскую помощь"
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          {this.renderQuestions(this.props.survey)}
          {""}
          <Row>
            <Col>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  // disabled={this.state.disabled}
                >
                  <Icon type="plus-square" />
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Drawer>
    ) : null;
  }
}

export default connect(
  null,
  { fillSurveyForm, updateFilledSurveyForm }
)(
  Form.create({
    mapPropsToFields(props) {
      const { survey } = props;
      const surveyFields = {};

      console.log(survey);
      if (!survey.surveyPrototype) {
        return surveyFields;
      }

      for (let field in survey) {
        surveyFields[field] = Form.createFormField({
          ...survey[field],
          value: survey[field]
        });
      }

      surveyFields.date = Form.createFormField({
        ...survey.date,
        value: moment(moment(survey.date).format(dateFormat), dateFormat)
      });

      surveyFields.answers = Form.createFormField({
        value: survey.selectedAnswers.map(answer => answer.answerId)
      });

      return surveyFields;
    }
  })(SurveyForm)
);
