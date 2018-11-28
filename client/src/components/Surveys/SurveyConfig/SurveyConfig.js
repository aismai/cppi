import React, { Component } from "react";
import { connect } from "react-redux";
import { createSurvey, updateSurvey } from "../../../actions/surveyActions";
import { getQuestionList } from "../../../actions/questionActions";

import { Form, Input, Drawer, Button, Checkbox } from "antd";

const FormItem = Form.Item;

const defaultCheckedState = [];

class SurveyConfig extends Component {
  state = {
    checkedList: defaultCheckedState
  };

  componentDidMount() {
    this.props.getQuestionList();
    if (this.props.survey) {
      this.setState({
        checkedList: this.props.survey.questions.map(question => question._id)
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const { survey } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        survey ? this.updateSurvey(values) : this.createNewSurvey(values);

        this.props.closeDrawer();
      }
    });
  };

  createNewSurvey = values => {
    const questionIds = this.state.checkedList;
    const newSurvey = { ...values };
    newSurvey.questionIds = questionIds;

    this.props.createSurvey(newSurvey);
  };

  updateSurvey = values => {
    const { survey, questions } = this.props;
    const updatedSurvey = { ...survey };
    const selectedQuestions = questions.filter(
      (question, index) => values.questions[index]
    );

    updatedSurvey.name = values.name;
    updatedSurvey.questions = selectedQuestions;

    this.props.updateSurvey(updatedSurvey);
  };

  onChange = checkedValues => {
    this.setState({ checkedList: checkedValues });
  };

  renderQuestions = () => {
    const { getFieldDecorator } = this.props.form;
    const { survey, questions } = this.props;

    const surveyQuestionsIds = survey
      ? survey.questions.map(question => question._id)
      : [];

    return questions.map((question, index) => (
      <FormItem label={index === 0 ? "Вопросы" : ""} key={index}>
        {getFieldDecorator(`questions[${index}]`, {
          valuePropName: "checked",
          initialValue: surveyQuestionsIds.includes(question._id)
        })(<Checkbox>{question.body}</Checkbox>)}
      </FormItem>
    ));
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const questionsLayout = this.props.questions ? (
      this.renderQuestions()
    ) : (
      <div>There are no questions</div>
    );

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
            label="Название"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
          >
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Впишите название опроса!" }]
            })(<Input />)}
          </FormItem>
          {questionsLayout}
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              // disabled={this.state.disabled}
            >
              Submit
            </Button>
          </FormItem>
        </Form>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions.questionList
});

export default connect(
  mapStateToProps,
  { createSurvey, updateSurvey, getQuestionList }
)(
  Form.create({
    mapPropsToFields(props) {
      const surveyFields = {};
      const { survey, questions } = props;

      if (!survey) {
        return surveyFields;
      }

      surveyFields.name = Form.createFormField({
        ...survey.name,
        value: survey.name
      });

      if (questions) {
        const surveyQuestionsIds = survey.questions.map(
          question => question._id
        );
        questions.forEach((question, index) => {
          surveyFields[`questions[${index}]`] = Form.createFormField({
            value: surveyQuestionsIds.includes(question._id)
          });
        });
      }

      return surveyFields;
    }
  })(SurveyConfig)
);
