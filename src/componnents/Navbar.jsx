import React from 'react';
import SocialMate from '../SocialMate.svg';
import { images } from '../helpers';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import { searchUsers, clearSearchState } from '../actions/search';

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };
  handleSearch = (e) => {
    const searchText = e.target.value;

    searchText === ''
      ? this.props.dispatch(clearSearchState())
      : this.props.dispatch(searchUsers(searchText));
  };
  render() {
    const { auth, results, isSearching } = this.props;

    return (
      <nav className="nav">
        <div className="left-nav">
          <Link to="/">
            <img className="logo" src={images.SOCIALMATE} alt="logo" />
          </Link>
        </div>
        <div className="search-container">
          <img className="search-icon" src={images.search} alt="search-icon" />

          <input placeholder="Search" onChange={this.handleSearch} />
          {isSearching && (
            <div className="search-results">
              <ul>
                <li key="search">
                  <span> Searching !!</span>
                </li>
              </ul>
            </div>
          )}
          {results.length > 0 && (
            <div className="search-results">
              <ul>
                {results.map((user) => (
                  <li className="search-results-row" key={user._id}>
                    {auth.user._id === user._id ? (
                      <Link to={`/setting`}>
                        <img src={images.user} alt="user-pic" />
                        <span>{user.name}</span>
                      </Link>
                    ) : (
                      <Link to={`/user/${user._id}`}>
                        <img src={images.user} alt="user-pic" />
                        <span>{user.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="right-nav">
          {auth.isLoggedin && (
            <div className="user">
              <Link to="/setting">
                <img src={images.user} alt="user-dp" id="user-dp" />
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
    results: state.search.results,
    isSearching: state.search.isSearching,
  };
}
export default connect(mapStateToProps)(Navbar);
