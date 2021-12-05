import React from 'react';
import SocialMate from '../SocialMate.svg';
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
          <img
            className="search-icon"
            src="https://cdn-icons.flaticon.com/png/512/3031/premium/3031293.png?token=exp=1637383403~hmac=a997155f34eb49f3b93eb13deb51e64a"
            alt="search-icon"
          />

          <input placeholder="Search" />
          <div className="search-results">
            <ul>
              <li className="search-results-row">
                <img
                  src="https://cdn-icons.flaticon.com/png/512/1785/premium/1785896.png?token=exp=1637383511~hmac=ecd327abe5c9b51a7607f749e4a368ec"
                  alt="user-dp"
                />
                <span>Aashi rai</span>
              </li>
              <li className="search-results-row">
                <img
                  src="https://cdn-icons.flaticon.com/png/512/1785/premium/1785896.png?token=exp=1637383511~hmac=ecd327abe5c9b51a7607f749e4a368ec"
                  alt="user-dp"
                />
                <span>Aashi rai</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-nav">
          {auth.isLoggedin && (
            <div className="user">
              <img
                src="https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1637383511~hmac=e82d6c0a3716c9f3942a93d1d57351d8"
                alt="user-dp"
                id="user-dp"
              />
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
