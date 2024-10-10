// src/components/Login.js
import React, { Component } from 'react';
import { io } from 'socket.io-client';

class Login extends Component {
  state = { username: '', roomCode: '' };

  socket = io('https://white-board-backend-y02p.onrender.com');

  handleJoinRoom = () => {
    const { username, roomCode } = this.state;
    this.socket.emit('joinRoom', { roomCode, username });
  };

  render() {
    return (
      <div className="login-container">
        <h2>Join Room</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Room Code"
          onChange={(e) => this.setState({ roomCode: e.target.value })}
        />
        <button onClick={this.handleJoinRoom}>Join</button>
      </div>
    );
  }
}

export default Login;
