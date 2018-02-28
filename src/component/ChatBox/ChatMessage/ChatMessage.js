import React from 'react';

import './ChatMessage.css';

const chatMessage = (props) => {

  let chatMessage = ['ChatMessage'];
  let classSender = "other";
  let senderName;
  //For checking the sender.

  let seen;
  console.log(props.readBy)
  if (props.readBy && props.readBy.length > 0) {
    seen = <span style={{ fontSize: '9px', float: 'right' }}>seen</span>;
  }
  if (props.sender === props.user.uid) {
    classSender = "me";
    senderName = null;
  } else {
    console.log(props.user);
    seen = null;
    senderName = <p style={{ margin: 0, fontWeight: 'bolder' }}>{props.senderName}:</p>;
  }
  chatMessage = chatMessage.concat(classSender).join(' ');
  return (
    <div style={{ padding: 0, margin: 0, }}>
      <div className={chatMessage}>
        {senderName}
        {props.message}<br />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span style={{ fontSize: '9px', float: 'right' }}>{props.time}</span>
          {seen}
        </div>
      </div>
    </div>
  );
}

export default chatMessage;