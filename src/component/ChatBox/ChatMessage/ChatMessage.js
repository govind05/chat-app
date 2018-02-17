import React from 'react';

import './ChatMessage.css';

const chatMessage = (props) => {

  let chatMessage = ['ChatMessage'];
  let classSender = "other";
  let senderName;
  //For checking the sender.
  if (props.sender === props.user.uid) {
    classSender = "me";
    senderName = null;
  }else{
    senderName = <span style={{ color: 'red' }}>Expert:</span>;
  }

  chatMessage = chatMessage.concat(classSender).join(' ');
  return (
    <div style={{padding: 0, margin: 0, }}>
      <div className={chatMessage}>
        {senderName}
        {props.message}<br />
        <span style={{ fontSize: '11px', float: 'right' }}>{props.time}</span>
      </div>
    </div>
  );
}

export default chatMessage;