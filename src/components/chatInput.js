import React from "react";

class ChatInput extends React.Component {
  chatInputRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    if(this.chatInputRef.current.value === ""){
      return;
    }
    const message = {
        message:this.chatInputRef.current.value,
        username:this.props.username,
        timeStamp:Date.now()
    }

    this.chatInputRef.current.value = "";
    this.props.addMessage(message);
  };

  handleChange = e =>{
      this.props.typingStatus(this.props.username)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          onChange={this.handleChange}
          ref={this.chatInputRef}
          placeholder="Type your message and hit Enter"
          type="text"
        />
      </form>
    );
  }
}

export default ChatInput;
