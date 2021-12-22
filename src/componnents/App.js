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
import { authenticateUser, notAuthenticate } from '../actions/auth';

const PrivateRoutes = ({ isLoggedin, children }) => {
  return isLoggedin ? children : <Navigate to="/login" />;
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
    } else {
      this.props.dispatch(notAuthenticate());
    }
  }

  render() {
    const { posts, auth } = this.props;
    return (
      <>
        {!auth.authenticate && <div> Loading..... </div>}
        {auth.authenticate && (
          <Router>
            <div>
              <Navbar />
            </div>
            <Routes>
              <Route path="/" element={<Home posts={posts} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* private route from here */}
              <Route
                path="/setting"
                element={
                  <PrivateRoutes isLoggedin={auth.isLoggedin}>
                    <Settings />
                  </PrivateRoutes>
                }
              />

              <Route path="*" element={<Page404 />} />
            </Routes>
          </Router>
        )}
        )
      </>
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
