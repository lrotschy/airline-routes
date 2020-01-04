import React, { Component } from 'react';
import './App.css';
import DATA from './data.js'
import Table from './components/table.js';
import Select from './components/select.js';

class App extends Component {
  defaultState = {
    airline: 'All',
    airport: 'All'
  }

  constructor(props) {
    super(props);
    this.state = this.defaultState;

  }

// {routes: Array(850), airlines: Array(17), airports: Array(520)}
// {airline: 24, src: "DFW", dest: "FWA"}
// {id: 130, name: "Aeroflot Russian Airlines"}
// {code: "YHZ", name: "Halifax / Stanfield International Airport", lat: 44.8807983398, long: -63.5085983276}


  render() {
    // console.log(DATA);
    // console.log(DATA.routes[1]);
    // console.log(DATA.airlines[1]);
    // console.log(DATA.airports[1]);

    const flights = DATA.routes.map(route => {
      return {
        airline: DATA.getAirlineById(route.airline),
        src: DATA.getAirportByCode(route.src),
        dest: DATA.getAirportByCode(route.dest)
      }
    });
    console.log(DATA.routes[0]);
    console.log(flights)
    console.log(flights[0]);

    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    function formatValue(property, value) {
      return value;
    }

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Welcome to the apple!
          </p>
        </section>
        <div className="table">
          <Table className="routes-table" columns={columns} rows="" format="" flights={flights}/>
        </div>
      </div>
    );
  }
}

export default App;
