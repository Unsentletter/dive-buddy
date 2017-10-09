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
        console.log(img);
        return [
          <p key="email">{this.props.auth.email}</p>,
          <p key="username">{this.props.auth.firstName}</p>,
          <img key="img" src="https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/6898_10153412022742513_651009032096670910_n.jpg?oh=42ccb32a365cf20a60d136059a3723c0&oe=5A3DC088" alt=":("></img>
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