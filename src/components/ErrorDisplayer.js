import React, { Component } from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Error Key",
    dataIndex: "dataPath",
    key: "dataPath"
  },
  {
    title: "Error Message",
    dataIndex: "message",
    key: "message"
  }
];

class ErrorDisplay extends Component {
  render() {
    return (
      <div
        style={{
          marginTop: 20,
          fontSize: 18,
          color: "red"
        }}
      >
        {this.props.errors && this.props.errors.length ? (
          <Table
            size="middle"
            dataSource={this.props.errors}
            columns={columns}
          />
        ) : (
          <div>Error will appear here</div>
        )}
      </div>
    );
  }
}

export default ErrorDisplay;
