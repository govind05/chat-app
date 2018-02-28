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
      senderName: this.props.user.displayName,
      timeStamp: +Date.now().toString(),
      readBy: [],
    }
    this.setState({
      message: ''
    })
    this.props.messageSend(message);
  }

  render() {
    let messages = this.props.messages.map(message => {
      return (<ChatMessage
        key={message.key}
        message={message.message}
        sender={message.sender}
        time={message.time}
        senderName={message.senderName}
        user={this.props.user}
        readBy={message.readBy}
      />)
    }
    )
    return (
      <div className='ChatBox'>
        {/* {this.this.props.children} */}
        <h1>Tech Support</h1>
        <div className='ChatMessages'
        >
          {messages}
          <div style={{ float: "left", clear: "both" }}
            ref={(chatBox) => this.box = chatBox}>
          </div>
        </div>
        <TextBox
          onMessageWrite={this.onMessageWrite}
          sendMessage={this.onMessageSent}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default ChatBox;