import React, { Component } from 'react';
import Navbar from "./Navbar/Navbar";
import Body from "./Body";
import Footer from "./Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Body />
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
