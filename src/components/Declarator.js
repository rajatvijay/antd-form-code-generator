import React, { Component, Fragment } from "react";
import { Button } from "antd";
import AceEditor from "react-ace";
import brace from "brace";

import "brace/mode/json";
import "brace/theme/github";

const initailDeclarations = `[
  {
    "field": "Input",
    "label": "E-mail",
    "validations": [
      {
        "type": "email",
        "message": "Please type a valid email"
      },
      {
        "required": "email",
        "message": "Please provide an email"
      }
    ],
    "valuePropName": "userEmail"
  },
  {
    "field": "Input",
    "label": "Name",
    "validations": [
      {
        "required": "email",
        "message": "Please provide an email"
      }
    ],
    "valuePropName": "userName"
  }
]`;

class Declarator extends Component {
  state = {
    declarations: initailDeclarations
  };
  // handleChange = e => this.props.onChange (e.target.value);

  handleChange = newValue => {
    this.setState({ declarations: newValue });
  };

  generate = () => {
    const declarations = this.state;
    this.props.generate(
      JSON.parse(declarations.declarations.replace(/\n/g, ""))
    );
  };

  render() {
    const { declarations } = this.state;
    return (
      <Fragment>
        <AceEditor
          style={{ width: "100%" }}
          mode="json"
          theme="github"
          name="blah2"
          // onLoad={this.onLoad}
          onChange={this.handleChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={declarations}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}
        />
        <Button
          style={{ marginTop: 20, width: 150 }}
          onClick={this.generate}
          size="large"
        >
          Generate
        </Button>
      </Fragment>
    );
  }
}

export default Declarator;
