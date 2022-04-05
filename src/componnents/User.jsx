import React from 'react';
import { connect } from 'react-redux';
import { images } from '../helpers';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchUserProfile } from '../actions/profile';
const User = (props) => {
  const params = useParams();
  // console.log(params);
  // console.log('Props ', props);
  useEffect(() => {
    if (params.userId) {
      props.dispatch(fetchUserProfile(params.userId));
    }
  }, []);
  const user = props.profile.user;
  if (props.profile.inProgress) {
    return <h1>Loading !!!!</h1>;
  }
  return (
    <div className="settings">
      <div className="img-container">
        <img src={images.man} alt="user-dp" />
      </div>

      <div className="field">
        <div className="field-label">Email</div>
        <div className="field-value">{user.email}</div>
      </div>

      <div className="field">
        <div className="field-label">Name</div>
        <div className="field-value">{user.name}</div>
      </div>

      <div className="btn-grp">
        <button className="button save-btn">Add Friend</button>
      </div>
    </div>
  );
};

function mapStateToProps({ profile }) {
  return {
    profile,
  };
}
export default connect(mapStateToProps)(User);
