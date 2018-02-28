import React from 'react';

import './TextBox.css';
import Send from '../../../sendIcon';

const textBox = (props) => {
  return (
    <div className='TextBox'>
      <form onSubmit={props.sendMessage}>
        <input autoFocus
          type="text" placeholder='type here....'
          onChange={props.onMessageWrite}
          value={props.message} />
        <button type="submit"><Send /></button>
      </form>
    </div>
  );
}

export default textBox;