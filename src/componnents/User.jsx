import React from 'react';
import { connect } from 'react-redux';
import { images } from '../helpers';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../actions/profile';
import { getAuthToken } from '../helpers/utils';
import { addFriend, removeFriend } from '../actions/friends';
const User = (props) => {
  const [Success, setSuccess] = useState(null);
  const [error, seterror] = useState(null);

  const params = useParams();
  // console.log(params);
  // console.log('Props ', props);
  useEffect(() => {
    if (params.userId) {
      props.dispatch(fetchUserProfile(params.userId));
    }
  }, [params.userId]);
  console.log(props, 'fesd');
  const userId = params.userId;
  let index;

  index = props.friends.map((friend) => friend.to_user._id).indexOf(userId);
  let isUserAFriend = false;
  if (index !== -1) {
    isUserAFriend = true;
  }
  const user = props.profile.user;

  const handleAddFriendClick = async () => {
    // const userId = params.userId;
    const url = `/api/v1/friendship/create_friendship?user_id=${userId}`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      setSuccess(true);

      props.dispatch(addFriend(data.data.friendship));
    } else {
      seterror(data.message);
    }
  };

  const handleRemoveFriendClick = async () => {
    const url = `/api/v1/friendship/remove_friendship?user_id=${userId}`;

    const extra = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };

    const response = await fetch(url, extra);
    const data = await response.json();
    console.log('await data', data);

    if (data.success) {
      seterror(data.message);

      props.dispatch(removeFriend(params.userId));
    } else {
      seterror(data.message);
    }
  };

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
        {!isUserAFriend ? (
          <button className="button save-btn" onClick={handleAddFriendClick}>
            Add Friend
          </button>
        ) : (
          <button className="button save-btn" onClick={handleRemoveFriendClick}>
            Remove Friend
          </button>
        )}
        {Success && (
          <div className="alert success-dailog">Friend added successfully</div>
        )}
        {error && <div className="alert error-dailog">{error}</div>}
      </div>
    </div>
  );
};

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}
export default connect(mapStateToProps)(User);
