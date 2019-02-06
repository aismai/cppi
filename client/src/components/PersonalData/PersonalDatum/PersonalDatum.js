import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPersonalDatum,
  findSurveyByPersonalDataId
} from "../../../actions/personalDataActions";
import { getSurveyList } from "../../../actions/surveyActions";

import PersonalDataForm from "../PersonalDataForm/PersonalDataForm";
import SurveyForm from "../../Surveys/SurveyForm/SurveyForm";
import Loader from "../../Loader/Loader";
import styles from "./PersonalDatum.module.css";

import { Card, Button, Icon, List, Collapse } from "antd";

const Panel = Collapse.Panel;

const titlesMap = {
  maritalStatus: "Семейное положение",
  source: "Источник информации",
  code: "Код респондента",
  personalDocument: "Документ удостоверяющий личность",
  gender: "Пол",
  citizenship: "Гражданство",
  education: "Образование",
  nationality: "Национальность",
  employment: "Занятость",
  socialStatus: "Социальный статус",
  location: "Местонахождение",
  registration: "Наличие регистрации / Прописки по месту проживания"
};

const booleanValueMap = {
  maritalStatus: {
    true: "Состоит в браке",
    false: "Не состоит в браке"
  },
  registration: {
    true: "Да",
    false: "Нет"
  }
};

class PersonalDatum extends Component {
  state = {
    showForm: false,
    showSurveyForm: false,
    survey: null
  };

  componentDidMount() {
    const { personalDatumId } = this.props.match.params;
    console.log();
    this.props.getPersonalDatum(personalDatumId);
    this.props.findSurveyByPersonalDataId(personalDatumId);
    this.props.getSurveyList();
  }

  transformData = data => {
    const transformedData = [];
    for (let item in data) {
      if (titlesMap[item]) {
        transformedData.push({
          title: titlesMap[item],
          description:
            typeof data[item] === "boolean"
              ? this.setDescription(item, data)
              : data[item]
        });
      }
    }

    return transformedData;
  };

  setDescription = (item, data) => {
    return booleanValueMap[item][data[item]];
  };

  toggleEditDatum = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  closeSurveyForm = () => {
    this.setState({
      showSurveyForm: false
    });
  };

  fillSurvey = survey => {
    this.setState({
      survey,
      showSurveyForm: true
    });
  };

  renderDatum = datum => (
    <Card
      bordered={false}
      title={datum.caseName}
      extra={
        <Button type="dashed" onClick={this.toggleEditDatum}>
          <Icon type="edit" theme="outlined" />
        </Button>
      }
    >
      <Collapse accordion bordered={false}>
        <Panel header="Персональные данные" key="1">
          <List
            itemLayout="horizontal"
            size="small"
            dataSource={this.transformData(this.props.datum)}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>

      <PersonalDataForm
        title="Редактировать персональные данные"
        datum={datum}
        visible={this.state.showForm}
        closeDrawer={this.toggleEditDatum}
      />
      {this.renderFilledSurveys()}
      {this.renderSurveys()}
      {this.state.survey ? (
        <SurveyForm
          survey={this.state.survey}
          personalData={datum}
          visible={this.state.showSurveyForm}
          closeDrawer={this.closeSurveyForm}
        />
      ) : null}
    </Card>
  );

  renderFilledSurveys = () => {
    const { filledSurveys } = this.props;

    return filledSurveys
      ? filledSurveys.map(filledSurvey => {
          return (
            <div
              key={filledSurvey._id}
              onClick={() => this.fillSurvey(filledSurvey)}
              style={{ marginTop: "20px", cursor: "pointer" }}
            >
              {filledSurvey.surveyPrototype.name} (заполнена)
            </div>
          );
        })
      : null;
  };

  renderSurveys = () => {
    const { filledSurveys, surveys } = this.props;
    const filledSurveysIds = filledSurveys.map(
      filledSurvey => filledSurvey.surveyPrototype._id
    );
    const activeSurveysList = surveys.filter(
      survey => !filledSurveysIds.includes(survey._id)
    );

    return activeSurveysList.map(survey => (
      <div
        key={survey._id}
        onClick={() => this.fillSurvey(survey)}
        style={{ marginTop: "20px", cursor: "pointer" }}
      >
        {survey.name}
      </div>
    ));
  };

  render() {
    const dataIsLoaded =
      this.props.datum && this.props.filledSurveys && this.props.surveys;

    return dataIsLoaded ? this.renderDatum(this.props.datum) : <Loader />;
  }
}

const mapStateToProps = state => ({
  datum: state.personalData.datum,
  filledSurveys: state.surveys.filledSurveys,
  surveys: state.surveys.surveyList
});

export default connect(
  mapStateToProps,
  { getPersonalDatum, findSurveyByPersonalDataId, getSurveyList }
)(PersonalDatum);
