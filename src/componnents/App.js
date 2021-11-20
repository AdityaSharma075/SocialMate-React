import React from 'react';
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
