import React, {Component, Fragment} from 'react';
import Declarator from './Declarator';
import CodeViewer from './CodeViewer';
import Generator from '../generator';

class CodeGenerator extends Component {
  state = {
    declarations: '',
    formCode: '',
  };

  onDeclarationsChanged = declarations => {
    const formCode = Generator (declarations);
    this.setState ({declarations, formCode});
  };

  render () {
    const {declarations, formCode} = this.state;
    return (
      <Fragment>
        <Declarator
          onChange={this.onDeclarationsChanged}
          declarations={declarations}
        />
        <CodeViewer formCode={formCode} />
      </Fragment>
    );
  }
}

export default CodeGenerator;
