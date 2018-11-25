import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getPersonalData,
  deletePersonalData
} from "../../actions/personalDataActions";
import Moment from "react-moment";

import PersonalDataForm from "./PersonalDataForm/PersonalDataForm";
import { Table, Row, Col, Button, Icon } from "antd";

const columns = [
  {
    title: "Дело",
    dataIndex: "caseName",
    render: (text, record) => (
      <Link to={`/personal-data/${record._id}`}>{text}</Link>
    )
  },
  {
    title: "Код",
    dataIndex: "code"
  },
  {
    title: "Пол",
    dataIndex: "gender"
  },
  {
    title: "Дата регистрации",
    dataIndex: "registrationDate",

    render: text => <Moment format="DD/MM/YYYY">{text}</Moment>
  },
  {
    title: "Гражданство",
    dataIndex: "citizenship"
  }
];

class PersonalData extends Component {
  state = {
    showForm: false,
    selectedRowKeys: []
  };

  componentDidMount() {
    this.props.getPersonalData();
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onClickDeleteData = () => {
    const { selectedRowKeys } = this.state;

    this.props.deletePersonalData(selectedRowKeys);
  };

  toggleAddData = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  render() {
    const { data } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <>
        <PersonalDataForm
          title="Новое Дело"
          visible={this.state.showForm}
          closeDrawer={this.toggleAddData}
        />

        <Row style={{ paddingBottom: "20px" }}>
          <Col span={6} />
          <Col span={6} />
          <Col span={6} />
          <Col span={6} style={{ textAlign: "right" }}>
            {this.state.selectedRowKeys.length ? (
              <Button
                type="danger"
                disabled={!this.state.selectedRowKeys.length}
                onClick={this.onClickDeleteData}
              >
                <Icon type="delete" theme="outlined" />
              </Button>
            ) : (
              <Button onClick={this.toggleAddData}>
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
          expandIconAsCell={false}
          expandIconColumnIndex={-1}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  data: state.personalData.data
});

export default connect(
  mapStateToProps,
  { getPersonalData, deletePersonalData }
)(PersonalData);
