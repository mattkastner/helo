import React, { Component } from 'react'
import routes from './routes'

import PropTypes from "prop-types";
import { withRouter } from "react-router";
import 'reset-css'
import Nav from './components/Nav/Nav'
import './App.css'

class App extends Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className='app-container'>
        {this.props.location.pathname === '/' ?
          null
          :
          <Nav />
        }
        {routes}
      </div>
    )
  }
}

export default withRouter(App)