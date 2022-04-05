// import React from 'react';
import { FriendsListItem } from './';

import React, { Component } from 'react';

export default class FriendsList extends Component {
  render() {
    return (
      <div className="friends-list">
        <div className="header">Friends</div>

        {this.props.friends && this.props.friends.length === 0 && (
          <div className="no-friends">No friends found! </div>
        )}

        {this.props.friends &&
          this.props.friends.map((friend) => (
            <FriendsListItem friend={friend.to_user} key={friend._id} />
          ))}
      </div>
    );
  }
}
