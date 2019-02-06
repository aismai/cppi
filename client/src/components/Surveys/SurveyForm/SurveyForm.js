import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fillSurveyForm,
  updateFilledSurveyForm
} from "../../../actions/surveyActions";

import { REGION, DEPARTMENT, PLACES } from "../../../constants";

import {
  Form,
  Icon,
  Input,
  InputNumber,
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

const dateFormat = "DD/MM/YYYY HH:mm:ss";

class SurveyForm extends Component {
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

  onClose = () => {
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
    const surveyName =
      this.props.survey.name || this.props.survey.surveyPrototype.name;
    const { getFieldDecorator } = this.props.form;

    return dataLoaded ? (
      <Drawer
        title={`${surveyName}: ${this.props.personalData.code}`}
        placement="right"
        width="60%"
        closable
        onClose={this.onClose}
        visible={this.props.visible}
      >
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={8}>
            <Col span={10}>
              <FormItem label="Дата / Время">
                {getFieldDecorator("date", {
                  rules: [
                    {
                      type: "object",
                      required: true,
                      message: "Пожалуйста выберите дату"
                    }
                  ]
                })(
                  <DatePicker
                    showTime
                    style={{ width: "100%" }}
                    format={dateFormat}
                    locale={locale}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={14}>
              <FormItem label="Область / Город">
                {getFieldDecorator("region", {
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста выберите один из вариантов"
                    }
                  ]
                })(
                  <Select placeholder="Выберите один из вариантов">
                    {this.renderSelectOptions(REGION)}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="Место">
                {getFieldDecorator("place", {
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста выберите один из вариантов"
                    }
                  ]
                })(
                  <Select placeholder="Выберите один из вариантов">
                    {this.renderSelectOptions(PLACES)}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="Уточните место задержания">
                {getFieldDecorator("placeDescription")(
                  <Input placeholder="Уточните место" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col>
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
          </Row>
          <Row>
            <Col>
              <FormItem label="Имена, клички, должность и особые приметы">
                {getFieldDecorator("description")(
                  <TextArea rows={4} placeholder="Впишите особые приметы" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem label="Количество лиц">
                {getFieldDecorator("numberOfPersons")(
                  <InputNumber
                    min={0}
                    max={99}
                    placeholder="Впишите число"
                    style={{ width: "100%" }}
                  />
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
          {this.renderQuestions(this.props.survey)}
          <Row>
            <Col>
              <FormItem label="Дополнительные комментарии">
                {getFieldDecorator("commentary")(<TextArea rows={4} />)}
              </FormItem>
            </Col>
          </Row>
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
