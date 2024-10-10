// src/components/Signup.js
import React, { Component } from 'react';
import { io } from 'socket.io-client';

class Signup extends Component {
  state = { username: '', roomCode: '' };

  socket = io('https://white-board-backend-y02p.onrender.com');

  handleCreateRoom = () => {
    const { username, roomCode } = this.state;
    this.socket.emit('createRoom', { roomCode, username });
  };

  render() {
    return (
      <div className="signup-container">
        <h2>Create Room</h2>
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
        <button onClick={this.handleCreateRoom}>Create Room</button>
      </div>
    );
  }
}

export default Signup;
