import React, { Component } from 'react';

class Select extends Component {

// props Airlines
  // airlines:     {"id":2143,"name":"Egyptair"},


  render() {
    const options = this.props.options.map((option) => {
      return <option key={this.props.keyName}>{option.name}</option>;
    })
    return (
      <select>
        {options}
      </select>
    );
  }
}

export default Select;
