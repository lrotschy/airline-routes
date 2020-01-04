import React, { Component } from 'react';
// import DATA from './../data.js'

class Table extends Component {
  static defaultProps = {
    columns: [{name: 'header', property: 'value'}],
    rows: [{id: 1, value: 'cell'}],
    format: (property, value) => value,
    perPage: 25,
    className: "table"
  }

  constructor(...props) {
    super(...props);
    this.state = {
      page: 0
    };
  }

  previousPage = (e) => {
    e.preventDefault();
    this.setState({page: this.state.page - 1})
  }

  nextPage = (e) => {
    e.preventDefault();
    this.setState({page: this.state.page + 1})
  }

  render() {
    const start = this.state.page * this.props.perPage;
    const end = start + 25;

    const headers = this.props.columns.map((col) => {
      return <th key={ col.name }>{ col.name }</th>
    })

    const bodyRows = this.props.rows.slice(start, start + this.props.perPage).map( (row) => {
      const rows = this.props.columns.map( (col) => {
        const value = row[col.property];
        return <td key={col.property + value}>{ this.props.format(col.property, value) }</td>
      });
      return <tr key={Object.values(row).join(':')}>
        { rows }
      </tr>
    });

    return (

      <div>
        <table className={this.props.className}>
          <thead>
            <tr>
              { headers }
            </tr>
          </thead>
          <tbody>
            { bodyRows }
          </tbody>
        </table>


        <div className="pagination">
          <p>Showing {start}-{end} of {this.props.rows.length} routes.</p>
          <button key="previous" disabled={this.state.page === 0} onClick={this.previousPage}>
              Previous Page
          </button>
          <button key="next" disabled={start + this.state.perPage >= this.props.rows.length} onClick={this.nextPage}>
              Next Page
          </button>
        </div>
      </div>
    );
  }
}

export default Table;
