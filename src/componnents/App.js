import React from 'react';
import SocialMate from '../SocialMate.svg';
import { connect } from 'react-redux';
import { PostsList } from './';
import { fetchPosts } from '../actions/posts';
import PropType from 'prop-types';
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        <nav className="nav">
          <div className="left-nav">
            <img src={SocialMate} alt="logo" />
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
            <div className="user">
              <img
                src="https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1637383511~hmac=e82d6c0a3716c9f3942a93d1d57351d8"
                alt="user-dp"
                id="user-dp"
              />
              <span>Aditya Sharma</span>
            </div>
            <div className="nav-links">
              <ul>
                <li>Log In</li>
                <li>Log Out</li>
                <li>Register</li>
              </ul>
            </div>
          </div>
        </nav>
        <PostsList posts={posts} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}
App.protoTypes = {
  posts: PropType.array.isRequired,
};
export default connect(mapStateToProps)(App);
