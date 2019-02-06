import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getQuestionList,
  deleteQuestions
} from "../../actions/questionActions";

import QuestionForm from "./QuestionForm/QuestionForm";

import { Table, Row, Col, Button, Icon } from "antd";

const columns = [
  {
    title: "Вопрос",
    dataIndex: "body",
    render: (text, record) => (
      <Link to={`/questions/${record._id}`}>{text}</Link>
    )
  },
  {
    title: "Варианты ответов",
    dataIndex: "answers",
    render: (text, record) => text.length
  },
  {
    title: "Используется в статистике",
    dataIndex: "isUsedInStatistics",
    render: text => (text ? "Да" : "Нет")
  }
];

class Questions extends Component {
  state = {
    showForm: false,
    selectedRowKeys: []
  };

  componentDidMount = () => {
    this.props.getQuestionList();
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onClickDeleteQuestion = () => {
    const { selectedRowKeys } = this.state;
    this.props.deleteQuestions(selectedRowKeys);
    this.setState({ selectedRowKeys: [] });
  };

  toggleAddQuestion = () => {
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
              onClick={this.onClickDeleteQuestion}
            >
              <Icon type="delete" theme="outlined" />
            </Button>
          ) : (
            <Button onClick={this.toggleAddQuestion}>
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
    const data = this.props.questions;
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <>
        <QuestionForm
          title="Создать Вопрос"
          visible={this.state.showForm}
          closeDrawer={this.toggleAddQuestion}
        />
        {this.renderTable(data, rowSelection)}
      </>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.array,
  getQuestionList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  questions: state.questions.questionList
});

export default connect(
  mapStateToProps,
  {
    getQuestionList,
    deleteQuestions
  }
)(Questions);
