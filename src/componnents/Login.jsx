import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { clearAuthState, login } from '../actions/auth';

const LoggedIn = () => {
  let location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  return <Navigate to={from} />;
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    // this.emailInputRef = React.createRef();
    // this.passwordInputRef = React.createRef();
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handelEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handelPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handelFormSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
    }
    // console.log(this.emailInputRef);
    // console.log(this.passwordInputRef);
  };

  render() {
    const { error, inProgress, isLoggedin } = this.props.auth;
    if (isLoggedin) {
      return <LoggedIn />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Login</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            autocomplete="true"
            placeholder="Email"
            required
            // ref={this.emailInputRef}
            onChange={this.handelEmailChange}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            required
            // ref={this.passwordInputRef}
            onChange={this.handelPasswordChange}
          />
        </div>
        {inProgress ? (
          <div className="field">
            <button onClick={this.handelFormSubmit} disabled={inProgress}>
              Logging in...
            </button>
          </div>
        ) : (
          <div className="field">
            <button onClick={this.handelFormSubmit}>LogIn</button>
          </div>
        )}
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);
