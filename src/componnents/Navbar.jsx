import React from 'react';
import SocialMate from '../SocialMate.svg';
import { images } from '../helpers';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };
  render() {
    const { auth } = this.props;
    return (
      <nav className="nav">
        <div className="left-nav">
          <Link to="/">
            <img src={SocialMate} alt="logo" />
          </Link>
        </div>
        <div className="search-container">
          <img className="search-icon" src={images.search} alt="search-icon" />

          <input placeholder="Search" />
          <div className="search-results">
            <ul>
              <li className="search-results-row">
                <img src={images.man} alt="user-dp" />
                <span>Aashi rai</span>
              </li>
              <li className="search-results-row">
                <img src={images.man} alt="user-dp" />
                <span>Aashi rai</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-nav">
          {auth.isLoggedin && (
            <div className="user">
              <Link to="/setting">
                <img src={images.man} alt="user-dp" id="user-dp" />
              </Link>
              <span> {auth.user.name}</span>
            </div>
          )}

          <div className="nav-links">
            <ul>
              {!auth.isLoggedin && (
                <li>
                  <Link to="/login">Log In </Link>
                </li>
              )}
              {auth.isLoggedin && <li onClick={this.logOut}>Log out</li>}
              {!auth.isLoggedin && (
                <li>
                  <Link to="/signup">Register </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Navbar);
