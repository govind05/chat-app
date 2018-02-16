import React from 'react';
import * as firebase from 'firebase';

import ChatBox from '../../component/ChatBox/ChatBox';
import './Chat.css';

export default class Chat extends React.Component{

  state={
    user:{}
  }
  componentDidMount(){
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
      if(user){
        this.setState({
          user
        })
      }else{
        this.props.history.push('/')
      }
    })
  }


  render(){
    return(
      <div className='Chat'>
        <h1>Chat Page</h1>
        <button onClick={() => firebase.auth().signOut()} >Logout</button>
        <ChatBox />
      </div>
    )
  }
}