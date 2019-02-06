import React, { Component } from "react";
import { connect } from "react-redux";
import { getSurvey } from "../../../actions/surveyActions";

import SurveyConfig from "../SurveyConfig/SurveyConfig";
import Loader from "../../Loader/Loader";

import { Card, Button, Icon, Divider } from "antd";

const { Meta } = Card;

class Survey extends Component {
  state = {
    showForm: false
  };

  componentDidMount() {
    const { surveyId } = this.props.match.params;
    this.props.getSurvey(surveyId);
  }

  toggleEditSurvey = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  renderSurvey = survey => (
    <Card
      bordered={false}
      title={survey.name}
      extra={
        <Button type="dashed" onClick={this.toggleEditSurvey}>
          <Icon type="edit" theme="outlined" />
        </Button>
      }
    >
      <Meta title="Вопросы" style={{ paddingBottom: "10px" }} />

      {survey.questions.map((question, i, { length }) => {
        if (length - 1 === i) {
          return <p key={i}>{question.body}</p>;
        } else {
          return (
            <div key={i}>
              <p>{question.body}</p>
              <Divider dashed />
            </div>
          );
        }
      })}

      <SurveyConfig
        title="Редактировать вопрос"
        survey={survey}
        visible={this.state.showForm}
        closeDrawer={this.toggleEditSurvey}
      />
    </Card>
  );

  render() {
    return this.props.survey ? (
      this.renderSurvey(this.props.survey)
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = state => ({
  survey: state.surveys.survey
});

export default connect(
  mapStateToProps,
  { getSurvey }
)(Survey);
