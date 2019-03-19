import React, { Component } from 'react';
import Body from "./Body";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

class App extends Component {

  render() {
    return (
      <Router>
        <Body />
      </Router>
    );
  }
}

export default App;
