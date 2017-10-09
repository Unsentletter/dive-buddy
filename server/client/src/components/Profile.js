import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Profile extends Component {
  renderContent() {
    console.log(this.props.auth);
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

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <h3>
          {this.renderContent()}
        </h3>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Profile);