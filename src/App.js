import React, { Component } from 'react';
import './App.css';
import DATA from './data.js'
import Table from './components/table.js';
import Select from './components/select.js';

class App extends Component {
  defaultState = {
    airline: 'All',
    airport: 'All',
    perPage: 25
  }

  constructor(...props) {
    super(...props);
    this.state = this.defaultState;
  }

  formatValue(property, value) {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  }


  render() {
    const routes = DATA.routes;

    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <div className="select airline">
          <Select
            options={DATA.airlines}
            keyName="id"
          />
        </div>
        <div className="select airport">
          <Select
            options={DATA.airports}
            keyName="code"
          />
        </div>
        <div className="table">
          <Table className="routes-table" columns={columns} rows={routes} format={this.formatValue}/>
        </div>
      </div>
    );
  }
}

export default App;
