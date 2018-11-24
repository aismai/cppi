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
    title: "Question",
    dataIndex: "body",
    render: (text, record) => (
      <Link to={`/questions/${record._id}`}>{text}</Link>
    )
  },
  {
    title: "Question type",
    dataIndex: "questionType"
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
  };

  toggleAddQuestion = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  renderTable = (data, rowSelection) => (
    <div>
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
        columns={columns}
        dataSource={data}
        rowKey="_id"
      />
    </div>
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
          title="Create Question"
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
