// src/App.js
import React, { Component } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Whiteboard from './components/Whiteboard';

class App extends Component {
  state = {
    isAuthenticated: false,
    roomCode: '',
    username: '',
  };

  handleAuthentication = (roomCode, username) => {
    this.setState({ isAuthenticated: true, roomCode, username });
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <div className="app">
        {!isAuthenticated ? (
          <div>
            <Login />
            <Signup />
          </div>
        ) : (
          <Whiteboard />
        )}
      </div>
    );
  }
}

export default App;
