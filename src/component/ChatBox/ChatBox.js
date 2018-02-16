import React from 'react';

import ChatMessage from './ChatMessage/ChatMessage';
import './ChatBox.css';

const chatBox = (props) => (
  <div className='ChatBox'>
    {/* {this.props.children} */}
    <h1>Chat here</h1>
    <ChatMessage message="Hi hello" sender='me'/>
    <ChatMessage message="Hello" sender='other'/>
  </div>
)

export default chatBox;