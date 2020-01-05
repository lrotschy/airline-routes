import React, { Component } from 'react';

class Select extends Component {

// props Airlines
  // airlines:     {"id":2143,"name":"Egyptair"},
  handleChange = (e) => {
    e.preventDefault();
    this.props.onSelect(e.target.value)
  }

  render() {
    console.log(this.props.titleKey);
    console.log(this.props.options.length)

    const options = this.props.options.map((option) => {
      const value = option[this.props.keyName]
      if (this.props.enabledOptions.includes(option)) {
        return <option key={value} value={value} >{option.name}</option>
      } else {
        return <option key={value} value={value} disabled>{option.name}</option>;
      }

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
