import React from "react";

class ChatWindow extends React.Component {
  chatBottom = React.createRef();
  notificationAudio = React.createRef();
  scrollToBottom = () => {
    this.chatBottom.current.scrollIntoView({ behavior: "smooth" });
    const audio = this.notificationAudio.current;
    audio.currentTime = 0;
    audio.play();
  };
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  typingIndicator = () => {
    let typingStatus = this.props.typingStatus;
    let index = typingStatus.indexOf(this.props.username);
    if (index > -1) {
      typingStatus.splice(index, 1);
    }
    if (typingStatus.length === 0) {
      return <span />;
    }

    return (
      <span className="typing-indicator">
        {typingStatus.join(",")}
        {typingStatus.length === 1 ? " is " : " are "}
        typing
        <span class="jumping-dots">
          <span class="dot-1">.</span>
          <span class="dot-2">.</span>
          <span class="dot-3">.</span>
        </span>
      </span>
    );
  };

  renderChatBubble = key => {
    const message = this.props.messages[key];
    let date = new Date(message.timeStamp);

    if (message.username === this.props.username) {
      return (
        <div className="chat-container" key={key}>
          <div className="chat-bubble self">
            {message.message}
            <div className="chat-bubble-date">
              {date.toLocaleString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="chat-container" key={key}>
        <div className="chat-bubble other">
          <div className="chat-bubble-username">{message.username}</div>
          {message.message}
          <div className="chat-bubble-date">
            {date.toLocaleString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        <div className="chat_window">
          {Object.keys(this.props.messages).map(this.renderChatBubble)}
          {this.typingIndicator()}
          <span ref={this.chatBottom} id="chat-bottom" />
        </div>
        <audio ref={this.notificationAudio} src="../sound/notification.wav"></audio>
      </>
    );
  }
}

export default ChatWindow;
