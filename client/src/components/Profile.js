import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

class Profile extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return;
      default:
        const img = this.props.auth.profilePhoto;
        return [
          <p key="email">{this.props.auth.email}</p>,
          <p key="username">{this.props.auth.firstName}</p>,
          <img key="img" src={img} alt=":("></img>
        ]
    }
  }

  getUserLocation() {

  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <h3>
          {this.renderContent()}
        </h3>
        <h1>Testing CodeShip still and still</h1>
        <Link to={'/nearby_buddies'}>
        <button className="btn">Search for dive buddies</button>
        </Link>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Profile);