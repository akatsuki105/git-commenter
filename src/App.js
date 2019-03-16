import React, { Component } from 'react';
import Navbar from "./Navbar/Navbar";
import Body from "./Body";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Body />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
