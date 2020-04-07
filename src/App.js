import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './screen/movieHome';
import Info from './screen/movieInfo';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        {/* public route */}
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movie-info">
            <Info />
          </Route>
        </Switch>
      </Router>
    )
  }
}

