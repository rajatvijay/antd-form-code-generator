import React, { Component } from "react";
import Declarator from "./Declarator";
import CodeViewer from "./CodeViewer";
import Generator from "../core/generator";
import { Row, Col, Button, message } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
      <div style={{ padding: "2%" }}>
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
        <Row type="flex">
          <Col span={10}>
            <Declarator
              generate={this.generateFormCode}
              onChange={this.onDeclarationsChanged}
              declarations={declarations}
            />
          </Col>
          <Col span={14}>
            <div
              style={{
                overflowX: "scroll",
                height: 500
              }}
            >
              <CodeViewer formCode={formCode} />
            </div>
            {formCode ? (
              <CopyToClipboard
                text={formCode}
                onCopy={() => message.success("Copied!")}
              >
                <Button style={{ marginTop: 20, width: 150 }} size="large">
                  Click to Copy
                </Button>
              </CopyToClipboard>
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

export default CodeGenerator;
