import React, { Component } from "react";
import { connect } from "react-redux";
import { getPersonalData } from "../../actions/personalDataActions";
import {
  getFilledSurveys,
  getSurveyStats,
  getStatsQuestions
} from "../../actions/surveyActions";

import styles from "./Dashboard.module.css";

import Loader from "../Loader/Loader";
import { REGION } from "../../constants";

import { Row, Col, Icon, Button } from "antd";

import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
  {
    name: "Johson",
    amount: 30000,
    sex: "M",
    is_married: true
  },
  {
    name: "Monika",
    amount: 355000,
    sex: "F",
    is_married: false
  },
  {
    name: "John",
    amount: 250000,
    sex: "M",
    is_married: false
  },
  {
    name: "Josef",
    amount: 450500,
    sex: "M",
    is_married: true
  }
];

const dataSet2 = [
  {
    name: "Johnson",
    total: 25,
    remainig: 16
  },
  {
    name: "Josef",
    total: 25,
    remainig: 7
  }
];

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

  exportToExcel = () => (
    <ExcelFile element={<button>Download Data</button>}>
      <ExcelSheet data={dataSet1} name="Employees">
        <ExcelColumn label="Name" value="name" />
        <ExcelColumn label="Wallet Money" value="amount" />
        <ExcelColumn label="Gender" value="sex" />
        <ExcelColumn
          label="Marital Status"
          value={col => (col.is_married ? "Married" : "Single")}
        />
      </ExcelSheet>
      <ExcelSheet data={dataSet2} name="Leaves">
        <ExcelColumn label="Name" value="name" />
        <ExcelColumn label="Total Leaves" value="total" />
        <ExcelColumn label="Remaining Leaves" value="remaining" />
      </ExcelSheet>
    </ExcelFile>
  );

  renderStatistics = () => {
    const { stats, questions } = this.props;
    return (
      <div>
        <Row style={{ paddingBottom: "20px" }}>
          <Col span={6} />
          <Col span={6} />
          <Col span={6} />
          <Col span={6} style={{ textAlign: "right" }}>
            {this.exportToExcel}
            <Button>
              Export <Icon type="file-excel" />
            </Button>
          </Col>
        </Row>
        <Row gutter={24} style={{ paddingTop: "20px" }}>
          <Col span={8}>
            <div style={{ textAlign: "center" }}>
              <h1 className={styles.violations}>Нарушений</h1>
              <p className={styles.violationNumber}>
                {this.props.surveys.length}
              </p>
            </div>
          </Col>

          <Col span={6} style={{ paddingTop: "15px" }}>
            <div>
              <span className={styles.gender}>
                <Icon type="man" />
              </span>
              <span className={styles.genderNumber}> {stats.male} </span>
            </div>
            <div>
              <span className={styles.gender}>
                <Icon type="woman" />
              </span>
              <span className={styles.genderNumber}> {stats.female} </span>
            </div>
          </Col>

          <Col span={10} style={{ paddingTop: "18px" }}>
            <div>
              <span className={styles.regionNumber}>{stats.bishkek}</span>
              <span style={{ fontSize: "18px" }}>Бишкек</span>
            </div>
            <div>
              <span className={styles.regionNumber}>{stats.osh}</span>
              <span style={{ fontSize: "18px" }}>Ош</span>
            </div>
            <div>
              <span className={styles.regionNumber}>{stats.chui}</span>
              <span style={{ fontSize: "18px" }}>Чуйская область</span>
            </div>
            <div>
              <span className={styles.regionNumber}>{stats.batken}</span>
              <span style={{ fontSize: "18px" }}>Баткенская область</span>
            </div>
            <div>
              <span className={styles.regionNumber}>{stats.djalalabad}</span>
              <span style={{ fontSize: "18px" }}>Джалал-Абадская область</span>
            </div>
            <div>
              <span className={styles.regionNumber}>{stats.ik}</span>
              <span style={{ fontSize: "18px" }}>Иссык-Кульская область</span>
            </div>
            <div>
              <span className={styles.regionNumber}>{stats.naryn}</span>
              <span style={{ fontSize: "18px" }}>Нарынская область</span>
            </div>
            <div>
              <span className={styles.regionNumber}>{stats.oshobl}</span>
              <span style={{ fontSize: "18px" }}>Ошская область</span>
            </div>
            <div>
              <span className={styles.regionNumber}>{stats.talas}</span>
              <span style={{ fontSize: "18px" }}>Таласская область</span>
            </div>
          </Col>
        </Row>
        <Row gutter={24} style={{ paddingTop: "20px" }}>
          <Col span={14}>
            <div className={styles.departments}>
              <div>
                <p>МВД</p>
                <p className={styles.departmentNumber}>{stats.mvd}</p>
              </div>
              <div>
                <p>ГКНБ</p>
                <p className={styles.departmentNumber}>{stats.gknb}</p>
              </div>
              <div>
                <p>ГСИН</p>
                <p className={styles.departmentNumber}>{stats.gsin}</p>
              </div>
              <div>
                <p>Минздрав</p>
                <p className={styles.departmentNumber}>{stats.minzdrav}</p>
              </div>
              <div>
                <p>Муниципалитет</p>
                <p className={styles.departmentNumber}>{stats.municipality}</p>
              </div>
              <div>
                <p>Прокуратура</p>
                <p className={styles.departmentNumber}>{stats.procecutor}</p>
              </div>
            </div>
          </Col>
          <Col span={10} style={{ paddingTop: "20px" }}>
            {questions.map(question => (
              <div key={question.body} style={{ paddingBottom: "10px" }}>
                <span style={{ fontSize: "18px", paddingRight: "10px" }}>
                  {question.body}
                </span>
                <div>
                  {question.answers.map(answer => (
                    <div key={answer.answerId}>
                      <span className={styles.answerNumber}>
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
    return dataLoaded ? this.renderStatistics() : <Loader />;
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
