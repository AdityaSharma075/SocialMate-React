import React, { Component } from 'react';
import { connect } from 'react-redux';
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.auth.user.name,
      password: '',
      confirmPassword: '',
      editMode: false,
    };
  }
  handelChange = (fieldName, value) => {
    this.setState({
      [fieldName]: value,
    });
  };
  render() {
    const { user } = this.props.auth;
    const { editMode } = this.state;
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1637383511~hmac=e82d6c0a3716c9f3942a93d1d57351d8"
            alt="user-dp"
            id="user-dp"
          />
        </div>
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handelChange('name', e.target.value)}
              value={this.state.name}
            />
          ) : (
            <div className="field-value">{user.name}</div>
          )}
          {editMode && (
            <div className="field">
              <div className="field-label">
                Password
                <input
                  type="password"
                  onChange={(e) =>
                    this.handelChange('password', e.target.value)
                  }
                  value={this.state.password}
                />
              </div>
            </div>
          )}
          {editMode && (
            <div className="field">
              <div className="field-label">
                Confirm Password
                <input
                  type="password"
                  onChange={(e) =>
                    this.handelChange('confirmPassword', e.target.value)
                  }
                  value={this.state.confirmPassword}
                />
              </div>
            </div>
          )}
        </div>
        <div className="btn-grp">
          {editMode ? (
            <button className="button save-btn"> Save</button>
          ) : (
            <button
              className="button edit-btn"
              onClick={() => this.handelChange('editMode', true)}
            >
              Edit Profile
            </button>
          )}
          {editMode && (
            <div
              className="go-back"
              onClick={() => this.handelChange('editMode', false)}
            >
              Go Back
            </div>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return {
    auth,
  };
}
export default connect(mapStateToProps)(Settings);
