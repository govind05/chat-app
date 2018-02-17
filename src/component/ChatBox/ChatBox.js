import React from 'react';

import ChatMessage from './ChatMessage/ChatMessage';
import TextBox from './TextBox/TextBox';
import './ChatBox.css';

class ChatBox extends React.Component {
  state = {
    message: '',
  }

  componentDidMount() {
    this.scroll();
  }

  componentDidUpdate() {
    this.scroll();
  }

  scroll = () => {
    // this.box.scrollTop = this.box.scrollHeight;
    this.box.scrollIntoView({ behavior: 'smooth' })
  }

  onMessageWrite = (e) => {
    const message = e.target.value;
    this.setState({
      message
    })
  }

  onMessageSent = (e) => {
    e.preventDefault();
    let message = {
      message: this.state.message,
      sender: this.props.user.uid,
      timeStamp: +Date.now().toString(),
    }
    this.props.messageSend(message);
  }

  render() {
    console.log(this.state.message);
    let messages = this.props.messages.map(message =>
      <ChatMessage
        key={message.key}
        message={message.message}
        sender={message.sender}
      />)
    return (
      <div className='ChatBox'>
        {/* {this.this.props.children} */}
        <h1>Chat here</h1>
        <div className='ChatMessages'
        >
          {messages}
          <div style={{ float: "left", clear: "both" }}
            ref={(chatBox) => this.box = chatBox}>
          </div>
        </div>
        <TextBox
          onMessageWrite={this.onMessageWrite}
          sendMessage={this.onMessageSent} />
      </div>
    );
  }
}

export default ChatBox;