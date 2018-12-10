import React, { Component } from "react";
import { connect } from "react-redux";
import { getPersonalData } from "../../actions/personalDataActions";
import {
  getFilledSurveys,
  getSurveyStats,
  getStatsQuestions
} from "../../actions/surveyActions";

import { REGION } from "../../constants";

import { Row, Col, Icon } from "antd";

const numberSize = "24px";
const textSize = "18px";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getFilledSurveys();
    this.props.getSurveyStats();
    this.props.getPersonalData();
    this.props.getStatsQuestions();
  }

  renderRegionsStats = () => {
    return REGION.map(regionName => {
      return (
        <div key={regionName}>
          <span style={{ paddingRight: "10px", fontSize: "18px" }}>1</span>
          <span style={{ fontSize: textSize, color: "#262626" }}>
            {regionName}
          </span>
        </div>
      );
    });
  };

  renderStatistics = () => {
    const { stats, questions } = this.props;
    return (
      <div>
        <Row gutter={16} style={{ paddingTop: "20px" }}>
          <Col span={6}>
            <div style={{ textAlign: "center" }}>
              <h1>Нарушений</h1>
              <p style={{ fontSize: "48px" }}>{this.props.surveys.length}</p>
              <span style={{ fontSize: "48px", paddingRight: "20px" }}>
                {stats.male} <Icon type="man" />
              </span>
              <span style={{ fontSize: "48px" }}>
                {stats.female} <Icon type="woman" />
              </span>
            </div>
          </Col>
          <Col span={6} style={{ paddingTop: "10px", textAlign: "center" }}>
            <div>
              <h4>МВД</h4>
              <p style={{ fontSize: numberSize }}>{stats.mvd}</p>
            </div>
            <div>
              <h4>ГКНБ</h4>
              <p style={{ fontSize: numberSize }}>{stats.gknb}</p>
            </div>
            <div>
              <h4>ГСИН</h4>
              <p style={{ fontSize: numberSize }}>{stats.gsin}</p>
            </div>
          </Col>
          <Col span={6} style={{ paddingTop: "10px" }}>
            <div>
              <span style={{ fontSize: "18px", paddingRight: "10px" }}>
                {stats.bishkek}
              </span>
              <span style={{ fontSize: "18px" }}>Бишкек</span>
            </div>
            <div>
              <span style={{ fontSize: "18px", paddingRight: "10px" }}>
                {stats.osh}
              </span>
              <span style={{ fontSize: "18px" }}>Ош</span>
            </div>
            <div>
              <span style={{ fontSize: "18px", paddingRight: "10px" }}>
                {stats.chui}
              </span>
              <span style={{ fontSize: "18px" }}>Чуйская область</span>
            </div>
            <div>
              <span style={{ fontSize: "18px", paddingRight: "10px" }}>
                {stats.batken}
              </span>
              <span style={{ fontSize: "18px" }}>Баткенская область</span>
            </div>
            <div>
              <span style={{ fontSize: "18px", paddingRight: "10px" }}>
                {stats.djalalabad}
              </span>
              <span style={{ fontSize: "18px" }}>Джалал-Абадская область</span>
            </div>
            <div>
              <span style={{ fontSize: "18px", paddingRight: "10px" }}>
                {stats.ik}
              </span>
              <span style={{ fontSize: "18px" }}>Иссык-Кульская область</span>
            </div>
            <div>
              <span style={{ fontSize: "18px", paddingRight: "10px" }}>
                {stats.naryn}
              </span>
              <span style={{ fontSize: "18px" }}>Нарынская область</span>
            </div>
            <div>
              <span style={{ fontSize: "18px", paddingRight: "10px" }}>
                {stats.oshobl}
              </span>
              <span style={{ fontSize: "18px" }}>Ошская область</span>
            </div>
            <div>
              <span style={{ fontSize: "18px", paddingRight: "10px" }}>
                {stats.talas}
              </span>
              <span style={{ fontSize: "18px" }}>Таласская область</span>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6} style={{ paddingTop: "20px", paddingLeft: "30px" }}>
            {questions.map(question => (
              <div key={question.body} style={{ paddingBottom: "10px" }}>
                <span style={{ fontSize: "18px", paddingRight: "10px" }}>
                  {question.body}
                </span>
                <div>
                  {question.answers.map(answer => (
                    <div key={answer.answerId}>
                      <span style={{ fontSize: "14px", paddingRight: "10px" }}>
                        {answer.quantity}
                      </span>
                      <span style={{ fontSize: "14px" }}>
                        {answer.answerBody}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    const dataLoaded =
      this.props.surveys &&
      this.props.data &&
      this.props.stats &&
      this.props.questions;
    return dataLoaded ? this.renderStatistics() : <div>Loading...</div>;
  }
}

const mapStateToProps = state => ({
  surveys: state.surveys.filledSurveys,
  stats: state.surveys.stats,
  questions: state.surveys.statsQuestions,
  data: state.personalData.data
});

export default connect(
  mapStateToProps,
  { getPersonalData, getFilledSurveys, getSurveyStats, getStatsQuestions }
)(Dashboard);
