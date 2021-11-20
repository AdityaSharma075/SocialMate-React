import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header">Login</span>
        <div className="field">
          <input type="email" placeholder="Email" required />
        </div>
        <div className="field">
          <input type="password" placeholder="password" required />
        </div>
        <div className="field">
          <button>LogIn</button>
        </div>
      </form>
    );
  }
}

export default Login;
