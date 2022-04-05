import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
// import { images } from '../helpers';
import { connect } from 'react-redux';
import { Home, Navbar, Page404, Login, Signup, Settings, User } from '.';
import { fetchPosts } from '../actions/posts';
import PropType from 'prop-types';
import { authenticateUser, notAuthenticate } from '../actions/auth';
import { fetchUserFriends } from '../actions/friends';

const PrivateRoutes = ({ isLoggedin, children }) => {
  const location = useLocation();

  return isLoggedin ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
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
      // const user = jwtDecode(token);
      // console.log('12');
      this.props.dispatch(fetchUserFriends());
    } else {
      this.props.dispatch(notAuthenticate());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
    console.log(friends, 'ad');
    // const { posts, auth, friends } = this.props;
    return (
      <>
        {!auth.authenticate && <div> Loading..... </div>}
        {auth.authenticate && (
          <Router>
            <div>
              <Navbar />
            </div>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    posts={posts}
                    friends={this.props.friends.friends}
                    isLoggedin={auth.isLoggedin}
                  />
                }
              />
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
              <Route
                path="/user/:userId"
                element={
                  <PrivateRoutes isLoggedin={auth.isLoggedin}>
                    <User />
                  </PrivateRoutes>
                }
              />

              <Route path="*" element={<Page404 />} />
            </Routes>
          </Router>
        )}
      </>
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
App.protoTypes = {
  posts: PropType.array.isRequired,
};
export default connect(mapStateToProps)(App);
