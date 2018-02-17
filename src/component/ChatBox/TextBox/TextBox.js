import React from 'react';

import './TextBox.css';

const textBox = (props) => {
  return (
    <div className='TextBox'>
      <form onSubmit={props.sendMessage}>
        <input autoFocus  type="text" placeholder='type here....' onChange={props.onMessageWrite} />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default textBox;