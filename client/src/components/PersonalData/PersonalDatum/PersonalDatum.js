import React, { Component } from "react";
import { connect } from "react-redux";
import { getPersonalDatum } from "../../../actions/personalDataActions";

import PersonalDataForm from "../PersonalDataForm/PersonalDataForm";
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

const customPanelStyle = {
  background: "#f7f7f7",
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: "hidden"
};

class PersonalDatum extends Component {
  state = {
    showForm: false
  };

  componentDidMount() {
    const { personalDatumId } = this.props.match.params;
    console.log();
    this.props.getPersonalDatum(personalDatumId);
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
                {/* <div style={{ paddingRight: "10px" }}>{item.description}</div> */}
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
    </Card>
  );

  render() {
    return this.props.datum ? (
      this.renderDatum(this.props.datum)
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = state => ({
  datum: state.personalData.datum
});

export default connect(
  mapStateToProps,
  { getPersonalDatum }
)(PersonalDatum);
