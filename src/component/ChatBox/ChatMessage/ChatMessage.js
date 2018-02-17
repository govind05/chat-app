import React from 'react';
import * as moment from 'moment';

import './ChatMessage.css';

const chatMessage = (props) => {

  let chatMessage = ['ChatMessage'];
  let classSender = "other";
  let senderName = <span style={{color: 'red'}}>{props.sender}:</span>;
  //For checking the sender.
  if (props.sender === 'me') {
    classSender = "me";
    senderName = null;
  }

  chatMessage = chatMessage.concat(classSender).join(' ');
  let date = moment().format('hh:mm a');
  return (
    <div>
      <div className={chatMessage}>
        {senderName}
        {props.message}<br/>
        <span style={{fontSize:'11px', float:'right'}}>{date}</span>
      </div>
    </div>
  );
}

export default chatMessage;