import React from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore'
import ChatBox from '../../component/ChatBox/ChatBox';
import './Chat.css';

export default class Chat extends React.Component {

  state = {
    user: {},
    messages: [],
  }
  componentDidMount() {
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user
        })
      } else {
        this.props.history.push('/')
      }
    }) 
    const db = firebase.firestore();
    db.collection('messages').onSnapshot(snap => {
      snap.docChanges.forEach(change => {
        if(change.type === 'added'){
          let messages = this.state.messages.concat({
            ...change.doc.data(),
            key: change.doc.id
          });
          this.setState({
            messages
          })
        }
      })
    })
  }

  onNewMessage = ( message) => {
    const db = firebase.firestore();
    db.collection('messages').add(message)
    .then(res => console.log(res, 'Message sent!!'))
    .catch(err=> console.log(err));
  }

  render() {
    console.log(this.state.messages,this.state.user.uid)
    return (
      <div className='Chat'>
        <h1>Chat Page</h1>
        <button onClick={() => firebase.auth().signOut()} >Logout</button>
        <ChatBox 
          messageSend = {this.onNewMessage}
          messages = {this.state.messages}
          user={this.state.user}
        />
      </div>
    )
  }
}