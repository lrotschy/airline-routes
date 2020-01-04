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
  constructor(props) {
    super(props);
    this.state = { page: 0 };
  }

  previousPage(e) {
    e.preventDefault();
    const currentPage = this.state.page;
    this.setState({page: currentPage - 1})
  }

  nextPage(e) {
    e.preventDefault();
    const currentPage = this.state.page;
    this.setState({page: currentPage + 1})
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
        console.log(this.props.format(col.property, value));
        console.log(col.property)
        console.log(value)
        return <td key={col.property + value}>{ this.props.format(col.property, value) }</td>
      });
      return <tr key={Object.values(row).join(':')}>
        { rows }
      </tr>
    });

    // airports: {"code":"BGG","name":"Bingöl Airport","lat":38.861111,"long":40.5925},
    // routes: {"airline":4533,"src":"HBE","dest":"RUH"},
    // airlines:     {"id":2143,"name":"Egyptair"},
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
          <button key="next" disabled={start + this.state.perPage >= 0} onClick={this.nextPage}>
              Next Page
          </button>
        </div>
      </div>
    );
  }
}

export default Table;
