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

  clearFilters = (e) => {
    e.preventDefault();
    this.setState(this.defaultState)
  }

  selectAirline = (value) => {
    this.setState({airline: Number(value)})
  }

  selectAirport = (value) => {
    this.setState({airport: value})
  }

  // airports: {"code":"BGG","name":"Bingöl Airport","lat":38.861111,"long":40.5925},
  // routes: {"airline":4533,"src":"HBE","dest":"RUH"},
  // airlines:     {"id":2143,"name":"Egyptair"},

  hasAirline = (route) => {
    return route.airline === this.state.airline || this.state.airline === 'All';
  }

  hasAirport = (route) => {
    return route.src === this.state.airport || route.dest === this.state.airport || this.state.airport === 'All';
  }

  filterRoutes = () => {
    return DATA.routes.filter(route => {
      return this.hasAirline(route) && this.hasAirport(route);
    })
  }

  render() {
    const routes = this.filterRoutes();

    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const filteredRoutesByAirport = DATA.routes.filter(this.hasAirport);

    const filteredRoutesByAirline = DATA.routes.filter(this.hasAirline);

    const filteredAirports = DATA.airports.filter((airport) => {
      return filteredRoutesByAirline.some((route) => {
        return route.src === airport.code || route.dest === airport.code
      })
    })

    const filteredAirlines = DATA.airlines.filter((airline) => {
      return filteredRoutesByAirport.some((route) => {
        return route.airline === airline.id;
      })
    })

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <div className="select airline">
          <Select
            options={filteredAirlines}
            keyName="id"
            titleKey="All Airlines"
            value={this.state.airline}
            onSelect={this.selectAirline}
          />
        </div>
        <div className="select airport">
          <Select
            options={filteredAirports}
            keyName="code"
            titleKey="All Airports"
            value={this.state.airport}
            onSelect={this.selectAirport}
          />
        </div>
        <div className="clearFilters">
          <button className="clearFiltersButton" disabled={this.state === this.defaultState} onClick={this.clearFilters}>Clear Filters</button>
        </div>
        <div className="table">
          <Table className="routes-table" columns={columns} rows={routes} format={this.formatValue}/>
        </div>
      </div>
    );
  }
}

export default App;
