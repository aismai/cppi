import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQuestion } from "../../../actions/questionActions";

import { Card, Button, Icon, Divider } from "antd";
import QuestionForm from "../QuestionForm/QuestionForm";
import Loader from "../../Loader/Loader";

class Question extends Component {
  state = { showForm: false };

  componentDidMount = () => {
    const { questionId } = this.props.match.params;
    this.props.getQuestion(questionId);
  };

  toggleEditQuestion = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  renderQuestion = question => (
    <Card
      bordered={false}
      title={question.body}
      extra={
        <Button type="dashed" onClick={this.toggleEditQuestion}>
          <Icon type="edit" theme="outlined" />
        </Button>
      }
    >
      {question.answers.map((answer, i, { length }) => {
        if (length - 1 === i) {
          return <p key={i}>{answer.body}</p>;
        } else {
          return (
            <div key={i}>
              <p>{answer.body}</p>
              <Divider dashed />
            </div>
          );
        }
      })}

      <QuestionForm
        title="Редактировать вопрос"
        question={question}
        visible={this.state.showForm}
        closeDrawer={this.toggleEditQuestion}
      />
    </Card>
  );

  render() {
    return this.props.question ? (
      this.renderQuestion(this.props.question)
    ) : (
      <Loader />
    );
  }
}

Question.propTypes = {
  question: PropTypes.object,
  getQuestion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  question: state.questions.question
});

export default connect(
  mapStateToProps,
  { getQuestion }
)(Question);
