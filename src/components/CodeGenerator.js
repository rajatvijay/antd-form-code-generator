import React, { Component, Fragment } from "react";
import Declarator from "./Declarator";
import CodeViewer from "./CodeViewer";
import Generator from "../core/generator";
import { Row, Col } from "antd";

class CodeGenerator extends Component {
  state = {
    formCode: ""
  };

  // onDeclarationsChanged = declarations => {
  //   const formCode = Generator(declarations);
  //   this.setState({ declarations, formCode });
  // };

  generateFormCode = declarations => {
    const formCode = Generator(declarations);
    this.setState({ formCode });
  };

  render() {
    const { declarations, formCode } = this.state;
    return (
      <div style={{ padding: "2% 8%" }}>
        <h2
          style={{
            textAlign: "center",
            color: "rgb(81, 81, 81)",
            marginBottom: 20,
            fontSize: 26
          }}
        >
          Antd react form code generator
        </h2>
        <Row>
          <Col span={12}>
            <Declarator
              generate={this.generateFormCode}
              onChange={this.onDeclarationsChanged}
              declarations={declarations}
            />
          </Col>
          <Col span={12}>
            <CodeViewer formCode={formCode} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default CodeGenerator;
