import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Profile from './Profile';
import NearbyBuddies from './NearbyBuddies';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.getUserLocation();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path='/' component={Landing} />
            <Route exact path='/profile' component={Profile} />
            <Route path='/nearby_buddies' component={NearbyBuddies} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(App);