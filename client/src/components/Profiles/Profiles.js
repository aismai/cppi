import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers, deleteUsers } from "../../actions/profileActions";
import Moment from "react-moment";

import { Table, Row, Col, Button, Icon } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Last name",
    dataIndex: "lastname"
  },
  {
    title: "Email",
    dataIndex: "email"
  },
  {
    title: "Registered",
    dataIndex: "createdAt",

    render: text => <Moment format="DD/MM/YYYY">{text}</Moment>
  }
];

class Profiles extends Component {
  state = {
    selectedRowKeys: []
  };

  componentDidMount() {
    this.props.getAllUsers();
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  onClickDeleteUser = () => {
    const { selectedRowKeys } = this.state;
    this.props.deleteUsers(selectedRowKeys);
  };

  handleOnCreateUser = () => {
    this.props.history.push(`/register`);
  };

  render() {
    const data = this.props.users;
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <div>
        <Row style={{ paddingBottom: "20px" }}>
          <Col span={6} />
          <Col span={6} />
          <Col span={6}>
            <Button onClick={this.handleOnCreateUser}>
              <Icon type="plus-circle" />
            </Button>
          </Col>
          <Col span={6} style={{ textAlign: "right" }}>
            <Button
              type="danger"
              disabled={!this.state.selectedRowKeys.length}
              onClick={this.onClickDeleteUser}
            >
              <Icon type="delete" theme="outlined" />
            </Button>
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
  }
}

Profiles.propTypes = {
  users: PropTypes.array,
  getAllUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.profiles.userList,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getAllUsers, deleteUsers }
)(Profiles);
