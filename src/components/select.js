import React, { Component } from 'react';

class Select extends Component {

// props Airlines
  // airlines:     {"id":2143,"name":"Egyptair"},
  handleChange = (e) => {
    e.preventDefault();
    this.props.onSelect(e.target.value)
  }

  render() {

    const options = this.props.options.map((option) => {
      const value = option[this.props.keyName]
      return <option key={value} value={value}>{option.name}</option>;
    })

    options.unshift(<option key={this.props.titleKey} value="All">{this.props.titleKey}</option>)

    return (
      <select value={this.props.value} onChange={this.handleChange}>
        {options}
      </select>
    );
  }
}

export default Select;
