import React from 'react';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home, Navbar, Page404 } from './';
import { fetchPosts } from '../actions/posts';
import PropType from 'prop-types';

const Login = () => <div>Login</div>;
const Signup = () => <div>SignUp</div>;
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
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
