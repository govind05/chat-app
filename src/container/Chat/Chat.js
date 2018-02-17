import React from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore'
import ChatBox from '../../component/ChatBox/ChatBox';
import './Chat.css';
import moment from 'moment';

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
        if (change.type === 'added') {
          let messages = this.state.messages.concat({
            ...change.doc.data(),
            key: change.doc.id
          });
          messages = messages.sort((a, b) => (a.timeStamp > b.timeStamp ? 1 : (b.timeStamp > a.timeStamp) ? -1 : 0));
          messages = messages.map(message => {
            
            console.log(message.timeStamp, moment(message.timeStamp).format('h:mm a'))
            return {
              ...message,
              time: moment(message.timeStamp).format('hh:mm a')
            }
          })
          console.log(messages);
          this.setState({
            messages
          })
        }
      })
    })
  }

  onNewMessage = (message) => {
    const db = firebase.firestore();
    db.collection('messages').add(message)
      .then(res => console.log(res, 'Message sent!!'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='Chat'>
        <h1>Chat Page</h1>
        <button onClick={() => firebase.auth().signOut()} >Logout</button>
        <ChatBox
          messageSend={this.onNewMessage}
          messages={this.state.messages}
          user={this.state.user}
        />
      </div>
    )
  }
}