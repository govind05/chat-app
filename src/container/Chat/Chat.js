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
    db.collection('rooms').doc(this.props.location.state.id).collection('messages').onSnapshot(snap => {
      snap.docChanges.forEach(change => {
        if (change.type === 'added') {
          let messages;

          messages = this.state.messages.concat({
            ...change.doc.data(),
            key: change.doc.id,
          });

          messages = messages.map(message => {
            if (message.sender !== this.state.user.uid) {
              console.log(message.readBy)
              if(message.readBy){
                if (!(message.readBy.findIndex(m => m === this.state.user.uid) > -1)) {
                  message.readBy.push(this.state.user.uid);
                }
              }
            }
            return message;
          })
          let message = messages.find(message => message.key === change.doc.id);
          db.collection('rooms').doc(this.props.location.state.id).collection('messages').doc(change.doc.id).set({
            ...message
          })

          let sortedMessages = messages.sort((a, b) => (a.timeStamp > b.timeStamp ? 1 : (b.timeStamp > a.timeStamp) ? -1 : 0));
          sortedMessages = sortedMessages.map(message => {
            return {
              ...message,
              time: moment(message.timeStamp).format('hh:mm a')
            }
          })
          console.log(messages);
          this.setState({
            messages: sortedMessages
          })
        }
        if (change.type === 'modified') {
          let index = this.state.messages.findIndex(message => message.key === change.doc.id);
          let messages = this.state.messages;
          let message = change.doc.data();
          messages[index] = {
            ...this.state.messages[index],
            ...message,
          }
          this.setState({
            messages
          })
          console.log(this.state.messages)
          console.log(message, change.doc.data())
        }
      })
    })

  }

  onNewMessage = (message) => {
    const db = firebase.firestore();
    db.collection('rooms').doc(this.props.location.state.id).collection('messages').add(message)
      .then(res => console.log(res, 'Message sent!!'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='Chat'>
        <button id='logout' onClick={() => firebase.auth().signOut()} >Logout</button>
        <ChatBox
          messageSend={this.onNewMessage}
          messages={this.state.messages}
          user={this.state.user}
        />
      </div>
    )
  }
}