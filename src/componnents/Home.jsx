import React, { Component } from 'react';
import { PostsList, FriendsList, Chat } from '.';
import { fetchUserFriends } from '../actions/friends';
import { fetchPosts } from '../actions/posts';
import { connect } from 'react-redux';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');

    if (token) {
      // console.log('i ame here ', token);
      this.props.dispatch(fetchUserFriends());
    }
  }
  render() {
    const { posts, friends } = this.props;
    const { isLoggedin } = this.props.auth;
    // console.log('i am here ', this.props);
    return (
      <div className="home">
        <PostsList posts={posts} />
        {isLoggedin && <FriendsList friends={friends} />}
        {isLoggedin && <Chat />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}
export default connect(mapStateToProps)(Home);
