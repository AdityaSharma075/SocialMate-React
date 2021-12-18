import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Home, Navbar, Page404, Login, Signup, Settings } from './';
import { fetchPosts } from '../actions/posts';
import PropType from 'prop-types';
import { authenticateUser } from '../actions/auth';

const PrivateRoutes = (privateRoutesProps) => {
  const { isLoggedin } = privateRoutesProps;
  console.log(':', isLoggedin);
  return isLoggedin ? <Outlet /> : <Navigate to="/login" />;
};
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }

  render() {
    const { posts, auth } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* private route from here */}
          {auth.authenticate && (
            <Route element={<PrivateRoutes isLoggedin={auth.isLoggedin} />}>
              <Route path="/setting" element={<Settings />} />
            </Route>
          )}

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}
App.protoTypes = {
  posts: PropType.array.isRequired,
};
export default connect(mapStateToProps)(App);
