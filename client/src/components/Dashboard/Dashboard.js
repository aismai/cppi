import React, { Component } from "react";
import { connect } from "react-redux";
import { getPersonalData } from "../../actions/personalDataActions";
import {
  getFilledSurveys,
  getSurveyStats,
  getStatsQuestions
} from "../../actions/surveyActions";
import axios from "axios";
import FileDownload from "js-file-download";
import styles from "./Dashboard.module.css";
import moment from "moment";

import Loader from "../Loader/Loader";
import { REGION } from "../../constants";

import { Row, Col, Icon, Button } from "antd";

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

  exportToExcel = () => {
    axios
      .get("/api/stats/export-excel", {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/vnd.ms-excel"
        }
      })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `статистика_${moment(Date.now()).format("DD.MM.YY")}.xlsx`
        ); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => console.log(error));
  };

  renderStatistics = () => {
    const { stats, questions } = this.props;
    return (
      <div>
        <Row style={{ paddingBottom: "20px" }}>
          <Col span={6} />
          <Col span={6} />
          <Col span={6} />
          <Col span={6} style={{ textAlign: "right" }}>
            <Button onClick={this.exportToExcel}>
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
        <Row style={{ paddingTop: "40px" }}>
          <Col span={10}>
            <h3>Ключевая Группа</h3>
            <div className={styles.departments}>
              <div>
                <p>ЛУИН</p>
                <p className={styles.departmentNumber}>{stats.luin}</p>
              </div>
              <div>
                <p>БЗ</p>
                <p className={styles.departmentNumber}>{stats.luin}</p>
              </div>
              <div>
                <p>РС</p>
                <p className={styles.departmentNumber}>{stats.rs}</p>
              </div>
              <div>
                <p>Клиент ЗТМ</p>
                <p className={styles.departmentNumber}>{stats.ztm}</p>
              </div>
              <div>
                <p>ЛЖВ</p>
                <p className={styles.departmentNumber}>{stats.ljv}</p>
              </div>
              <div>
                <p>ЛГБТ</p>
                <p className={styles.departmentNumber}>{stats.lgbt}</p>
              </div>
              <div>
                <p>ЛОВЗ</p>
                <p className={styles.departmentNumber}>{stats.lovz}</p>
              </div>
              <div>
                <p>Другое</p>
                <p className={styles.departmentNumber}>{stats.keyGroupOther}</p>
              </div>
            </div>
          </Col>
          <Col span={8} offset={4}>
            <h3>Национальность</h3>
            <div>
              <span className={styles.regionNumber}>
                {stats.nationalityKyrghyz}
              </span>
              <span style={{ fontSize: "18px" }}>Кыргыз</span>
            </div>
            <div>
              <span className={styles.regionNumber}>
                {stats.nationalityRussian}
              </span>
              <span style={{ fontSize: "18px" }}>Русский</span>
            </div>
            <div>
              <span className={styles.regionNumber}>
                {stats.nationalityKazakh}
              </span>
              <span style={{ fontSize: "18px" }}>Казах</span>
            </div>
            <div>
              <span className={styles.regionNumber}>
                {stats.nationalityUzbek}
              </span>
              <span style={{ fontSize: "18px" }}>Узбек</span>
            </div>
            <div>
              <span className={styles.regionNumber}>
                {stats.nationalityUigur}
              </span>
              <span style={{ fontSize: "18px" }}>Уйгур</span>
            </div>
            <div>
              <span className={styles.regionNumber}>
                {stats.nationalityOther}
              </span>
              <span style={{ fontSize: "18px" }}>Другое</span>
            </div>
          </Col>
        </Row>
        <Row gutter={24} style={{ paddingTop: "20px" }}>
          <Col span={12}>
            <h3>Ведомство</h3>
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
              <div>
                <p>Другое</p>
                <p className={styles.departmentNumber}>
                  {stats.otherDepartment}
                </p>
              </div>
            </div>
          </Col>
          <Col span={8} offset={4} style={{ paddingTop: "40px" }}>
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
