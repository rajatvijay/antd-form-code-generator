import React, {Component} from 'react';

class Declarator extends Component {
  handleChange = e => this.props.onChange (e.target.value);

  render () {
    return (
      <textarea onChange={this.handleChange} value={this.props.declarations} />
    );
  }
}

export default Declarator;
