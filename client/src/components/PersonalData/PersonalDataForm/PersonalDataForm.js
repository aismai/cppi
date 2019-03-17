import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createPersonalData,
  updatePersonalDatum
} from "../../../actions/personalDataActions";

import {
  SOURCE,
  EMPLOYMENT,
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
const CheckboxGroup = Checkbox.Group;
const dateFormat = "DD/MM/YYYY";

const keyGroupValues = KEY_GROUP.map(groupName => {
  return {
    label: groupName,
    value: groupName
  };
});

class PersonalDataForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { datum } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        datum
          ? this.props.updatePersonalDatum({ ...datum, ...values })
          : this.props.createPersonalData(values, this.props.user);

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
                    {
                      required: true,
                      message: "Пожалуйста впишите название дела"
                    }
                  ]
                })(<Input placeholder="Впишите название дела" />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem label="Дата регистрации">
                {getFieldDecorator("registrationDate", {
                  rules: [
                    {
                      type: "object",
                      required: true,
                      message: "Пожалуйста выберите дату"
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
            <Col span={12}>
              <FormItem label="Источник информации">
                {getFieldDecorator("source", {
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста выберите источник информации"
                    }
                  ]
                })(
                  <Select placeholder="Выберите один из вариантов">
                    {this.renderSelectOptions(SOURCE)}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <FormItem label="Национальность">
                {getFieldDecorator("nationality", {
                  rules: [
                    {
                      required: true,
                      message: "Пожалуйста выберите национальность"
                    }
                  ]
                })(
                  <Select placeholder="Выберите один из вариантов">
                    {this.renderSelectOptions(NATIONALITY)}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
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
          <Row>
            <Col span={8}>
              <FormItem label="Пол" required>
                {getFieldDecorator("gender", {
                  rules: [{ required: true, message: "Выберите пол" }]
                })(
                  <RadioGroup>
                    <Radio value="мужской">Мужской</Radio>
                    <Radio value="женский">Женский</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <FormItem label="Дата рождения">
                {getFieldDecorator("dateOfBirth", {
                  rules: [
                    {
                      type: "object",
                      required: true,
                      message: "Пожалуйста выберите дату"
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
                    {
                      required: true,
                      message: "Пожалуйста выберите уголовную историю"
                    }
                  ]
                })(
                  <Select placeholder="Выберите один из вариантов">
                    {this.renderSelectOptions(CRIMINAL_STATUS)}
                  </Select>
                )}
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
                })(
                  <Select placeholder="Выберите один из вариантов">
                    {this.renderSelectOptions(PERSONAL_DOCUMENT)}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="Регистрация / Прописка">
                {getFieldDecorator("registration")(
                  <RadioGroup>
                    <Radio value="да">Да</Radio>
                    <Radio value="нет">Нет</Radio>
                    <Radio value="не знает">Не знает</Radio>
                  </RadioGroup>
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
                })(
                  <Select placeholder="Выберите один из вариантов">
                    {this.renderSelectOptions(EMPLOYMENT)}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col>
              <FormItem label=" Ключевая группа">
                {getFieldDecorator("keyGroup")(
                  <CheckboxGroup options={keyGroupValues} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
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

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
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
