import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/posts';
import { images } from '../helpers';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  handleOnClick = () => {
    // dispatch action
    this.props.dispatch(createPost(this.state.content));
    this.setState({
      content: '',
    });
  };

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  render() {
    return (
      <div className="create-post">
        <div className="header">
          <img src={images.user} />
          <span>What's on you mind {this.props.user.name} ?</span>
        </div>
        <textarea
          className="add-post"
          value={this.state.content}
          onChange={this.handleChange}
        />

        <div>
          <button id="add-post-btn" onClick={this.handleOnClick}>
            Add Post
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(CreatePost);
