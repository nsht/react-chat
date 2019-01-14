import React from "react";
import ChatWindow from "./chatWindow";
import ChatInput from "./chatInput";
import base from "../base";

// import logo from './logo.svg';
// import './App.css';

class App extends React.Component {
  state = {
    messages: {},
    typingStatus: []
  };

  componentDidMount() {
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.chatId}/chats`, {
      context: this,
      state: "messages"
    });

    this.typingRef = base.syncState(`${params.chatId}/typingStatus`, {
      context: this,
      state: "typingStatus",
      asArray: true
    });
  }

  addMessage = message => {
    const messages = { ...this.state.messages };
    messages[`message${Date.now()}`] = message;
    this.setState({ messages });
    let index = this.state.typingStatus.indexOf(message.username);
    const typingStatus = this.state.typingStatus;
    if (index > -1) {
      typingStatus.splice(index, 1);
    }
    this.setState({ typingStatus: typingStatus });
  };

  typingStatus = username => {
    let index = this.state.typingStatus.indexOf(username);
    if (index > -1) {
      return;
    }
    this.setState({ typingStatus: [...this.state.typingStatus, username] });
  };

  render() {
    let username = "Anon";
    if (typeof this.props.location.state !== "undefined") {
      username = this.props.location.state.username;
    }
    return (
      <div className="App">
        <div className="header">
          <h2>Chat Room: {this.props.match.params.chatId}</h2>
          <h3>{username}</h3>
        </div>
        <ChatWindow
          messages={this.state.messages}
          username={username}
          typingStatus={this.state.typingStatus}
        />
        <ChatInput
          username={username}
          addMessage={this.addMessage}
          typingStatus={this.typingStatus}
        />
      </div>
    );
  }
}

export default App;
