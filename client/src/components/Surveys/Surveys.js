import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSurveyList, deleteSurveys } from "../../actions/surveyActions";

import SurveyConfig from "./SurveyConfig/SurveyConfig";

import { Table, Row, Col, Button, Icon } from "antd";

const columns = [
  {
    title: "Название Формы",
    dataIndex: "name",
    render: (text, record) => <Link to={`/surveys/${record._id}`}>{text}</Link>
  },
  {
    title: "Количество вопросов",
    dataIndex: "questions",
    render: (text, record) => text.length
  }
];

class Surveys extends Component {
  state = {
    showForm: false,
    selectedRowKeys: []
  };

  componentDidMount = () => {
    this.props.getSurveyList();
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onClickDeleteSurvey = () => {
    const { selectedRowKeys } = this.state;
    this.props.deleteSurveys(selectedRowKeys);
    this.setState({ selectedRowKeys: [] });
  };

  toggleAddSurvey = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  renderTable = (data, rowSelection) => (
    <>
      <Row style={{ paddingBottom: "20px" }}>
        <Col span={6} />
        <Col span={6} />
        <Col span={6} />
        <Col span={6} style={{ textAlign: "right" }}>
          {this.state.selectedRowKeys.length ? (
            <Button
              type="danger"
              disabled={!this.state.selectedRowKeys.length}
              onClick={this.onClickDeleteSurvey}
            >
              <Icon type="delete" theme="outlined" />
            </Button>
          ) : (
            <Button onClick={this.toggleAddSurvey}>
              <Icon type="plus-circle" theme="outlined" />
            </Button>
          )}
        </Col>
      </Row>
      <Table
        rowSelection={rowSelection}
        pagination={{ pageSize: 10 }}
        columns={columns}
        dataSource={data}
        rowKey="_id"
      />
    </>
  );

  render() {
    const data = this.props.surveys;
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <>
        {this.renderTable(data, rowSelection)}
        <SurveyConfig
          title="Создать Новый Опрос"
          visible={this.state.showForm}
          closeDrawer={this.toggleAddSurvey}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  surveys: state.surveys.surveyList
});

export default connect(
  mapStateToProps,
  { getSurveyList, deleteSurveys }
)(Surveys);
