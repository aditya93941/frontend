// src/components/Whiteboard.js
import React, { Component } from 'react';
import { io } from 'socket.io-client';

class Whiteboard extends Component {
  state = {
    roomCode: '',
    username: '',
    users: [],
    isOwner: false,
    canSpeak: false,
    message: '',
    chatHistory: [],
  };

  socket = io('https://white-board-backend-y02p.onrender.com');

  componentDidMount() {
    this.socket.on('roomCreated', ({ roomCode }) => {
      this.setState({ roomCode, isOwner: true });
    });

    this.socket.on('welcome', ({ username, roomCode }) => {
      this.setState({ username, roomCode });
    });

    this.socket.on('receiveMessage', (data) => {
      this.setState((prevState) => ({
        chatHistory: [...prevState.chatHistory, data],
      }));
    });

    this.socket.on('micAccessGranted', (canSpeak) => {
      this.setState({ canSpeak });
    });
  }

  handleSendMessage = () => {
    const { roomCode, message, username } = this.state;
    if (message && this.state.isOwner) {
      this.socket.emit('sendMessage', { roomCode, message, username });
      this.setState({ message: '' });
    } else {
      alert('Only the room creator can send messages.');
    }
  };

  grantMicAccess = (userId) => {
    const { roomCode } = this.state;
    this.socket.emit('grantMicAccess', { roomCode, userId });
  };

  revokeMicAccess = (userId) => {
    const { roomCode } = this.state;
    this.socket.emit('revokeMicAccess', { roomCode, userId });
  };

  render() {
    const { chatHistory, message, users, canSpeak, isOwner } = this.state;

    return (
      <div className="whiteboard-container">
        <h2>Whiteboard Room: {this.state.roomCode}</h2>

        {/* Chat Section */}
        <div className="chat-section">
          <div className="chat-box">
            {chatHistory.map((chat, index) => (
              <div key={index} className="chat-message">
                <strong>{chat.username}: </strong>{chat.message}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => this.setState({ message: e.target.value })}
          />
          <button onClick={this.handleSendMessage}>Send</button>
        </div>

        {/* Microphone Permissions */}
        {isOwner && (
          <div className="mic-control-panel">
            <h3>Microphone Permissions</h3>
            {users.map((user) => (
              <div key={user.id}>
                <span>{user.username}</span>
                <button onClick={() => this.grantMicAccess(user.id)}>Grant Mic</button>
                <button onClick={() => this.revokeMicAccess(user.id)}>Revoke Mic</button>
              </div>
            ))}
          </div>
        )}

        {canSpeak && <div className="mic-status"><p>You can speak!</p></div>}
      </div>
    );
  }
}

export default Whiteboard;
