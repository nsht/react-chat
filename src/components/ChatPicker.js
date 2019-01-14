import React from "react";

class ChatPicker extends React.Component {
  myInput = React.createRef();
  myUsername = React.createRef();

  goToChat = event => {
    event.preventDefault();
    // const cname = this.myInput
    const chatName = this.myInput.current.value;
    this.props.history.push({
      pathname: `chat/${chatName}`,
      state: { username: this.myUsername.current.value }
    });
  };

  render() {
    return (
      <form className="chat-selector" onSubmit={this.goToChat}>
        <div>
          <label className="selector-label">Chat Name</label>
          <input
            type="text"
            ref={this.myInput}
            required
            placeholder="Chat Room Name"
            defaultValue="General"
          />
          <label className="selector-label">Username</label>
          <input
            type="text"
            ref={this.myUsername}
            required
            placeholder="Username"
            defaultValue="Guest"
          />
          <button type="submit">Enter Chat ➡</button>
        </div>
      </form>
    );
  }
}

export default ChatPicker;
