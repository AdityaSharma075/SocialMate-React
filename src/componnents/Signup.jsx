import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { clearAuthState, signin, startSignup } from '../actions/auth';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      name: '',
    };
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
  handelNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handelConfirmPasswordChange = (e) => {
    this.setState({
      confirm_password: e.target.value,
    });
  };
  handelFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const { email, password, confirm_password, name } = this.state;
    if (email && password && confirm_password && name) {
      this.props.dispatch(startSignup());
      this.props.dispatch(signin(email, password, confirm_password, name));
    }
    // console.log(this.emailInputRef);
    // console.log(this.passwordInputRef);
  };
  render() {
    const { inProgress, error, isLoggedin, isSignuped } = this.props.auth;
    if (isLoggedin) {
      return <Navigate to="/" />;
    }
    if (isSignuped) {
      return <Navigate to="/login" />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">SignUp</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            onChange={this.handelEmailChange}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            onChange={this.handelPasswordChange}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="confirm password"
            onChange={this.handelConfirmPasswordChange}
            required
          />
        </div>
        <div className="field">
          <input
            type="text"
            placeholder="Name"
            onChange={this.handelNameChange}
            required
          />
        </div>
        <div className="field">
          <button onClick={this.handelFormSubmit} disabled={inProgress}>
            Signup
          </button>
        </div>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Signup);
