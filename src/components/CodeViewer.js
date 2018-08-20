import React from "react";
import AceEditor from "react-ace";
import brace from "brace";

import "brace/mode/jsx";
import "brace/theme/github";

const CodeViewer = props => (
  <AceEditor
    style={{ width: "100%" }}
    mode="jsx"
    theme="github"
    name="blah4"
    // onLoad={this.onLoad}
    onChange={this.handleChange}
    fontSize={14}
    showPrintMargin={true}
    showGutter={true}
    highlightActiveLine={true}
    value={props.formCode}
    setOptions={{
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: false,
      showLineNumbers: true,
      tabSize: 2
    }}
  />
);

export default CodeViewer;
