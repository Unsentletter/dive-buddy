import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    console.log('auth', this.props);
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/facebook">Login with Facebook</a></li>
        );
      default:
        return (
          <li><a href="/api/logout">Log Out</a></li>
        )
    }
  }

  render() {
    return (
      <nav>
        <div>
          <Link
            to={this.props.auth ? '/profile' : '/'}
            className="left brand-logo"
          >
            Dive Buddy
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);