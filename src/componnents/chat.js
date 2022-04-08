import React, { Component } from 'react';
import io from 'socket.io-client';
import { images } from '../helpers';
import { connect } from 'react-redux';
import '../chat.css';
class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], // {content: 'some message', self: true}
      typedMessage: '',
      open: false,
    };
    this.socket = io.connect('http://43.204.35.13:5000/');
    // console.log('oasdfm ', props);
    this.userEmail = props.user.email;

    if (this.userEmail) {
      this.setupConnections();
    }
  }
  setupConnections = () => {
    const socketConnection = this.socket;
    const self = this;

    this.socket.on('connect', function () {
      console.log('CONNECTION ESTABLISHED');

      socketConnection.emit('join_room', {
        user_email: this.userEmail,
        chatroom: 'socialMate',
      });

      socketConnection.on('user_joined', function (data) {
        console.log('NEW USER JOINED', data);
      });
    });

    this.socket.on('receive_message', function (data) {
      // console.log('i am here', data);
      // add message to state
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;
      messageObject.user = data.user_email;

      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }

      self.setState({
        messages: [...messages, messageObject],
        typedMessage: '',
      });
    });
  };
  handleSubmit = () => {
    const { typedMessage } = this.state;
    console.log('here', typedMessage, 'sdf', this.userEmail);
    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: 'socialMate',
      });
    }
  };
  handleClick = () => {
    let flag = this.state.open;
    this.setState({
      open: !flag,
    });
  };
  render() {
    const { typedMessage, messages, open } = this.state;
    return (
      <div className="chat-container">
        {open ? (
          <div>
            <div className="chat-header" onClick={this.handleClick}>
              Chat
              <img src={images.minus} alt="" height={17} />
            </div>
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.user}
                  className={
                    message.self
                      ? 'chat-bubble self-chat'
                      : 'chat-bubble other-chat'
                  }
                >
                  {message.content}
                  {!message.self && <div className="user">{message.user}</div>}
                </div>
              ))}
            </div>
            <div className="chat-footer">
              <input
                type="text"
                value={typedMessage}
                onChange={(e) =>
                  this.setState({ typedMessage: e.target.value })
                }
              />
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        ) : (
          <div
            className="chat-header"
            onClick={this.handleClick}
            style={{ position: 'absolute', width: '300px', bottom: '0px' }}
          >
            Group Chat
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Chat);
