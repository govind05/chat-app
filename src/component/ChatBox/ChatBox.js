import React from 'react';

import ChatMessage from './ChatMessage/ChatMessage';
import * as firebase from 'firebase';

import './ChatBox.css';

const chatBox = (props) => {

  const db = firebase.firestore();
  

  return (
    <div className='ChatBox'>
      {/* {this.props.children} */}
      <h1>Chat here</h1>
      <ChatMessage message="Hi hello" sender='me' />
      <ChatMessage message="Hello" sender='other' />
      <ChatMessage message="Hello" sender='other' />
    </div>
  );
}

export default chatBox;