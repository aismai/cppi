import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createPersonalData,
  updatePersonalDatum
} from "../../../actions/personalDataActions";

import {
  SOURCE,
  SOCIAL_STATUS,
  EDUCATION,
  EMPLOYMENT,
  CITIZENTSHIP,
  NATIONALITY,
  CRIMINAL_STATUS,
  PERSONAL_DOCUMENT,
  KEY_GROUP
} from "../../../constants";

import moment from "moment";
import "moment/locale/ru";
import locale from "antd/lib/date-picker/locale/ru_RU";

import {
  Form,
  Icon,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Radio,
  Drawer,
  Button,
  Row,
  Col
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const dateFormat = "DD/MM/YYYY";

class PersonalDataForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { datum } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        datum
          ? this.props.updatePersonalDatum({ ...datum, ...values })
          : this.props.createPersonalData(values);

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

  render() {
    const { getFieldDecorator } = this.props.form;

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
          <Row>
            <Col>
              <FormItem label="Название дела">
                {getFieldDecorator("caseName", {
                  rules: [
                    { required: true, message: "Please input case name!" }
                  ]
                })(<Input placeholder="Впишите название дела" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}>
              <FormItem label="Дата регистрации">
                {getFieldDecorator("registrationDate", {
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
            <Col span={8}>
              <FormItem label="Источник информации">
                {getFieldDecorator("source", {
                  rules: [
                    { required: true, message: "Please select a source!" }
                  ]
                })(
                  <Select placeholder="Please select a source">
                    {this.renderSelectOptions(SOURCE)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="Код респондента">
                {getFieldDecorator("code", {
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста впишите код респондента"
                    }
                  ]
                })(<Input placeholder="Впишите код респондента" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
          <Col span={8}>
          <FormItem label="Национальность">
                {getFieldDecorator("nationality", {
                  rules: [
                    { required: true, message: "Пожалуйста выберите национальность!" }
                  ]
                })(<Select>{this.renderSelectOptions(NATIONALITY)}</Select>)}
              </FormItem>
          </Col>
          </Row>
          <Row>
          <Col span={8}>
              <FormItem>
                <FormItem label="Пол" required>
                  {getFieldDecorator("gender", {
                    rules: [{ required: true, message: "Please select gender" }]
                  })(
                    <RadioGroup>
                      <Radio value="мужской">Мужской</Radio>
                      <Radio value="женский">Женский</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </FormItem>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={8}>
              <FormItem label="Дата рождения">
                {getFieldDecorator("dateOfBirth", {
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
          </Row>
          <Row gutter={8}>
          <Col span={12}>
              <FormItem label="Уголовная история (со слов)">
                {getFieldDecorator("criminalStatus", {
                  rules: [
                    { required: true, message: "Пожалуйста выберите уголовную историю" }
                  ]
                })(<Select>{this.renderSelectOptions(CRIMINAL_STATUS)}</Select>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Наличие документа, удостоверяющего личность">
                {getFieldDecorator("personalDocument", {
                  rules: [
                    {
                      required: true,
                      message: "Please input personal document"
                    }
                  ]
                })(<Select>{this.renderSelectOptions(PERSONAL_DOCUMENT)}</Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="Регистрация / Прописка">
                {getFieldDecorator("registration", {
                  valuePropName: "checked",
                  initialValue: this.props.datum
                    ? this.props.datum.registration
                    : false
                })(
                  <Checkbox>
                    Наличие регистрации / Прописки по месту пребывания
                  </Checkbox>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <FormItem label="Занятость">
                {getFieldDecorator("employment", {
                  rules: [
                    { required: true, message: "Пожалуйста выберите занятость" }
                  ]
                })(<Select>{this.renderSelectOptions(EMPLOYMENT)}</Select>)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
            <FormItem label=" Ключевая группа">
                {getFieldDecorator("keyGroup", {
                  rules: [
                    { required: true, message: "Пожалуйста выберите ключевую группу" }
                  ]
                })(<Select>{this.renderSelectOptions(KEY_GROUP)}</Select>)}
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
    );
  }
}

export default connect(
  null,
  { createPersonalData, updatePersonalDatum }
)(
  Form.create({
    mapPropsToFields(props) {
      const { datum } = props;
      const datumFields = {};

      if (!datum) {
        return datumFields;
      }

      for (let field in datum) {
        datumFields[field] = Form.createFormField({
          ...datum[field],
          value: datum[field]
        });
      }

      datumFields.registrationDate = Form.createFormField({
        ...datum.registrationDate,
        value: moment(
          moment(datum.registrationDate).format(dateFormat),
          dateFormat
        )
      });

      datumFields.dateOfBirth = Form.createFormField({
        ...datum.dateOfBirth,
        value: moment(moment(datum.dateOfBirth).format(dateFormat), dateFormat)
      });

      return datumFields;
    }
  })(PersonalDataForm)
);
