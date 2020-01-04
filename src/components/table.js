import React, { Component } from 'react';
// import DATA from './../data.js'

class Table extends Component {

  render() {
    const flights = this.props.flights;
    const rows = flights.map(function(flight) {
      return <tr><td>{flight.airline}</td><td>{flight.src}</td><td>{flight.dest}</td></tr>
    })

    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>Airline</td>
              <td>Source</td>
              <td>Destination</td>
            </tr>
          </thead>
          <tbody>
              {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
